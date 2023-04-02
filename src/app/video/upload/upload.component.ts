import { Component, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { last, switchMap } from 'rxjs/operators';
import { ClipService } from 'src/app/services/clip.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnDestroy {
  isDragover = false;
  file: File | null = null;
  nextStep = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait! Your video is being uploaded.';
  inSubmission = false;
  percentage = 0;
  showPercentage = false;
  user: firebase.User | null = null;
  task?: AngularFireUploadTask;

  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });
  uploadForm = new FormGroup({
    title: this.title,
  });

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipService: ClipService
  ) {
    auth.user.subscribe((user) => (this.user = user));
  }

  ngOnDestroy(): void {
    this.task?.cancel();
  }

  storeFile($event: Event) {
    this.isDragover = false;

    this.file = ($event as DragEvent).dataTransfer
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : ($event.target as HTMLInputElement).files?.item(0) ?? null;

    if (!this.file || this.file.type !== 'video/mp4') {
      return;
    }

    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.nextStep = true;
  }

  uploadFile() {
    this.uploadForm.disable();

    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your video is being uploaded.';
    this.inSubmission = true;
    this.showPercentage = true;

    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    this.task = this.storage.upload(clipPath, this.file);
    const clipRef = this.storage.ref(clipPath);

    this.task.percentageChanges().subscribe((progress) => {
      this.percentage = (progress as number) / 100;
    });

    this.task
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => clipRef.getDownloadURL())
      )
      .subscribe({
        next: (url) => {
          const clip = {
            uid: this.user?.uid as string,
            displayName: this.user?.displayName as string,
            title: this.title.value,
            fileName: `${clipFileName}.mp4`,
            url,
          };

          this.clipService.createClip(clip);

          console.log(clip);

          this.alertColor = 'green';
          this.alertMsg = 'Your video has been uploaded successfully!';
          this.showPercentage = false;
        },
        error: (error) => {
          this.uploadForm.enable();

          this.alertColor = 'red';
          this.alertMsg = 'There was an error uploading your video.';
          this.showPercentage = false;
          console.error(error);
        },
      });
  }
}
