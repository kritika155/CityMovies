import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-paymentdone',
  templateUrl: './paymentdone.component.html',
  styleUrls: ['./paymentdone.component.scss'],
})
export class PaymentdoneComponent implements OnInit {

  constructor(private router:Router,private _location: Location) { }

  ngOnInit() {}
  move(){
    this._location.back();
  }
}
