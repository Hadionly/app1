import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
// import { MbscCardOptions, MbscListviewOptions } from '@mobiscroll/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public isAdmin=false;
  public isProf=false;
  public isStudent=false;
  public isTutor=false;
  public userId;
  user: any;
  constructor
  (
    private auth: AuthService,
    private router: Router,
    private router2: Router
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(data => {
      if (data) {
        firebase
          .firestore()
          .doc(`/user/${data.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.isAdmin = userProfileSnapshot.data().isAdmin;
            this.isProf = userProfileSnapshot.data().isProf;
            this.isStudent = userProfileSnapshot.data().isStudent;
            this.isTutor=userProfileSnapshot.data().isTutor;
            this.userId = userProfileSnapshot.data().userId;
          });
      }
    });

    this.auth.user$.subscribe(user =>{
      this.user = user;
    })
  }

  editProfile()
  {
    this.router.navigate(['/profile/edit']);
  }
  RedirPmeeting(){
    this.router.navigate(['/pmeeting'])
  }
  RedirTmeeting(){
    this.router.navigate(['/tmeeting'])
  }
  RedirEntry(){
    this.router2.navigate(['/entry'])
  }

  RedirProfcreate(){
    this.router.navigate(['/profcreate'])
  }
  RedirTutorcreate(){
    this.router.navigate(['/tutorcreate'])
  }
  RedirViewmeeting(){
    this.router.navigate(['/viewmeeting'])
  }
  RedirViewStudentmeeting(){
    this.router.navigate(['/viewstudentmeeting'])
  }
  RedirViewTmeeting(){
    this.router.navigate(['/viewtutmeeting'])
  }
  RedirViewSchedTmeeting(){
    this.router.navigate(['/viewschedtutmeeting'])
  }

  logout()
  {
    this.auth.signOut();
  }
  gotoProfile()
  {
    this.router.navigate(['/profile']);
  }
  RedirViewcal(){
    this.router.navigate(['/viewcal'])
  }
  RedirSchedule(){
    this.router.navigate(['/schedule'])
  }
  RedirCourses(){
    this.router.navigate(['/courses'])
  }
}


