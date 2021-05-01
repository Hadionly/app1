import { Component, OnInit } from '@angular/core';

import  firebase from 'firebase/app';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-stulist',
  templateUrl: './stulist.page.html',
  styleUrls: ['./stulist.page.scss'],
})
export class StulistPage implements OnInit {
  public user: User;
  public course:any;
  courseList;
  constructor(
    private firestoreService: AuthService,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    public loadingCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit() {
    const userId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getUserDetail(userId).subscribe(user => {
      this.user = user;
 
    });
    this.firestoreService.getCourseList().subscribe(course=>{
      this.course=course;
    });
  }
  async accepted(){
    const loading = await this.loadingCtrl.create();

    this.db.collection(`user`).doc(this.user.userId).update({ isTutor: true,courseId:this.courseList.toString()/*NEW QUANTITY*/ }).then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/tutorcreate');
        });
      },
      error => {
        loading.dismiss().then(() => {
          console.error(error);
        });
      }
    );
    return await loading.present();
   
  }
}
