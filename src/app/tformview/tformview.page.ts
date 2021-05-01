import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import  firestore  from 'firebase/app';
import { Pform } from '../models/pform';
import { AuthService } from '../services/auth.service';

//import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoadingController, AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tformview',
  templateUrl: './tformview.page.html',
  styleUrls: ['./tformview.page.scss'],
})
export class TformviewPage implements OnInit {
  public pform: Pform;
  
  //public createPForm: FormGroup;
  user2: any;
  constructor(
    private firestoreService: AuthService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private auth: AuthService,
    private db: AngularFirestore,
    private db2:AngularFirestore
    //formBuilder: FormBuilder
 
  ) {
    
   }

  ngOnInit() {
    const userId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getTformDetail(userId).subscribe(pform => {
      this.pform = pform;
      
    });
    this.auth.user$.subscribe(user2 =>{
      this.user2 = user2;
    })
  }
  
  async delete(userId: string, userName: string): Promise<void> {
    const alert = await this.alertController.create({
      message: `Are you sure you want to delete ${userName}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: blah'+userId);
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.firestoreService.deleteTform(userId).then(() => {
              this.router.navigateByUrl('/viewtutmeeting');
            });
          },
        },
      ],
    });
  
    await alert.present();
  } 

 async accepted(){
    
    const startt = this.pform.sTime;
    const loading = await this.loadingCtrl.create();
    const endt = this.pform.eTime;
    const color='#26c57d';
    const start = startt;
    const end = endt;
    const title = this.pform.sName+" and "+this.pform.pName+" meeting";
    //end.setMinutes(end.getMinutes() + 60);
    this.db2.collection(`tform`).doc(this.pform.id).update({ accepted: true/*NEW QUANTITY*/ });
    let event = {
      title: title,
      start: start,
      end: end,
      color: color,
      allDay: false,
      sId:this.pform.sId,
      pId:this.pform.pId,
      personal: false
    };

    this.db.collection(`events`).add(event).then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/viewtutmeeting');
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
  async decline(){
    const loading = await this.loadingCtrl.create();
    this.db2.collection(`tform`).doc(this.pform.id).update({ accepted: false/*NEW QUANTITY*/ }).then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/viewtutmeeting');
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
