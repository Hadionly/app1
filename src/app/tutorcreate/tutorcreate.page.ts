import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
@Component({
  selector: 'app-tutorcreate',
  templateUrl: './tutorcreate.page.html',
  styleUrls: ['./tutorcreate.page.scss'],
})
export class TutorcreatePage implements OnInit {

  public stuList: Observable<User[]>;
  constructor(
    private firestoreService: AuthService,
    
    ) { }

  ngOnInit() {
    this.stuList = this.firestoreService.getUserList();
  }

}
