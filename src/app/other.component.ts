import { CustomDirective } from './decorators';
import { Input } from '@angular/core';
import { Directive } from '@angular/core';

@CustomDirective({
  selector: '[appOther]'
})
@Directive({
  selector: '[appOther]'
})
export class OtherDirective {
  @Input() test: any;
}
