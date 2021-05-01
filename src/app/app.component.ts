import { Component, OnInit } from '@angular/core';
import { HideNavService } from "./services/hide-nav.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  hideNav: boolean;

  constructor(private navservice: HideNavService) {

  }

  ngOnInit() {
    this.navservice.cast.subscribe(data => this.hideNav = data);
  }


}
