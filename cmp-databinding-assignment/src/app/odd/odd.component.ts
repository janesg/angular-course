import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit {
  
  // Bring the app component's countVal into this component with alias
  @Input('countVal') oddVal: number;

  constructor() { }

  ngOnInit() {
  }

}
