
import { Component, ViewChild, OnInit } from '@angular/core';
import {
    MbscCalendarEvent,
    MbscDatepickerOptions,
    MbscEventcalendarOptions,
    MbscPopup,
    MbscPopupOptions,
    Notifications,
    setOptions
    
} from '@mobiscroll/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
setOptions({
    theme: 'ios',
    themeVariant: 'light',
 
   
});

const now = new Date();

@Component({
    selector: 'app-newcal',
    templateUrl: 'newcal.page.html',
    providers: [Notifications],
    styleUrls: ['newcal.page.scss'],
})
export class NewcalPage {
    // Place the code below into your own component or use the full template
    user:any;
myEvents:MbscCalendarEvent[];
    constructor(private notify: Notifications,
      private db: AngularFirestore, 
      public route: ActivatedRoute,
      public alertController: AlertController,
      private firestoreService: AuthService,
      private router: Router,
      private toastr:ToastController,
      ) {
        const userId: string = this.route.snapshot.paramMap.get('id');
        this.db.collection(`events`).snapshotChanges().subscribe(colSnap => {
      
          this.myEvents = [];
          colSnap.forEach(snap => {
            let event:any = snap.payload.doc.data();
            event.id = snap.payload.doc.id;
            event.start = new Date(Date.parse(event.start));
            event.end = new Date(Date.parse(event.end));
            
            console.log(event);
            (userId == event.pId || userId == event.sId)?this.myEvents.push(event):console.log('  '   + userId + '   ' + event.pId);
          });
        });
        
        this.firestoreService.user$.subscribe(user =>{
            this.user = user;
          })
      }
    @ViewChild('popup', { static: false })
    popup!: MbscPopup;
    popupEventTitle: string | undefined;
    popupEventDescription = '';
    popupEventAllDay = true;
    popupEventDates: any;
    popupEventStatus = 'busy';
  //  poprec:any;
    calendarSelectedDate: any = now;
    switchLabel: any = 'All-day';
    //myEvents: MbscCalendarEvent[]=this.eventSource;
  //  global.console.log();

    /* = [{
        id: 1,
        start: new Date(now.getFullYear(), now.getMonth(), 8, 13),
        end: new Date(now.getFullYear(), now.getMonth(), 8, 13, 30),
        title: 'Lunch @ Butcher\'s',
        color: '#26c57d'
    }, {
        id: 2,
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16),
        title: 'General orientation',
        color: '#fd966a'
    }, {
        id: 3,
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 22),
        title: 'Dexter BD',
        color: '#37bbe4'
    }, {
        id: 4,
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 30),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 30),
        title: 'Stakeholder mtg.',
        color: '#d00f0f'
    }];*/
    
