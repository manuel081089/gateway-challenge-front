import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { Gateway } from "../../models/gateway.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-gateway-form",
  templateUrl: "./gateway-form.component.html",
  styleUrls: ["./gateway-form.component.css"],
})
export class GatewayFormComponent implements OnInit, OnChanges {
  @Input() gateway: Gateway;
  @Output() create: EventEmitter<Gateway> = new EventEmitter();
  @Output() update: EventEmitter<Gateway> = new EventEmitter();
  isEdit = false;
  faPlus = faPlus;
  faEdit = faEdit;

  gatewayForm = new FormGroup({});

  constructor() {}

  ngOnInit() {
    this.emptyForm();
  }

  ngOnChanges() {
    if (this.gateway) {
      this.isEdit = true;
      this.gatewayForm.patchValue(this.gateway);
    }
  }

  emptyForm() {
    this.gatewayForm = new FormGroup({
      name: new FormControl("", Validators.required),
      address_ip: new FormControl("", Validators.required),
      serial_number: new FormControl("", [Validators.required]),
    });
  }

  sendData(form: FormGroup, $event) {
    $event.preventDefault();
    const { value, valid } = form;
    if (valid) {
      const gateway: Gateway = value;
      if (this.isEdit) {
        gateway._id = this.gateway._id;
        this.update.emit(gateway);
      } else {
        this.create.emit(gateway);
      }

      this.emptyForm();
      this.isEdit = false;
    }
  }

  get nameFormControl() {
    return this.gatewayForm.get("name") as FormControl;
  }

  get addressIpFormControl() {
    return this.gatewayForm.get("address_ip") as FormControl;
  }

  get serialNumberFormControl() {
    return this.gatewayForm.get("serial_number") as FormControl;
  }
}
