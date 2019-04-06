import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { CounterService } from '../service/counter.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css'],
  providers: [CounterService]
})
export class InactiveUsersComponent implements OnInit {
  users: string[];

  constructor(private usrSrv: UserService, private countSrv: CounterService) {}
  
  ngOnInit() {
    this.users = this.usrSrv.inactiveUsers;
  }
  
  onSetToActive(id: number) {
    this.usrSrv.onSetToActive(id);
    this.countSrv.incrementCount("Inactive -> Active : ");
  }
}
