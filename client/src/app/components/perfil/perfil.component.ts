import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllservicesService } from 'src/app/servicio/allservices.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(public allservicesService: AllservicesService,private router: Router) { }

  userlogeado:any={}
  iam=false
  ngOnInit(): void {
    if (!localStorage.getItem('usuarioActivo')) {
      this.router.navigate(['login']);
    }
    let user=localStorage.getItem('usuarioActivo');
    this.userlogeado=JSON.parse(user);
    let carneglob=this.userlogeado.carne
    if(localStorage.getItem('perfilselect')){
      let carne=JSON.parse(localStorage.getItem('perfilselect')).carne
      this.iam=carne!=this.userlogeado.carne
      carneglob=carne
        
      localStorage.removeItem('perfilselect')
    }
    this.allservicesService.getone(carneglob).subscribe(
      res => {
        this.userlogeado=res
      },
      err => {}
    );
  
    
    

  }
  gotoedi(){
    this.router.navigate(['editperfil']);
  }
}
