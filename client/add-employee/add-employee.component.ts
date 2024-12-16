import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { EmployeeService } from 'src/app/employee.service';
import { Employee } from 'src/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  name: string = '';
  email: string = '';
  bDate: string = '';
  errorMessage: string = '';
  password: string = '';
  isEdit: boolean = false;
  id: number = 0;
  constructor(
    private empService: EmployeeService,
    private authService: AuthService,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.queryParams.subscribe((res: any) => {
      if (res && res?.id) {
        this.isEdit = true;
        this.empService.getEmployeeById(res?.id).pipe(take(1)).subscribe((res: Employee) => {
          if (res && res?.id) {
            this.name = res?.name;
            this.email = res?.email;
            this.bDate = res?.birthdate;
            this.id = res?.id;
            this.password = res?.password;
          }
        });
      }
    })
  }

  navigateToHome(): void {
    this.authService.navigate('adminDashboard');
  }
  addEmployee(): void {
    if (this.name === '') {
      this.errorMessage = 'Name should not be blank';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    if (this.email === '') {
      this.errorMessage = 'Email should not be blank';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = regExp.test(this.email)
    if (!isValidEmail) {
      this.errorMessage = 'Email is not valid';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }      
    if (this.bDate === '') {
      this.errorMessage = 'Please select birthdate';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    if (this.password === '') {
      this.errorMessage = 'Password should not be blank';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    this.errorMessage = '';
    const body = {
      name: this.name,
      email: this.email,
      birthdate: this.bDate,
      password: this.password
    };
    if (!this.isEdit) {
      this.empService.addEmployee(body).pipe(take(1)).subscribe((res) => {
        if (res && res?.id) {
          alert("Employee Added successfully");
          this.navigateToHome();
        }
      });
    } else {
      this.empService.updateEmployee(body, this.id).pipe(take(1)).subscribe((res) => {
        if (res && res.id) {
          alert("Employee update successfully");
          this.navigateToHome();
        }
      });
    }
  
  }
}
