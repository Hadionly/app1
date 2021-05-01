import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Pform } from '../models/pform';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-viewmeeting',
  templateUrl: './viewmeeting.page.html',
  styleUrls: ['./viewmeeting.page.scss'],
})
export class ViewmeetingPage implements OnInit {
  public pmeetingList: Observable<Pform[]>;
  public g: Observable<Pform[]>;
  user: any;
  constructor(
    private firestoreService: AuthService,
    private auth: AuthService
    
    ) { }

  ngOnInit() {
    this.pmeetingList = this.firestoreService.getPmeetingList();
    this.g = this.pmeetingList;
    this.auth.user$.subscribe(user =>{
      this.user = user;
    })
  }

  async initializeItems(): Promise<any> {
    this.pmeetingList = this.g;
  }

  async filterList(evt) {
    this.initializeItems();

    const searchTerm = evt.target.value;
  
    if (!searchTerm) {
      return;
    }

    this.pmeetingList = this.pmeetingList.pipe(map(s => s.filter(currentProf => {
      if (currentProf.sName && searchTerm) {
        return (currentProf.sName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 );
      }
    })));
      
  
    
}

  
}
