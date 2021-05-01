import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tform',
  templateUrl: './tform.page.html',
  styleUrls: ['./tform.page.scss'],
})
export class TformPage implements OnInit {
  public user: User;
  public createPForm: FormGroup;
  user2: any;
  constructor(
    private firestoreService: AuthService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private auth: AuthService,
    formBuilder: FormBuilder
 
  ) {
    this.createPForm = formBuilder.group({
      sTime: ['', Validators.required],
      eTime: ['', Validators.required],
      reason: ['', Validators.required]
    });
   }

  ngOnInit() {
    const userId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getUserDetail(userId).subscribe(user => {
      this.user = user;
    });
    this.auth.user$.subscribe(user2 =>{
      this.user2 = user2;
    })
  }
  /*async deleteSong(userId: string, userName: string): Promise<void> {
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete ${userName}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.firestoreService.deleteSong(userId).then(() => {
              this.router.navigateByUrl('');
            });
          },
        },
      ],
    });
  
    await alert.present();
  } */
  async createForm() {
    const loading = await this.loadingCtrl.create();
  
    const pName = this.user.userName;
    const pEmail = this.user.userEmail;
    const sTime = new Date(Date.parse(this.createPForm.value.sTime)).toLocaleString();
    const eTime = new Date(Date.parse(this.createPForm.value.eTime)).toLocaleString();
    const pId = this.user.userId;
    const sId = this.user2.userId;
    const sName = this.user2.userName;
    const studentId = this.user2.studentId;
    const sEmail = this.user2.userEmail;
    const createdAt = Date.now();
    const accepted = null;
    const reason = this.createPForm.value.reason;
    const courses = this.user.courseId;
  
    this.firestoreService
      .createTutForm(pName, pEmail, sTime, eTime,pId,sId,sName,studentId,sEmail,createdAt,accepted,reason,courses)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('/tmeeting');
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
