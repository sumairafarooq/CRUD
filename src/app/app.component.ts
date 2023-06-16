import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestserviceService } from './restservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CRUD';
  constructor(private RestserviceService: RestserviceService,){

  }

  ngOnInit(): void {
    this.sumi();
    this.sumi1();
    this.sumi2();
  }

  sumi2(){
    let url = environment.hello;
    this.RestserviceService.get(url, {}, {}).subscribe(res=>{
      console.log('result', res);
    })
  }

  sumi1(){
    let url = environment.hello;
    this.RestserviceService.get(url, {}, {}).subscribe(res=>{
      console.log('result', res);
    })
  }
  sumi(){
    let url = environment.emlList;
    this.RestserviceService.get(url, {}, {}).subscribe(res=>{
      console.log('result', res);
    })
  }
}
