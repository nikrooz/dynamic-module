// import { NgModule } from '@angular/core';
import { FeatureComponent } from './feature.component';
import {NgModule} from './decorators';

@NgModule({
    id: 'feature',
    declarations: [FeatureComponent],
    entryComponents: [FeatureComponent]
})
export class FeatureModule {}
