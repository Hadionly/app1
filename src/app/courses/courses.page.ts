import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { Course } from '../models/course';
import { AuthService } from '../services/auth.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoadingController, AlertController } from '@ionic/angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  public course: Course;
  //public createCourse: FormGroup;
  days:string[];
  courseName:string;
  courseCode:string;
  profName:string;
  start:string;
  end:string;
  room:string;
  seats:number;
  credits:number;
  section:number;
  major: string;
  isSug:boolean = false;
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
     /* this.createCourse = formBuilder.group({

        courseName: ['', Validators.required],
        courseCode: ['', Validators.required],
        profName: ['', Validators.required],
        start: ['', Validators.required],
        end:['', Validators.required],
        room: ['', Validators.required],
        seats: ['', Validators.required],
        credits: ['', Validators.required],
        section: ['', Validators.required]
        });*/
    }

  ngOnInit() {
  }
  async createForm() {
    const loading = await this.loadingCtrl.create();
    const courseName= this.courseName;
    const courseCode= this.courseCode;
    const profName= this.profName;
    const start= new Date(new Date(Date.parse(this.start)).setSeconds(0,0)).toLocaleString();
    const end= new Date(new Date(Date.parse(this.end)).setSeconds(0,0)).toLocaleString();
    const room= this.room;
    const seats= this.seats;
    const credits= this.credits;
    const section= this.section;
    const major = this.major;
    const days = this.days;

     const recurring = 'FREQ=WEEKLY;BYDAY='+this.days.toString()+';INTERVAL=1';
    if(this.isSug==true){
      this.firestoreService
      .createSugCourse(courseName, courseCode, profName, start,end,room,seats,credits,section,recurring,major,days)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('/home');
          });
        },
        error => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );
    }else if(this.isSug==false){
      this.firestoreService
      .createCourse(courseName, courseCode, profName, start,end,room,seats,credits,section,recurring,days)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('/profile');
          });
        },
        error => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );
    }else{
    this.firestoreService
      .createCourse(courseName, courseCode, profName, start,end,room,seats,credits,section,recurring,days);

      this.firestoreService
      .createSugCourse(courseName, courseCode, profName, start,end,room,seats,credits,section,recurring,major,days)
      .then(
        () => {
          loading.dismiss().then(() => {
            this.router.navigateByUrl('/profile');
          });
        },
        error => {
          loading.dismiss().then(() => {
            console.error(error);
          });
        }
      );
      }
    return await loading.present();
  }
}
