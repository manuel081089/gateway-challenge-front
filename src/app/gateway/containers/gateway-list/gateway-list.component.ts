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
import { Gateway } from "../../models/gateway.model";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RemoveConfirmModalComponent } from "src/app/shared/components/remove-confirm-modal/remove-confirm-modal.component";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { faList, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-gateway-list",
  templateUrl: "./gateway-list.component.html",
  styleUrls: ["./gateway-list.component.css"],
})
export class GatewayListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() gateways: Gateway[];
  @Output() removeGetway: EventEmitter<Gateway> = new EventEmitter();
  @Output() editGetway: EventEmitter<Gateway> = new EventEmitter();

  subscriptions: Subscription[] = [];
  faList = faList;
  faTrash = faTrash;
  faEdit = faEdit;

  page = 1;
  pageSize = 4;
  collectionSize = 0;

  constructor(private modalService: NgbModal, private router: Router) {}

  ngOnInit() {}
  ngOnChanges() {
    if (this.gateways) {
      this.collectionSize = this.gateways.length;
    }
  }

  get gatewaysPagination(): Gateway[] {
    return this.gateways
      .map((gateway, i) => ({ id: i + 1, ...gateway }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  edit(gateway: Gateway) {
    this.editGetway.emit(gateway);
  }

  details(gateway: Gateway) {
    this.router.navigate(["./devices/gateway", gateway._id]);
  }

  openModal(gateway: Gateway) {
    const modalRef = this.modalService.open(RemoveConfirmModalComponent);
    modalRef.componentInstance.name = "Gateway";

    const modalComponentRef = modalRef.componentInstance as RemoveConfirmModalComponent;

    const sub = modalComponentRef.removeItem
      .pipe(
        tap(() => {
          this.removeGetway.emit(gateway);
        })
      )
      .subscribe();

    this.subscriptions.push(sub);
  }
}
