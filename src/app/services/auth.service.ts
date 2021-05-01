import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Pform } from '../models/pform';
import { Course } from '../models/course';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import 'firebase/firestore';
import { switchMap } from 'rxjs/operators';
import { HideNavService } from "../services/hide-nav.service";
@Injectable()

export class AuthService {
  user$: Observable<User>;
  user: User;
  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private LoadingCtrl: LoadingController,
    private toastr: ToastController,
    private navservice: HideNavService
    )
    {
      this.user$=this.afauth.authState
      .pipe(
        switchMap(user=>{
          if(user)
          {
            return this.afs.doc(`user/${user.uid}`).valueChanges();
          }else{
            return of(null);
          }
        })
      )
     }

     async signIn(email, password)
     {
        const loading = await this.LoadingCtrl.create({
          message:'Authenticating..',
          spinner: 'crescent',
          showBackdrop: true
        });
        loading.present();
        this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL).then(()=>{
          this.afauth.signInWithEmailAndPassword(email,password).then((data)=>{
            if(!data.user.emailVerified)
            {
              loading.dismiss();
              this.toast('Please verify your email address!','warning');
              this.afauth.signOut();
            }else{
              loading.dismiss();
              this.router.navigate(['/profile']);
              this.navservice.changeNav(false);
            }
          })
          .catch(error=>{
            loading.dismiss();
             this.toast(error.message, 'danger');
          })
        })
        .catch(error =>{
          loading.dismiss();
          this.toast(error.message, 'danger');
        });
     }

     async signOut()
     {
        const loading = await this.LoadingCtrl.create({
          spinner: 'crescent',
          showBackdrop: true
        });
        loading.present();
        this.afauth.signOut()
        .then(()=> {
          loading.dismiss();
          this.navservice.changeNav(true);
          this.router.navigate(['/login']);
        })
     }

     async toast(message, status){
       const toast = await this.toastr.create({
         message: message,
         color: status,
         position: 'top',
         duration: 2000
       });
       toast.present();
     }



    getUserList(): Observable<User[]> {

      return this.afs.collection<User>(`user`).valueChanges();
    }
    getCourseList(): Observable<Course[]> {

      return this.afs.collection<Course>(`course`).valueChanges();
    }

    getUserDetail(songId: string): Observable<User> {

      return this.afs.collection('user').doc<User>(songId).valueChanges();
    }

    getPformDetail(songId: string): Observable<Pform> {

      return this.afs.collection('pform').doc<Pform>(songId).valueChanges();
    }
    getTformDetail(songId: string): Observable<Pform> {

      return this.afs.collection('tform').doc<Pform>(songId).valueChanges();
    }
    deletePform(songId: string): Promise<void> {
      return this.afs.doc(`pform/${songId}`).delete();
    }
    deleteTform(songId: string): Promise<void> {
      return this.afs.doc(`tform/${songId}`).delete();
    }
    deleteEvent(songId: string): Promise<void> {
      return this.afs.doc(`events/${songId}`).delete();
    }
    createProfForm(
      pName: string,
      pEmail: string,
      sTime: string,
      eTime: string,
      pId: string,
      sId: string,
      sName: string,
      studentId: string,
      sEmail: string,
      createdAt: number,
      accepted: boolean,
      reason: string

    ): Promise<void> {
      const id = this.afs.createId();

      return this.afs.doc(`pform/${id}`).set({
        id,
        pName,
        pEmail,
        sTime,
        eTime,
        pId,
        sId,
        sName,
        studentId,
        sEmail,
        createdAt,
        accepted,
        reason

      });
    }
    createTutForm(
      pName: string,
      pEmail: string,
      sTime: string,
      eTime: string,
      pId: string,
      sId: string,
      sName: string,
      studentId: string,
      sEmail: string,
      createdAt: number,
      accepted: boolean,
      reason: string,
      courses:string

    ): Promise<void> {
      const id = this.afs.createId();

      return this.afs.doc(`tform/${id}`).set({
        id,
        pName,
        pEmail,
        sTime,
        eTime,
        pId,
        sId,
        sName,
        studentId,
        sEmail,
        createdAt,
        accepted,
        reason,
        courses

      });
    }
    getPmeetingList(): Observable<Pform[]> {

      return this.afs.collection<Pform>(`pform`).valueChanges();
    }
    getTmeetingList(): Observable<Pform[]> {

      return this.afs.collection<Pform>(`tform`).valueChanges();
    }
    createCourse(
      courseName: string,
      courseCode: string,
      profName: string,
      start: string,
      end: string,
      room: string,
      seats: number,
      credits: number,
      section: number,
      recurring: string,
      days: string[]

    ): Promise<void> {
      const id = this.afs.createId();

      return this.afs.doc(`course/${id}`).set({
        id,
        courseName,
        courseCode,
        profName,
        start,
        end,
        room,
        seats,
        credits,
        section,
        recurring,
        days

      });
    }
    createSugCourse(
      courseName: string,
      courseCode: string,
      profName: string,
      start: string,
      end: string,
      room: string,
      seats: number,
      credits: number,
      section: number,
      recurring: string,
      major: string,
      days: string[]

    ): Promise<void> {
      const id = this.afs.createId();

      return this.afs.doc(`${major} suggested courses/${id}`).set({
        id,
        courseName,
        courseCode,
        profName,
        start,
        end,
        room,
        seats,
        credits,
        section,
        recurring,
        days

      });
    }
}
