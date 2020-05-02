import { RouterModule } from "@angular/router";
import { SharedModule } from "./../shared/shared.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromContainers from "./containers";
import * as fromComponents from "./components";
import { GatewayItemDetailsComponent } from "./components/gateway-item-details/gateway-item-details.component";

@NgModule({
  declarations: [...fromContainers.CONTAINERS, ...fromComponents.COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [GatewayItemDetailsComponent],
})
export class GatewayModule {}
