import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  address = '台中科技大學';
  latitude = 0;
  longitude = 0;
  constructor(
    public sanitizer: DomSanitizer
  ) {
    this.sanitizer = sanitizer;
  }
  ionViewDidEnter() {
  }
}
