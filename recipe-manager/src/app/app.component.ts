import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  loadedSection = 'recipe';
  
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "<Value generated on authentication area of FireBase web site>",
      authDomain: "<Value specified when creating app account on FireBase web site>"
    });
  }

  sectionSelected(section: string) {
    this.loadedSection = section;
  }
  
}
