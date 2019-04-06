import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit {

  // Bring the app component's countVal into this component with alias
  @Input('countVal') evenVal: number;

  constructor() { }

  ngOnInit() {
  }

}
