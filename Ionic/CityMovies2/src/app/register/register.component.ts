import { Component, OnInit } from '@angular/core';
import CustomerService from '../customer.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  customer: any = {
    name: '',
    password: '',
    address: '',
    email: '',
    phone: '',
    security_question: '',
    answer: '',
  };

  customers: any = [
    // {id:1, name:'kritika',password:'12344',address:"India",email:'kritikaroy@gmail.com', phone:'09038187690'},
    // {id:2, name:'Ashish',password:'12345',address:"India",email:'ashishroy@gmail.com',phone:'09038187691' }
  ];

  list = [];

  constructor(
    private customerService: CustomerService,
    public alertController: AlertController,
    private router: Router,
    private _location: Location
  ) {
    this.customerService.getDBCustomers();
    this.customerService.getRemoteCustomers().subscribe((result: any) => {
      this.list = result;
    });
  }

  ngOnInit() {
    this.presentAlert();
    this.customerService.getRemoteCustomers().subscribe((result: any) => {
      this.list = result;
    });
  }
  addCustomer(customer: any) {
    this.customerService.getRemoteCustomers().subscribe((result: any) => {
      this.list = result;
    });

    this.customerService.addRemoteCustomer(this.customer).subscribe(() => {
      this.router.navigate(['/login']);
    });

    // this.router.navigate(['/login']);
  }
  move() {
    this._location.back();
  }
  update() {
    this.customerService.getDBCustomers();

    this.customerService.getRemoteCustomers().subscribe((result) => {
      this.list = result;
    });
    this.router.navigate(['/login']);
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Note:',
      subHeader: '',
      message:
        'Please always remember your security question and answer along with password',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
