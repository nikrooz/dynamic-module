import { NgModule } from '../../decorators';
import { SomeDirective } from './some.directive';
import { SomePipe } from './some.pipe';

@NgModule({
    declarations: [SomeDirective, SomePipe],
})
export class SomeModule {}
