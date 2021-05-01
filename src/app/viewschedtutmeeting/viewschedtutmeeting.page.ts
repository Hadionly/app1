import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Pform } from '../models/pform';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewschedtutmeeting',
  templateUrl: './viewschedtutmeeting.page.html',
  styleUrls: ['./viewschedtutmeeting.page.scss'],
})
export class ViewschedtutmeetingPage implements OnInit {

  public smeetingList: Observable<Pform[]>;
  user: any;
  constructor(
    private firestoreService: AuthService,
    private auth: AuthService,
    private router:Router

    ) { }

  ngOnInit() {
    this.smeetingList = this.firestoreService.getTmeetingList();
    this.auth.user$.subscribe(user =>{
      this.user = user;
    })
  }
  RedirTmeeting(){
    this.router.navigate(['/profile'])
  }
  RedirViewStudentmeeting(){
    this.router.navigate(['/viewstudentmeeting'])
  }
}
