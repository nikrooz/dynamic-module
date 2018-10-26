import { PipeTransform, Pipe } from '@angular/core';
import {CustomPipe} from './decorators';

@Pipe({
  name: 'my-pipe'
})
@CustomPipe({
  name: 'my-pipe'
})
export class OtherPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