    tempEvent!: MbscCalendarEvent;
    calendarOptions: MbscEventcalendarOptions = {
        clickToCreate: 'double',
        dragToCreate: true,
        dragToMove: true,
        dragToResize: true,
 
        view: {
            calendar: { type: 'month', labels: true },
            agenda:{type:'day',}
        },
        onEventClick: (args) => {
            this.isEdit = true;
            this.tempEvent = args.event;
            // fill popup form with event data
            this.loadPopupForm(args.event);
            // set popup options
            this.popupHeaderText = 'Edit event';
            this.popupButtons = this.popupEditButtons;
            this.popupAnchor = args.domEvent.currentTarget;
            // open the popup
            this.popup.open();
        },
        onEventCreated: (args) => {
            setTimeout(() => {
                this.isEdit = false;
                this.tempEvent = args.event;
                // fill popup form with event data
                this.loadPopupForm(args.event);
                // set popup options
                this.popupHeaderText = 'New Event';
                this.popupButtons = this.popupAddButtons;
                this.popupAnchor = args.target;
                // open the popup
                this.popup.open();
            });
        },
        onEventDeleted: (args) => {
            setTimeout(() => {
                this.deleteEvent(args.event);
            });
        },
        onEventUpdated: (args) => {
            // here you can update the event in your storage as well, after drag & drop or resize
            // ...
        }
    };
    popupHeaderText!: string;
    popupAnchor: HTMLElement | undefined;
    popupAddButtons = ['cancel', {
        handler: () => {
            this.saveEvent();
        },
        keyCode: 'enter',
        text: 'Add',
        cssClass: 'mbsc-popup-button-primary'
    }];
    popupEditButtons = ['cancel', {
        handler: () => {
            this.saveEvent();
        },
        keyCode: 'enter',
        text: 'Save',
        cssClass: 'mbsc-popup-button-primary'
    }];
    popupButtons: any = [];
    popupOptions: MbscPopupOptions = {
        display: 'bottom',
        contentPadding: false,
        fullScreen: true,
        onClose: () => {
            if (!this.isEdit) {
                // refresh the list, if add popup was canceled, to remove the temporary event
                this.myEvents = [...this.myEvents];
            }
        },
        responsive: {
            medium: {
                display: 'bubble',
                width: 400,
                fullScreen: false,
                touchUi: false
            }
        }
    };
    datePickerControls = ['date'];
    datePickerResponsive: any = {
        medium: {
            controls: ['calendar'],
            touchUi: false
        }
    };
    datetimePickerControls = ['datetime'];
    datetimePickerResponsive = {
        medium: {
            controls: ['calendar', 'time'],
            touchUi: false
        }
    };
    datePickerOptions: MbscDatepickerOptions = {
        select: 'range',
        showRangeLabels: false,
        touchUi: true
    };
    isEdit = false;
    loadPopupForm(event: MbscCalendarEvent): void {
        this.popupEventTitle = event.title;
        this.popupEventDescription = event.description;
        this.popupEventDates = [event.start, event.end];
        this.popupEventAllDay = event.allDay || false;
        this.popupEventStatus = event.status || 'busy';
       // this.poprec=event.recurring;
    }
    saveEvent(): void {
        this.tempEvent.title = this.popupEventTitle;
        this.tempEvent.description = this.popupEventDescription;
        this.tempEvent.start = this.popupEventDates[0];
        this.tempEvent.end = this.popupEventDates[1];
        this.tempEvent.allDay = this.popupEventAllDay;
        this.tempEvent.status = this.popupEventStatus;
        if (this.isEdit) {
            // update the event in the list
            //this.myEvents = [...this.myEvents];
            // here you can update the event in your storage as well
            // ...
            
           
            this.db.collection(`events`).doc(this.tempEvent.id.toString()).update({ 
                title: this.popupEventTitle, 
                start:this.popupEventDates[0].toLocaleString(),
                end:this.popupEventDates[1].toLocaleString(),
                allDay:this.popupEventAllDay,
                description:this.popupEventDescription/*NEW QUANTITY*/ });
        } else {
            // add the new event to the list
            //this.myEvents = [...this.myEvents, this.tempEvent];
            const startt = this.popupEventDates[0].toLocaleString();
       
        const endt = this.popupEventDates[1].toLocaleString();
       const personal = true;
        const start = startt;
        const end = endt;
        const title = this.popupEventTitle;
        const description = this.popupEventDescription;
        const allday = this.popupEventAllDay;
        //end.setMinutes(end.getMinutes() + 60);
   
        let event = {
          title: title,
          start: start,
          end: end,
          allDay: allday,
          sId:this.user.userId,
          pId:this.user.userId,
          personal:personal,
          description:description
        };
        if(description==undefined){
            event.description=""
        }
        this.db.collection(`events`).add(event);
            // here you can add the event to your storage as well
            // ...
        }
        // navigate the calendar
       // this.calendarSelectedDate = this.popupEventDates[0];
        // close the popup
        this.popup.close();
    }
    deleteEvent(event: MbscCalendarEvent): void {
        this.myEvents = this.myEvents.filter(item => item.id !== event.id);
        this.notify.snackbar({
            button: {
                action: () => {
                    this.myEvents = [...this.myEvents, event];
                },
                text: 'Undo'
            },
            message: 'Event deleted'
        });
        // here you can delete the event from your storage as well
        // ...
    }
    onDeleteClick(): void {
        this.deleteEvent(this.tempEvent);
        console.log(this.tempEvent.id)
        this.popup.close();
    }
    async delete(): Promise<void> {
        if(this.tempEvent.personal==true){
        const alert = await this.alertController.create({
          message: `Are you sure you want to delete this event?`,
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
                this.firestoreService.deleteEvent(this.tempEvent.id.toString()).then(() => {
                 // this.router.navigateByUrl('/newcal');
                 console.log(this.tempEvent.id)
                });
              },
            },
          ],
        });
      
        await alert.present();
      //  this.popup.close();
    }else{
        this.toast('You cannot delete this event', 'warning');
    }
    this.popup.close();
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
      async addNewEvent() {
        const startt = this.popupEventDates[0].toLocaleString();
       
        const endt = this.popupEventDates[1].toLocaleString();
       const personal = true;
        const start = startt;
        const end = endt;
        const title = this.popupEventTitle;
        const description = this.popupEventDescription;
        const allday = this.popupEventAllDay;
        //end.setMinutes(end.getMinutes() + 60);
   
        let event = {
          title: title,
          start: start,
          end: end,
          allDay: allday,
          sId:this.user.userId,
          pId:this.user.userId,
          personal:personal,
          description:description
        };
        if(description==undefined){
            event.description='none'
        }
        this.db.collection(`events`).add(event);
      }
}
