import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllservicesService } from 'src/app/servicio/allservices.service';
import { BrowserModule } from '@angular/platform-browser'
@Component({
  selector: 'app-pensum',
  templateUrl: './pensum.component.html',
  styleUrls: ['./pensum.component.css']
})

export class PensumComponent implements OnInit {

  constructor(public allservicesService: AllservicesService,private router: Router) { }
  items:any=[]
  ngOnInit(): void {
    this.allservicesService.getallcuourse().subscribe(
      res => {
        this.items=res
      },
      err => {}
    );
  }

}
