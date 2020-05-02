import { tap, catchError } from "rxjs/operators";
import { GatewayService } from "./../../../gateway/services/gateway.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, Subscription, throwError } from "rxjs";
import { Device } from "../../models/device.model";
import { DeviceService } from "../../services/device.service";
import { Gateway } from "src/app/gateway/models/gateway.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DeviceItemComponent } from "../device-item/device-item.component";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-device-page",
  templateUrl: "./device-page.component.html",
  styleUrls: ["./device-page.component.css"],
})
export class DevicePageComponent implements OnInit, OnDestroy {
  gateway$: Observable<Gateway>;
  devices$: Observable<Device[]>;
  gatewayId: string;
  subscriptions: Subscription[] = [];
  selectedDevice: Device;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private gatewayService: GatewayService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.gatewayId = this.route.snapshot.paramMap.get("id");
    this.getGateway(this.gatewayId);
    this.getDevices(this.gatewayId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  getGateway(id: string) {
    this.gateway$ = this.gatewayService.getGateway(id).pipe(
      tap((res: Gateway) => {
        return res;
      }),
      catchError((error) => {
        this.toastr.error("There was an error loading the gateway", "Error!");
        return throwError(error);
      })
    );
  }

  getDevices(id) {
    this.devices$ = this.deviceService.getDevicesByGatewayId(id).pipe(
      tap((res: Device[]) => {
        return res;
      }),
      catchError((error) => {
        this.toastr.error("There was an error loading the devices", "Error!");
        return throwError(error);
      })
    );
  }

  removeDevice(device: Device) {
    const sub = this.deviceService
      .removeDevice(device._id)
      .pipe(
        tap(() => {
          this.toastr.success("Device Removed", "Success!");
          this.getDevices(this.gatewayId);
        }),
        catchError((error) => {
          this.toastr.error("There was an error removing the device", "Error!");
          return throwError(error);
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  createDevice(device: Device) {
    const sub = this.deviceService
      .addDevice(device, this.gatewayId)
      .pipe(
        tap(() => {
          this.toastr.success("Device Created", "Success!");
          this.clearSelectedDevice();
          this.getDevices(this.gatewayId);
        }),
        catchError((error) => {
          this.toastr.error("There was an error creating the device", "Error!");
          return throwError(error);
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  updateDevice(device: Device) {
    const sub = this.deviceService
      .updateDevice(device)
      .pipe(
        tap(() => {
          this.toastr.success("Device Created", "Success!");
          this.clearSelectedDevice();
          this.getDevices(this.gatewayId);
        }),
        catchError((error) => {
          this.toastr.error("There was an error updating the device", "Error!");
          return throwError(error);
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  openDeviceModalForm(entity: Device = null) {
    const modalRef = this.modalService.open(DeviceItemComponent);
    modalRef.componentInstance.device = entity;

    const modalComponentRef = modalRef.componentInstance as DeviceItemComponent;

    const sub = modalComponentRef.addDevice
      .pipe(
        tap((device: Device) => {
          this.createDevice(device);
        })
      )
      .subscribe();

    const sub1 = modalComponentRef.editDevice
      .pipe(
        tap((device: Device) => {
          this.updateDevice(device);
        })
      )
      .subscribe();

    this.subscriptions.push(sub, sub1);
  }

  clearSelectedDevice() {
    this.selectedDevice = null;
  }
}
