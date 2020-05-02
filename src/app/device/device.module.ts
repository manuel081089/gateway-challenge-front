import { SharedModule } from "./../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromContainers from "./containers";
import * as fromComponents from "./components";
import { FormsModule } from "@angular/forms";
import { GatewayModule } from "../gateway/gateway.module";
import { DeviceItemComponent } from "./containers/device-item/device-item.component";

@NgModule({
  declarations: [...fromContainers.CONTAINERS, ...fromComponents.COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GatewayModule,
    SharedModule,
  ],
  entryComponents: [DeviceItemComponent],
})
export class DeviceModule {}
