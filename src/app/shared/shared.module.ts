import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { ModalService } from '../services/modal.service';
import { ModalComponent } from './modal/modal.component';
import { TabComponent } from './tab/tab.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [ModalComponent, TabsContainerComponent, TabComponent, InputComponent, AlertComponent],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
  exports: [ModalComponent, TabsContainerComponent, TabComponent, InputComponent, AlertComponent],
  // providers: [ModalService]
})
export class SharedModule {}
