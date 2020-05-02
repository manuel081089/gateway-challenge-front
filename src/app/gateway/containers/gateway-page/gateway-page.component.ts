import { tap, catchError } from "rxjs/operators";
import { GatewayService } from "./../../services/gateway.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Gateway } from "../../models/gateway.model";
import { Subscription, Observable, throwError } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-gateway-page",
  templateUrl: "./gateway-page.component.html",
  styleUrls: ["./gateway-page.component.css"],
})
export class GatewayPageComponent implements OnInit, OnDestroy {
  gateways$: Observable<Gateway[]>;
  selectedGateway: Gateway;
  subscriptions: Subscription[] = [];
  constructor(
    private gatewayService: GatewayService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getGateways();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  getGateways() {
    this.gateways$ = this.gatewayService.getGateways().pipe(
      tap((res: Gateway[]) => {
        return res;
      }),
      catchError((error) => {
        this.toastr.error("There was an error loading the gateways", "Error!");
        return throwError(error);
      })
    );
  }

  createGateway(gateway: Gateway) {
    const sub = this.gatewayService
      .addGateway(gateway)
      .pipe(
        tap(() => {
          this.toastr.success("Gateway created", "Success!");
          this.clearSelectedGateway();
          this.getGateways();
        }),
        catchError((error) => {
          let errorDescription = "There was an error creating the gateway";
          if (error.status == 422) {
            errorDescription = error.error.errors;
          }

          this.toastr.error(errorDescription, "Error!");
          console.log(error);
          return throwError(error);
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  updateGateway(gateway: Gateway) {
    const sub = this.gatewayService
      .updateGateway(gateway)
      .pipe(
        tap(() => {
          this.toastr.success("Gateway updated", "Success!");
          this.clearSelectedGateway();
          this.getGateways();
        }),
        catchError((error) => {
          this.toastr.error(
            "There was an error updating the gateway",
            "Error!"
          );
          return throwError(error);
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  removeGetway(gateway: Gateway) {
    const sub = this.gatewayService
      .removeGateway(gateway._id)
      .pipe(
        tap(() => {
          this.toastr.success("Gateway removed", "Success!");
          this.getGateways();
        }),
        catchError((error) => {
          this.toastr.error(
            "There was an error removing the gateway",
            "Error!"
          );
          return throwError(error);
        })
      )
      .subscribe();
    this.subscriptions.push(sub);
  }

  editGetway(gateway: Gateway) {
    this.selectedGateway = gateway;
  }

  clearSelectedGateway() {
    this.selectedGateway = null;
  }
}
