import { MainComponent } from './main.component';
import { COMPILER_OPTIONS, CompilerFactory, Compiler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DynamicRoutesService } from './dynamic-routes.service';
import { HttpClientModule } from '@angular/common/http';
// import { FeatureComponent } from './feature.component';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { FeatureModule } from './feature.module';
import {NgModule} from './decorators';

export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler([{useJit: true}]);
}

// export const LAZY_MODULE = new InjectionToken<Function>('Lazy_module');

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    // FeatureComponent
  ],
  // entryComponents: [FeatureComponent],
  imports: [
    FeatureModule,
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([{ path: '**', component: MainComponent, canActivate: [DynamicRoutesService]}])
  ],
  providers: [
    DynamicRoutesService,
    // { provide: NgModule, useValue: NgModule},
    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
