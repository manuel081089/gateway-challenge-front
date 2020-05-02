import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Device } from "../../models/device.model";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-device-form",
  templateUrl: "./device-form.component.html",
  styleUrls: ["./device-form.component.css"],
})
export class DeviceFormComponent implements OnInit {
  @Input() device: Device;
  @Output() create: EventEmitter<Device> = new EventEmitter();
  @Output() update: EventEmitter<Device> = new EventEmitter();
  title = "Add Device";
  isEdit = false;

  deviceForm = new FormGroup({});

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    this.emptyForm();
    if (this.device) {
      this.isEdit = true;
      this.title = "Edit Device";
      this.deviceForm.patchValue(this.device);
    }
  }

  emptyForm() {
    this.deviceForm = new FormGroup({
      uid: new FormControl("", Validators.required),
      vendor: new FormControl("", Validators.required),
      date_created: new FormControl("", Validators.required),
      status: new FormControl("Offline", Validators.required),
      status_bool: new FormControl(false, Validators.required),
    });
  }

  sendData() {
    this.statusBoolFormControl.value
      ? this.statusFormControl.setValue("Online")
      : this.statusFormControl.setValue("Offline");
    const { value, valid } = this.deviceForm;
    if (valid) {
      const device: Device = value;
      if (this.isEdit) {
        device._id = this.device._id;
        this.update.emit(device);
      } else {
        this.create.emit(device);
      }

      this.emptyForm();
      this.isEdit = false;
      this.activeModal.close();
    }
  }

  get statusBoolFormControl() {
    return this.deviceForm.get("status_bool") as FormControl;
  }

  get statusFormControl() {
    return this.deviceForm.get("status") as FormControl;
  }

  get uidFormControl() {
    return this.deviceForm.get("uid") as FormControl;
  }

  get vendorFormControl() {
    return this.deviceForm.get("vendor") as FormControl;
  }

  get dateCreatedFormControl() {
    return this.deviceForm.get("date_created") as FormControl;
  }
}
