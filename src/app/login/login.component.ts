import { Component, OnInit } from '@angular/core';
import  CustomerService  from '../customer.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  customer:any={};
list=[];
Link:any="https://wwww.facebook.com"
constructor(private customerService: CustomerService,private router :Router) {
  this.customerService.getDBCustomers();
  
 }

  ngOnInit() {
    this.customerService.getRemoteCustomers().subscribe((result)=>{this.list=result;});
    // this.customerService.getCustomers(this.customer);

  }
 facebook(){

 }
  doLogin(customer){
    for(var i=0;i<this.list.length;i++)
    {
      if((customer.email==this.list[i].email)&&(customer.password==this.list[i].password))
      {
        this.customer.id=this.list[i].id;
        this.customer.email=this.list[i].email;
        this.customer.password=this.list[i].password;
        localStorage.setItem('users', JSON.stringify(this.customer));
        this.customer = JSON.parse(localStorage.getItem('users'));
        console.log(customer);
        this.router.navigate(['/movies']);
       
        break;
      }
      
    }
  }

}
