import { Component } from '@angular/core';
import * as GS from 'src/assets/generateSchedule.js'
import { Class0, SA} from 'src/assets/generateSchedule.js'
import { Course } from '../models/course';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import  firebase from 'firebase/app';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-schedule',
  templateUrl: 'schedule.page.html',
  styleUrls: ['schedule.page.scss'],
})

export class SchedulePage {
  //studentYear supplied from the database
  /** TODO: add a studentYear field to user, then access it here */
  studentYear: string = "Senior";
  ishidden = false;
  ishiddenbtn = true;
  ishiddenbtn2= false;
  ishiddenSuggested = true;
  isheader=true;
  suggestedCourses = [];
  suggestedSchedule = [];
  public courseList: Observable<Course[]>;
  courses = [];
  user:any;
  course;
  finalSchedule: Class0[] = [];
  csc101_1;
  csc101_2;
  csc200_1;
  csc200_2;
  csc325_1;
  csc325_2;
  csc300_1;
  csc300_2;
  eng110_1;
  eng110_2;
  math200_1;
  math200_2;
  mkt300_1;
  mkt300_2;
  mkt200_1;
  mkt200_2;
  coursesDB;
  g;
  num;
  constructor(private firestoreService: AuthService,
    private db:AngularFirestore,
    private auth:AuthService,
    public loadingCtrl: LoadingController,
    private db2:AngularFirestore,
    private router: Router,
    public toastController: ToastController){
  this.g = new SA();

  // create classes
  this.csc101_1 = new Class0("CSC101","Ali","4/21/2021, 9:30:00 AM","4/21/2021, 10:30:00 AM","81hww","B110",["SU","TU","TH"],"30","3","28","1","FREQ=WEEKLY,BYDAY=SU,TU,TH,INTERVAL=1");
  this.csc101_2 = new Class0("CSC101","Ali","4/21/2021, 11:00:00 AM","4/21/2021, 12:30:00 PM","81hsdw","H110",["SU","TU","TH"],"30","3","28","2","FREQ=WEEKLY,BYDAY=SU,TU,TH,INTERVAL=1");
  this.csc200_1 = new Class0("CSC200","Saeed","4/21/2021, 11:00:00 AM","4/21/2021, 12:30:00 PM","121hww","B110",["SU","TU","TH"],"35","3","20","1","FREQ=WEEKLY,BYDAY=SU,TU,TH,INTERVAL=1");
  this.csc200_2 = new Class0("CSC200","Ali","4/21/2021, 10:00:00 AM","4/21/2021, 11:50:00 AM","81hww","B110",["TU"],"35","3","20","2","FREQ=WEEKLY,BYDAY=TU,INTERVAL=1");
  this.csc325_1 = new Class0("CSC325","Awad","4/21/2021, 9:30:00 AM","4/21/2021, 10:30:00 AM","81hww","B110",["MO","WE"],"18","3","5","1","FREQ=WEEKLY,BYDAY=MO,WE,INTERVAL=1");
  this.csc325_2 = new Class0("CSC325","Awad","4/21/2021, 11:30:00 AM","4/21/2021, 1:00:00 PM","81hww","B110",["SU","TU","TH"],"18","3","5","2","FREQ=WEEKLY,BYDAY=SU,TU,TH,INTERVAL=1");
  this.csc300_1 = new Class0("CSC300","khoulod","4/21/2021, 11:30:00 AM","4/21/2021, 1:00:00 PM","81hww","B110",["SU","TU","TH"],"29","3","30","1","FREQ=WEEKLY,BYDAY=SU,TU,TH,INTERVAL=1");
  this.csc300_2 = new Class0("CSC300","khoulod","4/21/2021, 11:30:00 AM","4/21/2021, 1:00:00 PM","81hww","B110",["MO","WE"],"29","3","30","2","FREQ=WEEKLY,BYDAY=MO,WE,INTERVAL=1");
  this.eng110_1 = new Class0("ENG110","Ameer","4/21/2021, 1:00:00 PM","4/21/2021, 2:30:00 PM","81hww","B110",["MO","WE"],"18","3","10","1","FREQ=WEEKLY,BYDAY=MO,WE,INTERVAL=1");
  this.eng110_2 = new Class0("ENG110","Ameer","4/21/2021, 3:00:00 PM","4/21/2021, 4:30:00 PM","81hww","B110",["MO","WE"],"18","3","10","2","FREQ=WEEKLY,BYDAY=MO,WE,INTERVAL=1");
  this.math200_1 = new Class0("MATH200","Kim","4/21/2021, 3:00:00 PM","4/21/2021, 4:30:00 PM","81hww","B110",["MO","WE"],"18","3","10","1","FREQ=WEEKLY,BYDAY=MO,WE,INTERVAL=1");
  this.math200_2 = new Class0("MATH200","Kim","4/21/2021, 9:00:00 AM","4/21/2021, 9:50:00 PM","81hww","B110",["SU","TU","TH"],"18","3","10","2","FREQ=WEEKLY,BYDAY=SU,TU,TH,INTERVAL=1");
  this.mkt300_1 = new Class0("MKT300","Zinger","4/21/2021, 9:00:00 AM","4/21/2021, 9:50:00 PM","81hww","B110",["SU","TU","TH"],"29","3","30","1","FREQ=WEEKLY,BYDAY=SU,TU,TH,INTERVAL=1");
  this.mkt300_2 = new Class0("MKT300","Zinger","4/21/2021, 7:00:00 PM","4/21/2021, 8:30:00 PM","81hww","B110",["MO","WE"],"29","3","30","2","FREQ=WEEKLY,BYDAY=MO,WE,INTERVAL=1");
  this.mkt200_1 = new Class0("MKT200","Assamaho","4/21/2021, 5:00:00 PM","4/21/2021, 6:30:00 PM","81hww","B110",["MO","WE"],"35","3","20","1","FREQ=WEEKLY,BYDAY=MO,WE,INTERVAL=1");
  this.mkt200_2 = new Class0("MKT200","Domodos","4/21/2021, 10:00:00 AM","4/21/2021, 10:50:00 AM","81hww","B110",["SU","TU","TH"],"35","3","20","2","FREQ=WEEKLY,BYDAY=SU,TU,TH,INTERVAL=1");
  this.auth.user$.subscribe(user =>{
    this.user = user;
  });
   this.firestoreService.getCourseList().subscribe(course=>{this.course=course});
  this.courseList=this.firestoreService.getCourseList();
  this.firestoreService.getCourseList().subscribe(course=>{this.course=course});
  //create a dataset for classes available this semester
 this.coursesDB = [this.csc101_1,this.csc101_2,this.csc200_1,this.csc200_2,this.csc300_1,this.csc300_2,this.csc325_1,this.csc325_2,this.eng110_1,this.eng110_2,this.math200_1,this.mkt200_1,this.mkt300_1,this.mkt300_2];
  /************* test ***********/
 // this.course = [this.csc101_1,this.csc101_2,this.csc200_1,this.csc200_2,this.csc300_1,this.csc300_2,this.csc325_1,this.csc325_2];
  /************* test ***********/
  // let coursesWanted = [];

  //coursesDB.push(csc101_1,csc101_2,csc200_1,csc200_2,csc300_1,csc300_2,csc325_1,csc325_2,eng110_1,eng110_2,math200_1,mkt200_1,mkt300_1,mkt300_2);
  }
  public ngOnInit() {
    //Suggests a schedule according to your year
    switch (this.studentYear) {
      case 'Freshman':
        this.suggestedCourses = ["CSC101","MKT200","ENG110"];
        break;
      case 'Sophomore':
        this.suggestedCourses = ["MATH200","CSC200","ENG110"];
        break;
      case 'Junior':
        this.suggestedCourses = ["CSC300","MATH200","CSC325"];
        break;
      case 'Senior':
        this.suggestedCourses = ["test3","lol","test"];
        break;
      default:
        this.suggestedCourses = ["CSC101","MKT200","ENG110"];
        break;
    }
    //this.suggestedSchedule = GS.output(this.g, GS.temperture,GS.iterations,GS.nFitnesses,this.course,this.suggestedCourses,GS.reductionFactor);
 }

