import { Component, OnInit } from '@angular/core';
import  CustomerService  from '../customer.service';
import {Location} from '@angular/common';
import { Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  customer:any={
   
    name:"",
    password:'',
    address:"",
    email:"",
    phone:""
    
};
customers: any = [
  // {id:1, name:'kritika',password:'12344',address:"India",email:'kritikaroy@gmail.com', phone:'09038187690'},
  // {id:2, name:'Ashish',password:'12345',address:"India",email:'ashishroy@gmail.com',phone:'09038187691' }
]

list=[];  

  constructor(private customerService: CustomerService,private router :Router,private _location: Location) {
    this.customerService.getDBCustomers();
    this.customerService.getRemoteCustomers().subscribe((result)=>{this.list=result;});
   }

  ngOnInit() { 
   
  }
    addCustomer(customer){

      this.customerService.addRemoteCustomer(this.customer).subscribe(()=>{this.router.navigate(['/login']);});
    }
    move(){
      this._location.back();
    }
}
