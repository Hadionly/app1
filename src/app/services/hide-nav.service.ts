import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HideNavService {

  public hideNav = new BehaviorSubject<boolean>(false);
  cast = this.hideNav.asObservable();

  constructor() { }

  changeNav(val:boolean) {
    this.hideNav.next(val);
  }
}