  async presentToast() {
  const toast = await this.toastController.create({
    message: 'ERROR:No conflict-free schedule, try to change some courses',
    duration: 5000,
    color: "warning",
    animated: true
  });
  toast.present();
  }

  generate(){
    // console.log("selected courses:",this.courses);
    // console.log("courses in db:",this.course);
    let schedule = GS.output(this.g, GS.temperture,GS.iterations,GS.nFitnesses,this.coursesDB,this.courses,GS.reductionFactor);
    if (schedule.length !== 0){
    this.finalSchedule = schedule;
    this.ishiddenbtn = false;
    this.isheader=false;
    }else {
      this.isheader = true;
      this.ishiddenbtn = true;
      this.finalSchedule = [];
      this.presentToast();
    }

    // console.log("Final schedule:",this.finalSchedule);
  }
  showSuggested(){
    this.suggestedSchedule = GS.output(this.g, GS.temperture,GS.iterations,GS.nFitnesses,this.course,this.suggestedCourses,GS.reductionFactor);
  }

  timeOnly(arr){
    let splitArr = arr.split(", ");
    return splitArr[1];
  }

  accept(schedule)
  {
    for(let i of schedule){
      this.db.collection(`course`).doc(i.id).update({ studId:firebase.firestore.FieldValue.arrayUnion(this.user?.userId)/*NEW QUANTITY*/ });
      }
  }
  async accepted(schedule){
    const loading = await this.loadingCtrl.create();
    for(let i of schedule){
    const start = i.start;
    const color='#26c57d';
    const recurring= i.recurring;
    const end = i.end;
    const title = i.courseCode;
    //end.setMinutes(end.getMinutes() + 60);
    //this.db2.collection(`pform`).doc(this.pform.id).update({ accepted: true });
    let event = {
      title: title,
      start: start,
      end: end,
      color: color,
      allDay: false,
      sId:this.user.userId,
      recurring:recurring
    };

    this.db2.collection(`events`).add(event).then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/schedule');
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
