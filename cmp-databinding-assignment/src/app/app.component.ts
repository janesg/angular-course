import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  oddNums: number[] = [];
  evenNums: number[] = [];
  
  onCountIncremented(countValue: number) {
    if (countValue % 2 === 0) {
      this.evenNums.push(countValue);
    } else {
      this.oddNums.push(countValue);
    }
  }
}
