import { MainComponent } from './main.component';
import { Injectable, Type, Compiler, Inject, getModuleFactory, ModuleWithComponentFactories, Injector, NgModule } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
  Routes,
  RouterModule
} from '@angular/router';

import { Observable, from, forkJoin, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FeatureComponent } from './feature.component';
// import { LAZY_MODULE } from './app.module';
import { FeatureModule } from './feature.module';

export interface RouteConfig {
  path: string;
  component: string;
  lazyLoadPath: string;
  children: RouteConfig[];
}

// export const LazyModule = NgModule;

@Injectable()
export class DynamicRoutesService implements CanActivate {
  constructor(private http: HttpClient, private router: Router, private compiler: Compiler, private injector: Injector) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.getRoutes().pipe(
      map(({ routes }) => routes),
      tap(routes => this.router.resetConfig(routes)),
      tap(_ => this.router.navigateByUrl(state.url)),
      map(_ => true)
    );
  }

  private getRoutes(endpoint: string = ''): Observable<{ routes: Route[] }> {
    return this.http.get<{ routes: RouteConfig[] }>('/api/' + endpoint + 'routes.json').pipe(
      map(({ routes }) => {
        return { routes: this.mapToValidAngularRoutes(routes || []) };
      })
    );
  }

  private mapToValidAngularRoutes(routesConfig: RouteConfig[]): Route[] {
    return routesConfig.map(routeConfig => {
      const { path, component, lazyLoadPath, children } = routeConfig;
      return {
        ...mapPathOnToRoute(path),
        ...mapChildren(children ? this.mapToValidAngularRoutes(children) : []),
        ...mapComponentName(component),
        ...mapLazyLoadModule(lazyLoadPath, path, this.featureModule(lazyLoadPath))
      };
    });
  }

  private featureModule(lazyLoadPath: string): Observable<Type<any>> {
    return this.getRoutes(lazyLoadPath)
      .pipe(
        // switchMap(({ routes }) => {
        //   let m: Observable<ModuleWithComponentFactories<FeatureModule>>;
        //   // try {
        //   //   console.log('AAAA');
        //   //   const mm = this.injector.get(FeatureModule);
        //   //   console.log(mm);
        //   //   // getModuleFactory('feature');
        //   //   console.log('BBBB');

        //   // } catch (error) {
        //   //   console.log('EEEEEEEE', error);
        //   //   m = from(this.compiler.compileModuleAndAllComponentsAsync(FeatureModule));
        //   //   console.log('DDDDDD');
        //   //   return forkJoin(of({ routes }), m);
        //   // }
        // // m = from(this.compiler.compileModuleAndAllComponentsAsync(FeatureModule));

        //   console.log('!!!!!!!');
        //   return forkJoin(of({ routes }), m);
        // }),
        switchMap(({ routes }) => {
          // console.log(m);
          // const ii = m ? [
          //   FeatureModule,
          //   RouterModule.forChild(routes)
          // ] : [
          //     RouterModule.forChild(routes)
          //   ];
            // console.log(ii);
          // const f = getModuleFactory('feature').create();
          const f = NgModule({
            imports: [FeatureModule,
              RouterModule.forChild(routes)],
          }) (class { });
          return from(this.compiler.compileModuleAsync(f));
        }),
        map(m => {
          console.log(m);
          return m.moduleType;
        })
      );
  }

}

export const mapPathOnToRoute = (path: string): Partial<Route> => {
  if (path !== undefined) {
    return { path };
  }
  return { path: '' };
};

export const mapLazyLoadModule = (
  lazyLoadPath: string,
  path: string,
  featureModule: Observable<Type<any>>
): Partial<Route> => {
  if (lazyLoadPath && featureModule) {
    return {
      path: path,
      loadChildren: () => featureModule
    };
  }
  return {};
};

export const mapChildren = (children: Routes): Partial<Route> => {
  if (children && children.length) {
    return { children };
  }
  return {};
};

export const mapComponentName = (component: string): Partial<Route> => {
  switch (component) {
    case 'main':
      return { component: MainComponent };
    case 'feature':
      return { component: FeatureComponent };
    default:
      return {};
  }
};
