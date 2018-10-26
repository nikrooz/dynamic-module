import { Input } from '@angular/core';
import { Directive } from '../../decorators';

@Directive({
  selector: '[appDirective]'
})
export class SomeDirective {
  @Input() prop: any;
}
