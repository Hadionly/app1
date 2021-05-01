import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { map } from 'rxjs/operators'
@Component({
  selector: 'app-pmeeting',
  templateUrl: './pmeeting.page.html',
  styleUrls: ['./pmeeting.page.scss'],
})
export class PmeetingPage implements OnInit {
  public profList: Observable<User[]>;
  public g: Observable<User[]>;
  constructor(
    private firestoreService: AuthService,
    
    ) { }

    async ngOnInit() {
      this.profList = this.firestoreService.getUserList();
      this.g = this.profList;
  }
    
    async initializeItems(): Promise<any> {
      this.profList = this.g;
    }
  
    async filterList(evt) {
      this.initializeItems();
  
      const searchTerm = evt.target.value;
    
      if (!searchTerm) {
        return;
      }
  
      this.profList = this.profList.pipe(map(s => s.filter(currentProf => {
        if (currentProf.userName && searchTerm) {
          return (currentProf.userName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 );
        }
      })));
        
    
      
  }}