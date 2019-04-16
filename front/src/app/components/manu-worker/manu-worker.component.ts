import { Component, OnInit,ViewChild } from '@angular/core';
import ParticlesjsConfig from '../../../assets/particlesjs-config.json' 
import * as $ from 'jquery'

@Component({
  selector: 'app-manu-worker',
  templateUrl: './manu-worker.component.html',
  styleUrls: ['./manu-worker.component.css']
})
export class ManuWorkerComponent implements OnInit {
  myStyle: object = {};
  myParams: any = {};
  width: number = 100;
  height: number = 100;

 
  constructor() { }

  ngOnInit() {
    $.ajax({
      url: 'http://localhost:5000/chat/public/bundle.js',
      dataType: "script",
      success: () => {}
    });  
}
}
  


