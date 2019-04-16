import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EventService} from '../../services/event.service'
import { SerchService} from '../../services/serch.service'
import * as $ from 'jquery'
import { from } from 'rxjs';

@Component({
  selector: 'app-manue-client',
  templateUrl: './manue-client.component.html',
  styleUrls: ['./manue-client.component.css']
})
export class ManueClientComponent implements OnInit {

  itemForBuy:any=[]
  itemExists:boolean;
  numberOfItem=0;
  client:any;

  constructor(public eventService:EventService, public router:Router ,public serchService:SerchService) {

    eventService.getListBuy().subscribe(data=>{
      if (data==0) {
        this.itemForBuy=[]
        this.numberOfItem=0
      }
      else
      {
        this.addItem(data)

      }
    })

    this.eventService.getUser().subscribe(result=>{this.client=result})
  
   }

  ngOnInit() {
    

    $('.carousel').carousel()
    $.ajax({
      url: 'http://localhost:5000/chat/public/bundle.js',
      dataType: "script",
      success: () => {}
    });  
  }

  addItem(additem)
  {
   this.itemExists=true; 
   
   if (additem !=0) 
   {
     
     for (const iterator of this.itemForBuy) {
       if(additem._id==iterator.item._id)
       {
         this.numberOfItem++
         iterator.qut++;
         this.itemExists=false;
         break;
        }  
      }
      if (this.itemExists) {
        this.itemForBuy.push({item:additem,qut:1})
        this.numberOfItem++
      }
      
    }
    
  }
    
  routToListOrder(){
    this.router.navigate(['menu_client/list_buy'],this.itemForBuy)

  }



  
}
