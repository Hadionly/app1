import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Pform } from '../models/pform';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-viewtutmeeting',
  templateUrl: './viewtutmeeting.page.html',
  styleUrls: ['./viewtutmeeting.page.scss'],
})
export class ViewtutmeetingPage implements OnInit {
  public tmeetingList: Observable<Pform[]>;
  public g: Observable<Pform[]>;
  user: any;
  constructor(
    private firestoreService: AuthService,
    private auth: AuthService,
    private router: Router

    ) { }

  ngOnInit() {
    this.tmeetingList = this.firestoreService.getTmeetingList();
    this.g = this.tmeetingList;
    this.auth.user$.subscribe(user =>{
      this.user = user;
    })
  }

  async initializeItems(): Promise<any> {
    this.tmeetingList = this.g;
  }

  async filterList(evt) {
    this.initializeItems();

    const searchTerm = evt.target.value;

    if (!searchTerm) {
      return;
    }

    this.tmeetingList = this.tmeetingList.pipe(map(s => s.filter(currentProf => {
      if (currentProf.sName && searchTerm) {
        return (currentProf.sName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 );
      }
    })));



}

  RedirTmeeting(){
    this.router.navigate(['/profile'])
  }
}
