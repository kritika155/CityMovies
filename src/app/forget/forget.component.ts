import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import  CustomerService  from '../customer.service';
import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss'],
})
export class ForgetComponent implements OnInit {
  customer={email:'',security_question:'',answer:''};
  password='';
  message='';
list=[];
OTP='';
verifyOTP;
  constructor(public alertController: AlertController,private customerService: CustomerService,private router:Router,private _location: Location) 
  {
     this.customerService.getDBCustomers(); 
    }

  ngOnInit() {
    // this.customerService.getRemoteCustomers().subscribe((result)=>{this.list=result;});
    // this.customerService.getCustomers(this.customer);
    var digits = '0123456789'; 
          
    for (let i = 0; i < 4; i++ ) { 
        this.OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
  }
  move(){
    this._location.back();
  }
 log(){
  this.router.navigate(['/login']);
 }
  reset(customer){
    this.customerService.getRemoteCustomers().subscribe((result)=>{this.list=result;});
  
    for(var i=0;i<this.list.length;i++)
    {
      if((customer.email==this.list[i].email)&&(customer.security_question==this.list[i].security_question))
      {
        if(customer.answer==this.list[i].answer){
         
         if(this.OTP==this.verifyOTP){
           this.password+='Password:';
          this.password+=this.list[i].password;
          console.log('password successful');
          console.log(this.password);
          

          this.message+='Password Successful';
         }
          else{
            console.log('OTP does not match!Try Again');
          }
      
        }

        else{
          console.log('Not Successful')
        }
     }
     
    }
  }

}
