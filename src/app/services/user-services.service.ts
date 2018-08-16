import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {UserModel} from '../models/user-model';
import {map, mergeMap} from 'rxjs/operators';
import {AngularFirestore, DocumentReference} from 'angularfire2/firestore';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static USERS_COLLECTION = 'users';

  private currentUser: UserModel;

  private local: string;

  private static FIND_USERS_BY_UUID_QUERY = uuid => ref => ref.where('uuid', '==', uuid);

  constructor(private afAuth: AngularFireAuth,
              private storage: AngularFirestore) {
  }

  private findUserForUUID(uuid): Observable<UserModel> {
    return this.storage
      .collection<UserModel>(UserService.USERS_COLLECTION, UserService.FIND_USERS_BY_UUID_QUERY(uuid))
      .valueChanges().pipe(map(users => users[0]));
  }

  public getCurrentUser(): Observable<UserModel> {
    return this.currentUser ? of(this.currentUser) : this.getAuthUser()
      .pipe(mergeMap(u => {
        const userModel$ = this.findUserForUUID(u.uuid);
        userModel$.subscribe(um => this.currentUser = um);
        return userModel$;
      }));
  }

  public getLocal(): string {
    let result;
    if (this.currentUser) {
      result = this.local = this.currentUser.local;
    } else {
      result = 'en';
    }
    return result;
  }

  public getCurrentUserRef(): Observable<DocumentReference> {
    return this.getCurrentUser().pipe(map(
      u => this.storage.collection(UserService.USERS_COLLECTION).doc(u.email).ref));
  }

  public getAuthUser(): Observable<UserModel> {
    return this.afAuth.authState.pipe(map(this.convertToUserModel));
  }

  private convertToUserModel(authData) {
    return authData ? <UserModel>{
      name: authData.displayName,
      photoURL: authData.photoURL,
      email: authData.email,
      uuid: authData.uid
    } : {};
  }
}
