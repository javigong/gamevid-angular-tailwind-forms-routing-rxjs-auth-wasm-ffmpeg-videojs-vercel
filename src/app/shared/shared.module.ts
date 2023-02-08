import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { ModalService } from '../services/modal.service';
import { ModalComponent } from './modal/modal.component';
import { TabComponent } from './tab/tab.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalComponent, TabsContainerComponent, TabComponent, InputComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ModalComponent, TabsContainerComponent, TabComponent, InputComponent],
  // providers: [ModalService]
})
export class SharedModule {}
