import { PipeTransform } from '@angular/core';
import { Pipe } from '../../decorators';

@Pipe({
  name: 'my-pipe'
})
export class SomePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
