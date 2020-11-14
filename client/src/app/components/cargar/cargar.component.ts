import { Component, OnInit } from '@angular/core';
import { AllservicesService } from 'src/app/servicio/allservices.service';

@Component({
  selector: 'app-cargar',
  templateUrl: './cargar.component.html',
  styleUrls: ['./cargar.component.css']
})
export class CargarComponent implements OnInit {

  constructor(public allservicesService: AllservicesService) { }
  cursos:any=[]
  
  nota:any
  ngOnInit(): void {
    this.allservicesService.getallinicio().subscribe(
      res => {
        
        this.cursos=res[0]
      },
      err => {}
    );
  }
  

}
