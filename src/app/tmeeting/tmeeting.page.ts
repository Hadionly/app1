import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { map } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-tmeeting',
  templateUrl: './tmeeting.page.html',
  styleUrls: ['./tmeeting.page.scss'],
})
export class TmeetingPage implements OnInit {
  public tutList: Observable<User[]>;
  public g: Observable<User[]>;
  user: any;
  constructor(
    private firestoreService: AuthService,
    
    
    ) { }

    async ngOnInit() {
      this.tutList = this.firestoreService.getUserList();
      this.g = this.tutList;
      this.firestoreService.user$.subscribe(user =>{
        this.user = user;
      })
  }
    
    async initializeItems(): Promise<any> {
      this.tutList = this.g;
    }
  
    async filterList(evt) {
      this.initializeItems();
  
      const searchTerm = evt.target.value;
    
      if (!searchTerm) {
        return;
      }
  
      this.tutList = this.tutList.pipe(map(s => s.filter(currentProf => {
        if (currentProf.userName && searchTerm) {
          return (currentProf.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 );
        }
      })));
        
    
      
  }}