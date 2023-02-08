import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { ModalService } from '../services/modal.service';
import { ModalComponent } from './modal/modal.component';
import { TabComponent } from './tab/tab.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ModalComponent, TabsContainerComponent, TabComponent, InputComponent],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
  exports: [ModalComponent, TabsContainerComponent, TabComponent, InputComponent],
  // providers: [ModalService]
})
export class SharedModule {}
