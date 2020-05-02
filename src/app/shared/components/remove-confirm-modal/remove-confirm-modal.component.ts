import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-remove-confirm-modal",
  templateUrl: "./remove-confirm-modal.component.html",
  styleUrls: ["./remove-confirm-modal.component.css"],
})
export class RemoveConfirmModalComponent implements OnInit {
  @Input() name;
  @Output() removeItem: EventEmitter<null> = new EventEmitter<null>();

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  remove($event) {
    $event.preventDefault();
    this.removeItem.emit(null);
    this.activeModal.close();
  }
}
