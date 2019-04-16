import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
    $.ajax({
      url: 'http://localhost:5000/chat/public/bundle.js',
      dataType: "script",
      success: () => {}
    });
  }    
  
}
