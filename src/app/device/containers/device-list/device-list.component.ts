import { tap } from "rxjs/operators";
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
} from "@angular/core";
import { Device } from "../../models/device.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RemoveConfirmModalComponent } from "src/app/shared/components/remove-confirm-modal/remove-confirm-modal.component";
import { Subscription } from "rxjs";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-device-list",
  templateUrl: "./device-list.component.html",
  styleUrls: ["./device-list.component.css"],
})
export class DeviceListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() devices: Device[];
  @Output() removeDevice: EventEmitter<Device> = new EventEmitter();
  @Output() editDevide: EventEmitter<Device> = new EventEmitter();
  @Output() openForm: EventEmitter<Device> = new EventEmitter();
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  page = 1;
  pageSize = 4;
  collectionSize = 0;

  subscriptions: Subscription[] = [];

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  ngOnChanges() {
    if (this.devices) {
      this.collectionSize = this.devices.length;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  get devicesPagination(): Device[] {
    return this.devices
      .map((device, i) => ({ id: i + 1, ...device }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  openModal(device: Device) {
    const modalRef = this.modalService.open(RemoveConfirmModalComponent);
    modalRef.componentInstance.name = "Device";

    const modalComponentRef = modalRef.componentInstance as RemoveConfirmModalComponent;

    const sub = modalComponentRef.removeItem
      .pipe(
        tap(() => {
          this.removeDevice.emit(device);
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }

  openDeviceFormModal(device: Device = null) {
    this.openForm.emit(device);
  }
}
