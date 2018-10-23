import { Component } from '@angular/core';

@Component({
  template: `<p>Main Loaded ...</p>
              <router-outlet></router-outlet>
              <a routerLink="/some-feature">Load feature module</a>`,
})
export class MainComponent {
}
