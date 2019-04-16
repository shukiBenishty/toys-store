import { Component, OnInit } from '@angular/core';
import {SerchService} from '../../../services/serch.service'
import {EventService} from '../../../services/event.service'

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.css']
})
export class HistoryOrderComponent implements OnInit {

  listOrder:any;
  client={_id:'',name:'',family:'',email:'',city:'',password:'',}

  constructor(public serchService:SerchService,public eventService:EventService) { }

  ngOnInit() {
    this.eventService.getUser().subscribe(result=>{this.client=result;
     console.log(this.client)
      this.serchService.getOrderByClient(this.client._id).subscribe(order=>this.listOrder=order)
      } )

     
  }

  upClint()
  {
    this.serchService.putUpdateUser(this.client).subscribe()
  }

}
