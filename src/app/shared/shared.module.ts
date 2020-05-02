import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as fromComponents from "./components";
import { RemoveConfirmModalComponent } from "./components/remove-confirm-modal/remove-confirm-modal.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

const MODULES = [FontAwesomeModule, NgbModule];
@NgModule({
  declarations: [...fromComponents.COMPONENTS],
  imports: [CommonModule, ...MODULES],
  entryComponents: [RemoveConfirmModalComponent],
  exports: [...fromComponents.COMPONENTS, ...MODULES],
})
export class SharedModule {}
