import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { ResourceLoader } from '@angular/compiler';
import { ResourceLoaderImpl } from '@angular/platform-browser-dynamic/src/resource_loader/resource_loader_impl';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
