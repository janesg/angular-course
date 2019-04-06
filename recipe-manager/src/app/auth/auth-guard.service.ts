import { Injectable } from '@angular/core';
import { Route, CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    
    constructor(private authService, AuthService) { }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthenticated();
    }
    
    canLoad(route: Route) {
        // return this.permissions.canLoadChildren(this.currentUser, route);
        return this.authService.isAuthenticated();
    }
}