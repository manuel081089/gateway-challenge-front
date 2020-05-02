import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { Gateway } from "../../models/gateway.model";

@Component({
  selector: "app-gateway-item",
  templateUrl: "./gateway-item.component.html",
  styleUrls: ["./gateway-item.component.css"],
})
export class GatewayItemComponent implements OnInit, OnChanges {
  @Input() gateway: Gateway;
  @Output() createGateway: EventEmitter<Gateway> = new EventEmitter();
  @Output() updateGateway: EventEmitter<Gateway> = new EventEmitter();

  title = "Add Gateway";

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.gateway) {
      this.title = "Edit Gateway";
    }
  }

  create(gateway: Gateway) {
    this.createGateway.emit(gateway);
    this.setDefaultTitle();
  }

  update(gateway: Gateway) {
    this.updateGateway.emit(gateway);
    this.setDefaultTitle();
  }

  setDefaultTitle() {
    this.title = "Add Gateway";
  }
}
