import { NgModule } from '@angular/core';
// import { FeatureComponent } from './feature.component';
import {CustomNgModule} from './decorators';
import { OtherDirective } from './other.component';
import { OtherPipe } from './other.pipe';
import { MyServiceService } from './my-service.service';

@CustomNgModule({
    // id: 'feature',
    declarations: [OtherDirective, OtherPipe],
    providers: [MyServiceService]
    // entryComponents: [OtherComponent]
})
@NgModule({
    // id: 'feature',
    declarations: [OtherDirective, OtherPipe],
    providers: [MyServiceService]
    // entryComponents: [OtherComponent]
})
export class SomeModule {}
