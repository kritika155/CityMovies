import { Component, OnInit } from '@angular/core';
import  CustomerService  from '../customer.service';
import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  customer:any={};
list=[];
message;
message2;
OTP='';
verifyOTP;
constructor(private customerService: CustomerService,private router :Router,public alertController: AlertController) {
  this.customerService.getDBCustomers();
 
 }

  ngOnInit() {
    this.customerService.getRemoteCustomers().subscribe((result)=>{this.list=result;});
    // this.customerService.getCustomers(this.customer);
    var digits = '0123456789'; 
          
    for (let i = 0; i < 4; i++ ) { 
        this.OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
  }
 
  doLogin(customer){
    for(var i=0;i<this.list.length;i++)
    {
      if((customer.email===this.list[i].email)&&(customer.password===this.list[i].password))
      { if(this.OTP==this.verifyOTP)
        {
          customer.id=this.list[i].id;
          customer.email=this.list[i].email;
         customer.password=this.list[i].password;
          localStorage.setItem('users', JSON.stringify(this.customer));
         customer = JSON.parse(localStorage.getItem('users'));
          console.log(customer);
          this.message='';
          this.message2='';
          this.router.navigate(['/movies']);
          break;
        }
    
       
      }
      else{
        this.message='Login Failed!';
        this.message2='Email or password does not work';
        // this.presentAlert();
       
      }
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'login failed',
      subHeader: '',
      message: 'Email or password does not work',
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
