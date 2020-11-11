import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllservicesService } from 'src/app/servicio/allservices.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  constructor(public allservicesService: AllservicesService,private router: Router) { }
  item:any={}
  all:any=[]
  comentarios:any=[]
  userlogeado:any={}
  bandera=true
  mensaje=""
  
  ngOnInit(): void {
    let useractual=localStorage.getItem('publicacion');
    this.item=JSON.parse(useractual);
    this.getpublication(this.item.codepublication);
    if(localStorage.getItem('mostrar')){
      this.bandera=false
      localStorage.removeItem('mostrar')
    }
    let user=localStorage.getItem('usuarioActivo');
    this.userlogeado=JSON.parse(user);

    if(!this.bandera){
      
    }
  }

  getpublication(num){
    
    this.allservicesService.getonepublication(num).subscribe(
      res => {
        this.all=res
        
        this.comentarios=this.all[1];
        console.log(this.comentarios)
      },
      err => {}
    );
  }
  mostrar(){
    this.bandera=false
  }
  comentar(){
//req.body.message,req.body.publiccode,req.body.carne

this.allservicesService.createcomentary({message:this.mensaje,publiccode:this.item.codepublication,carne:this.userlogeado.carne}).subscribe(
  res => {
    this.all=res
    alert(this.all.message)
  },
  err => {}
);
    this.getpublication(this.item.codepublication);
  }

}
