import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import IClip from '../models/clip.model';

@Injectable({
  providedIn: 'root',
})
export class ClipService {
  public clipsCollection: AngularFirestoreCollection<IClip>;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.clipsCollection = this.db.collection('clips');
  }

  createClip(data: IClip): Promise<DocumentReference<IClip>> {
    return this.clipsCollection.add(data);
  }

  getUserClips() {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }

        const query = this.clipsCollection.ref.where('uid', '==', user.uid);

        return query.get();
      }),
      map(snapshot => (snapshot as QuerySnapshot<IClip>).docs)
    );
  }
}
