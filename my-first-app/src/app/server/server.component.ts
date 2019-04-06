import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [`
    .online {
      color: white;
    }`]
})
export class ServerComponent { 
  // Can add the property type, but not necessary
  serverId: number = 10;
  serverStatus = 'offline';
  
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }
  
  getServerStatus() {
    return this.serverStatus + ' again...';
  }
  
  getColor() {
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
  
  getFontWeight() {
    return this.serverStatus === 'online' ? 'normal' : 'bold';
  }
}
