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
  userLog={nameLog:'',famely:'',email:'',password1:'',password2:'',gender:'',date: '',city:'',phone:''}



  constructor(public eventService:EventService, private renderer: Renderer2,public serchService:SerchService,public router:Router) 
    {
    // this.renderer.setStyle(document.body, 'margin', 0);
   
  
    this.flagLog=false;
    this.flagSing=false;

   }

  ngOnInit() {
    $('.carousel').carousel()
    }

  

    
  
  login()
  {
    this.flagLog=true;
    this.flagSing=false;
  }
  singin()
  {
    this.flagLog=false;
    this.flagSing=true;
  }

  posrSing()
  { 
    this.serchService.postLogin(this.userSign).subscribe(data=> 
    {
      console.log(data)
      switch (data[0].tyap) {
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
  
  this.serchService.postLogin(this.userSign).subscribe(data=>
    {
      console.log(data)})
      this.router.navigate(['menu']) 
 }
 worker()
 {
  this.userSign.nameSignin='dadaaaa'
  this.userSign.passwordSign='4343'
  
  this.serchService.postLogin(this.userSign).subscribe(data=>
    {
      console.log(data)})
      this.router.navigate(['manu_worker']) 
 }
 client()
 {
  // this.userSign.nameSignin='lolo'
  // this.userSign.passwordSign='12346'
 
  this.userSign.nameSignin='Chelsey Dietrich'
  this.userSign.passwordSign='12346'
  this.serchService.postLogin(this.userSign).subscribe(user=>
    {
    this.eventService.addUser(user)
    this.router.navigate(['menu_client']) 
    })
  }



  posLog(){
  { this.serchService.postLog(this.userLog).subscribe(data=> console.log(data)); }}

  flogin(){
    window.open('http://localhost:5000/auth/google',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
   let listener = window.addEventListener('message', (message) => {
    console.log(message)
   })};




}