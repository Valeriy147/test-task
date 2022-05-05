import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({  
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  response: any;
  constructor(private http: HttpClient){}
  usd = 0
  eur = 0

  firstRate = 1
  secondRate = 1

  firstCoef = 1
  secondCoef = 1

  selectFirst(event: any){
  switch (event.target.value) {
      case 'USD' : {
      return this.firstCoef = this.usd,  this.firstRate = this.secondRate * this.secondCoef / this.firstCoef
    };
      case 'EUR':{
      return this.firstCoef = this.eur,  this.firstRate = this.secondRate * this.secondCoef / this.firstCoef
    };
    case 'UAH' :{
      return this.firstCoef = 1,  this.firstRate = this.secondRate * this.secondCoef / this.firstCoef
    }
    default :{
      return this.firstRate = 1,  this.firstRate = this.secondRate * this.secondCoef / this.firstCoef
    }
    } 
}
   selectSecond(event: any){
    switch (event.target.value) {
      case 'USD' : {
      return this.secondCoef = this.usd,  this.secondRate = this.firstRate * this.firstCoef / this.secondCoef
    };
      case 'EUR':{
      return this.secondCoef = this.eur,  this.secondRate = this.firstRate * this.firstCoef / this.secondCoef
    };
    case 'UAH' :{
      return this.secondCoef = 1,  this.secondRate = this.firstRate * this.firstCoef / this.secondCoef
    }
    default :{
      return this.secondRate = 1,  this.secondRate = this.firstRate * this.firstCoef / this.secondCoef
    }
  }  
}  
 
  onFirstChange(event: any) {
    this.firstRate = event.target.value
    this.secondRate = this.firstRate * this.firstCoef / this.secondCoef
  }
  onSecondChange(event: any) {
    this.secondRate = event.target.value
    this.firstRate = this.secondRate * this.secondCoef / this.firstCoef
  }

  ngOnInit(){
      this.http.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe((response)=>{
        this.response = response
        this.usd = this.response[25].rate
        this.eur = this.response[32].rate
      })
  }
}
