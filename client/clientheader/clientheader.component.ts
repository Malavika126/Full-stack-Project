import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-clientheader',
  templateUrl: './clientheader.component.html',
  styleUrls: ['./clientheader.component.css']
})
export class ClientheaderComponent {
  url: string = '/';
  user:any;
  constructor(
    private route: Router,
    private authService: AuthService
  ) {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo !== null) {
      this.user = JSON.parse(userInfo);
    }
  }


  ngOnInit(): void {
  
  }
  gotourl(url: string): void {
    if (url === 'logout') {
      this.authService.clientLogout();
      return;
    }
    
    this.route.navigate(["/"+url]);
  }
}
