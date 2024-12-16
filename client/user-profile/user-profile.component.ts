import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { UpdateProfileComponent } from 'src/app/update-profile/update-profile.component';
import { User } from 'src/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  accountNumber: string = '';
  user: any;
  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    const usr = localStorage.getItem('userInfo');
    if (usr !== null) {
      this.user = JSON.parse(usr);
    }
  }

  openProfileDialog(): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: {id: localStorage.getItem('uId')},
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(() => {
      const usr = localStorage.getItem('userInfo');
      if (usr !== null) {
        this.user = JSON.parse(usr);
        window.location.reload();
      }
    });
  }
}
