
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Component({
  selector: 'app-viewcal',
  templateUrl: 'viewcal.page.html',
  styleUrls: ['viewcal.page.scss'],
})
export class ViewcalPage {
  public userList: Observable<User[]>;
  user: any;
  
  public createEventForm: FormGroup;

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  selectedDate = new Date();
  

  public event: Event;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private auth: AuthService
  ) {
    const userId: string = this.route.snapshot.paramMap.get('id');
    this.createEventForm = formBuilder.group({
      title: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    this.auth.user$.subscribe(user =>{
      this.user = user;
    });

    this.db.collection(`events`).snapshotChanges().subscribe(colSnap => {
      
      this.eventSource = [];
      colSnap.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc.id;
        event.startTime = event.start.toDate();
        event.endTime = event.end.toDate();
        
        console.log(event);
        (userId == event.pId || userId == event.sId)?this.eventSource.push(event):console.log('  '   + userId + '   ' + event.pId);
      });
    });
  }
  ngOnInit() {
   
 
  }
  

  
  async addNewEvent() {
    const startt = new Date(Date.parse(this.createEventForm.value.startTime));
   
    const endt = new Date(Date.parse(this.createEventForm.value.endTime));
   
    const start = startt;
    const end = endt;
    const title = this.createEventForm.value.title;
    //end.setMinutes(end.getMinutes() + 60);

    let event = {
      title: title,
      startTime: start,
      endTime: end,
      allDay: false,
      sId:this.user.userId,
      pId:this.user.userId
    };

    this.db.collection(`events`).add(event);
  }

  onViewTitleChanged(title) {
    console.log(title);
    this.viewTitle=title;
  }

  onEventSelected(event) {
    
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
   
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
   
  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

}

