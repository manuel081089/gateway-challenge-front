import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { Device } from "../../models/device.model";

@Component({
  selector: "app-device-item",
  templateUrl: "./device-item.component.html",
  styleUrls: ["./device-item.component.css"],
})
export class DeviceItemComponent implements OnInit {
  @Input() device: Device;
  @Output() addDevice: EventEmitter<Device> = new EventEmitter();
  @Output() editDevice: EventEmitter<Device> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  createDevice(device: Device) {
    this.addDevice.emit(device);
  }
  updateDevice(device: Device) {
    this.editDevice.emit(device);
  }
}
