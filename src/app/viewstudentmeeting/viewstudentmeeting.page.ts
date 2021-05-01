import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Pform } from '../models/pform';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewstudentmeeting',
  templateUrl: './viewstudentmeeting.page.html',
  styleUrls: ['./viewstudentmeeting.page.scss'],
})
export class ViewstudentmeetingPage implements OnInit {

  public smeetingList: Observable<Pform[]>;
  user: any;
  constructor(
    private firestoreService: AuthService,
    private auth: AuthService,
    private router: Router

    ) { }

  ngOnInit() {
    this.smeetingList = this.firestoreService.getPmeetingList();
    this.auth.user$.subscribe(user =>{
      this.user = user;
    })
  }
  RedirTmeeting(){
    this.router.navigate(['/profile'])
  }
  RedirViewTutmeeting(){
    this.router.navigate(['/viewschedtutmeeting'])
  }
}
