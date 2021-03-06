import { MainComponent } from './main.component';
import { Injectable, Type, Compiler, NgModule } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
  Routes,
  RouterModule
} from '@angular/router';

import { Observable, from } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';

export interface RouteConfig {
  path: string;
  component: string;
  loadChildren: string;
  children: RouteConfig[];
}

@Injectable()
export class DynamicRoutesService implements CanActivate {
  constructor(private http: HttpClient, private router: Router, private compiler: Compiler) { }

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
    return this.http.get<{ routes: RouteConfig[] }>('/api' + endpoint + '/routes.json').pipe(
      map(({ routes }) => {
        return { routes: this.mapToValidAngularRoutes(routes || []) };
      })
    );
  }

  private mapToValidAngularRoutes(routesConfig: RouteConfig[]): Route[] {
    return routesConfig.map(routeConfig => {
      const { path, component, loadChildren, children } = routeConfig;
      return {
        ...mapPathOnToRoute(path),
        ...mapChildren(children ? this.mapToValidAngularRoutes(children) : []),
        ...mapComponentName(component),
        ...mapLazyLoadModule(loadChildren, path, this.featureModule(loadChildren))
      };
    });
  }

  private featureModule(loadChildren: string): Observable<Type<any>> {
    return this.getRoutes(loadChildren)
      .pipe(
        switchMap(({ routes }) => {

          const f = NgModule({
            imports: [
              LayoutModule,
              RouterModule.forChild(routes)
            ],
          }) (class { });
          return from(this.compiler.compileModuleAsync(f));
        }),
        map(m => {
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
  loadChildren: string,
  path: string,
  featureModule: Observable<Type<any>>
): Partial<Route> => {
  if (loadChildren && featureModule) {
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
    case 'someLayout':
      return { component: LayoutComponent };
    default:
      return {};
  }
};
