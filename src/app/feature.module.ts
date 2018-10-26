// import { NgModule } from '@angular/core';
import { FeatureComponent } from './feature.component';
import {CustomNgModule} from './decorators';
import { SomeModule } from './some.module';
import { NgModule } from '@angular/core';

@CustomNgModule({
    id: 'feature',
    imports: [SomeModule],
    declarations: [FeatureComponent],
    entryComponents: [FeatureComponent]
})
@NgModule({
  id: 'feature',
    imports: [SomeModule],
    declarations: [FeatureComponent],
    entryComponents: [FeatureComponent]
})
export class FeatureModule {}
