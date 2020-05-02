import { Component, OnInit, Input } from "@angular/core";
import { Gateway } from "../../models/gateway.model";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-gateway-item-details",
  templateUrl: "./gateway-item-details.component.html",
  styleUrls: ["./gateway-item-details.component.css"],
})
export class GatewayItemDetailsComponent implements OnInit {
  @Input() gateway: Gateway;
  faArrowLeft = faArrowLeft;

  constructor() {}

  ngOnInit() {}
}
