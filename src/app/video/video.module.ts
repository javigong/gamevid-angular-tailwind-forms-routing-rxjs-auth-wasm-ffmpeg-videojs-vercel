import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { VideoRoutingModule } from './video-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ManageComponent, UploadComponent, EditComponent],
  imports: [CommonModule, VideoRoutingModule, SharedModule, ReactiveFormsModule],
})
export class VideoModule {}
