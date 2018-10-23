import { MainComponent } from './main.component';
import { NgModule, COMPILER_OPTIONS, CompilerFactory, Compiler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DynamicRoutesService } from './dynamic-routes.service';
import { HttpClientModule } from '@angular/common/http';
import { FeatureComponent } from './feature.component';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';


export function createCompiler(compilerFactory: CompilerFactory) {
  return compilerFactory.createCompiler([{useJit: true}]);
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FeatureComponent
  ],
  entryComponents: [FeatureComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot([{ path: '**', component: MainComponent, canActivate: [DynamicRoutesService]}])
  ],
  providers: [
    DynamicRoutesService,
    {provide: COMPILER_OPTIONS, useValue: {}, multi: true},
    {provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
    {provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
