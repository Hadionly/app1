import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from "@ionic/angular";
import { HideNavService } from "../services/hide-nav.service";

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.page.html',
  styleUrls: ['./welcome-screen.page.scss'],
})
export class WelcomeScreenPage{

  constructor(private router: Router, private navservice: HideNavService) {
    this.navservice.changeNav(true);
  }

  redirectlogin(){
    this.router.navigateByUrl('login')
  }

}
