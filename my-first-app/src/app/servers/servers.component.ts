import { Component, OnInit } from '@angular/core';

@Component({
  // Note: selecting by id is not supported by Angular
  // selector: 'app-servers',   -- element selector
  // selector: '[app-servers]', -- attribute selector
  selector: '.app-servers',  // class selector
  // template: `
  //   <app-server></app-server>
  //   <p>Something inbetween</p>
  //   <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Test Server';
  serverCreated = false;
  servers = ['Test Server', 'Test Server 2'];
  
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  getAllowNewServer() {
    return this.allowNewServer;
  }
  
  ngOnInit() {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server : ' + this.serverName + ' was created !!';
  }
  
  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement> event.target).value;
  }
}
