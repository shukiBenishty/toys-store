import { Component, OnInit, Output, EventEmitter,ViewChild, AfterViewInit  } from '@angular/core';
import {SerchService} from '../../../services/serch.service'
import {EventService} from '../../../services/event.service'
import {ToysComponent} from './toys/toys.component'
import {Router} from '@angular/router'

@Component({
  selector: 'app-toysitems',
  templateUrl: './toysitems.component.html',
  styleUrls: ['./toysitems.component.css']
})
export class ToysitemsComponent implements OnInit  {
  

  message:string;
  listOfItem:any;


  constructor(public router:Router,public serchService:SerchService,public eventService:EventService) {

    this.serchService.getAllItems().subscribe(result=>{this.listOfItem=result})
   }

  ngOnInit() {}

  getItemCtegory(ctegory)
  {
    this.router.navigate(['menu_client/toysitems',ctegory])
  }

  receiveMessage($event) {
    
   this.message= $event
  }

  addToBuy(item:string) {
    this.eventService.addListBuy(item) 
}




 }


