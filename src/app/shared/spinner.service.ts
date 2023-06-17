import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  showSpinner: boolean = false;
  
  constructor() { }

  show() {
    this.showSpinner = true;
  }

  hide() {
    this.showSpinner = false;
  }
}
