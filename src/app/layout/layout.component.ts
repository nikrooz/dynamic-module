import { Component } from '../decorators';

// Only works if we use template
@Component({
  // template: `<p>Lazy module loaded ...</p>`
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
