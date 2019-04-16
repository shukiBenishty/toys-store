import { Component, OnInit ,ViewChild ,ElementRef} from '@angular/core';
import { Renderer2 } from '@angular/core';
import {SerchService} from '../../services/serch.service'
import {EventService} from '../../services/event.service'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import 'popper.js'
import 'bootstrap';
import {MatSidenav} from '@angular/material/sidenav';
import * as $ from 'jquery'




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  
 


  flagSing:boolean;
  flagLog:boolean;
  unsign:boolean;
  headerToggle = new BehaviorSubject<any>(null);




  
  
  //value input sign in
  userSign={nameSignin :'',passwordSign:''}
   
  //value input log in
  userLog={nameLog:'',famely:'',email:'',password:'',password2:'',gender:'',date: '',city:'',phone:''}



  constructor(public eventService:EventService, private renderer: Renderer2,public serchService:SerchService,public router:Router) 
    {
 

   }

  ngOnInit() {
    $('.carousel').carousel()
    }

  

    

  login()
  { 
    console.log('log')
    this.serchService.postLogin(this.userSign).subscribe(data=> 
    {
      console.log(data)
      this.eventService.addUser(data[0]);
      $('#login').modal('hide')
      console.log(data)
      switch (data[0].type) {
        case 'meneger':
        this.router.navigate(['menu'])  
          break;
        case 'worker':
        this.router.navigate(['manu_worker'])
          break;
        case 'user':
        this.router.navigate(['menu_client'])
          break;
      
        default:
          break;
      }
    });
 }

 admin()
 {
  this.userSign.nameSignin='dani'
  this.userSign.passwordSign='12346'
  
  this.login()
 }
 worker()
 {
  this.userSign.nameSignin='dada'
  this.userSign.passwordSign='4343'
  
  this.login()
 }
 client()
 {
  this.userSign.nameSignin='lolo'
  this.userSign.passwordSign='12346'
 
  // this.userSign.nameSignin='Chelsey Dietrich'
  // this.userSign.passwordSign='12346'
  this.login()
  }



  posSingUp(){
  { this.serchService.postLog(this.userLog).subscribe(data=> console.log(data));
    $('#singin').modal('hide')
  }}

 




}
