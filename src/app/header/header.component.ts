import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit{
  response: any;
  constructor(private http: HttpClient){}
usd = 0
eur = 0

ngOnInit(){
  this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
  .subscribe((response)=>{
    this.response = response
    this.usd = this.response[25].rate
    this.eur = this.response[32].rate
  })
}
}
