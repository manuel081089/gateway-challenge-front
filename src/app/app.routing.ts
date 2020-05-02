import { Routes } from "@angular/router";
import { GatewayPageComponent } from "./gateway/containers/gateway-page/gateway-page.component";
import { DevicePageComponent } from "./device/containers/device-page/device-page.component";

export const AppRoutes: Routes = [
  {
    path: "",
    redirectTo: "gateways",
    pathMatch: "full",
  },
  { path: "gateways", component: GatewayPageComponent },
  { path: "devices/gateway/:id", component: DevicePageComponent },
];
