import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit 
{
  name: string;
  email: string;
  phone: string;
  studentId: string;
  password: string;
  major: string;

  constructor
  (
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  ) 
  { }

  ngOnInit() {
  }

  async register()
  {
    if(this.name && this.email && this.phone && this.password && this.studentId)
    {
      const loading = await this.loadingCtrl.create({
        message:'proccessing..',
        spinner: 'crescent',
        showBackdrop: true
      });

      loading.present();

      this.afauth.createUserWithEmailAndPassword(this.email, this.password)
      .then((data)=>{
        data.user.sendEmailVerification();
        this.afs.collection('user').doc(data.user.uid).set({
          'userId': data.user.uid,
          'userName': this.name,
          'userEmail': this.email,
          'userPhone': this.phone,
          'studentId': this.studentId,
          'createdAt': Date.now(),
          'isAdmin': false,
          'isProf':false,
          'isStudent':true,
          'isTutor': false,
          'major': this.major
        })
        .then(()=>{
          loading.dismiss();
          this.toast('Registeration Success! Please Check Your Email!','success');
          this.router.navigate(['/login']);
        })
        .catch(error =>{
          loading.dismiss();
          this.toast(error.message, 'danger');
        })
      })
      .catch(error =>{
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
    }else {
      this.toast('Please Fill the Form!', 'warning');
    }
  }

  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });

    toast.present();
  }

}
