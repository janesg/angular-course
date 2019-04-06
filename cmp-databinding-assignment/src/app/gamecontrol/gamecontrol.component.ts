import { Component, 
         OnInit,
         Output,
         EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-gamecontrol',
  templateUrl: './gamecontrol.component.html',
  styleUrls: ['./gamecontrol.component.css']
})
export class GamecontrolComponent implements OnInit {

  @Output() countIncremented = new EventEmitter<number>();
  
  gameStarted = false;
  currentCount;
  countScheduler;

  constructor() {}

  ngOnInit() {}

  onStart() {
    this.gameStarted = true;
    this.currentCount = 0;
    
    // ****************************
    // 3 ways of emitting the count
    // ****************************
    
    // (1) bind 'this' so that variables above are in context for function

    // this.countScheduler = setInterval(this.emitCount.bind(this), 1000);
    
    // (2) Since the inner function has a different this from the outside, 
    // use a helper variable.

    // that = this;
    // this.countScheduler = setInterval(function() {
    //     return that.emitCount();
    // }, 1000);
    
    // (3) Using ES6 'arrow function'
    // An anonymous functions that inherits the "this" from the outer function
    
    this.countScheduler = setInterval(() => {
      this.currentCount++;
      this.countIncremented.emit(this.currentCount);
    }, 1000);
  }

  onStop() {
    this.gameStarted = false;
    clearInterval(this.countScheduler);
  }
  
  emitCount() {
    this.currentCount++;
    this.countIncremented.emit(this.currentCount);
  }
}
