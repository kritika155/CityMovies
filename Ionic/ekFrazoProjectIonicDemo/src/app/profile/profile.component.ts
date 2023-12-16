import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(private router:Router,private _location: Location) { }

  ngOnInit() {}
  loginPage(){
    this.router.navigate(['/login']);
    }
    
    
    move(){
      this._location.back();
    }
}
