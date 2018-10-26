import { LayoutComponent } from './layout.component';
import { SomeModule } from './some/some.module';
import { NgModule } from '../decorators';

@NgModule({
  id: 'feature',
    imports: [SomeModule],
    declarations: [LayoutComponent],
    entryComponents: [LayoutComponent]
})
export class LayoutModule {}
