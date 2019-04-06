import { Component, OnInit } from '@angular/core';

import { UserService } from '../service/user.service';
import { CounterService } from '../service/counter.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
  providers: [CounterService]
})
export class ActiveUsersComponent implements OnInit {
  users: string[];

  constructor(private usrSrv: UserService, private countSrv: CounterService) {}
  
  ngOnInit() {
    this.users = this.usrSrv.activeUsers;
  }
  
  onSetToInactive(id: number) {
    this.usrSrv.onSetToInactive(id);
    this.countSrv.incrementCount("Active -> Inactive : ");
  }
}
