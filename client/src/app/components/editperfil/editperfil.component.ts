import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllservicesService } from 'src/app/servicio/allservices.service';

@Component({
  selector: 'app-editperfil',
  templateUrl: './editperfil.component.html',
  styleUrls: ['./editperfil.component.css']
})
export class EditperfilComponent implements OnInit {

  constructor(public allservicesService: AllservicesService,private router: Router) { }

  userlogeado:any={}
  iam=false
  respuesta:any=[]
  ngOnInit(): void {
    if (!localStorage.getItem('usuarioActivo')) {
      this.router.navigate(['login']);
    }
    let user=localStorage.getItem('usuarioActivo');
    this.userlogeado=JSON.parse(user); 

  }

  saveuser(){
    
    this.allservicesService.updateuser(this.userlogeado).subscribe(
      res => {
        this.respuesta=res
        localStorage.setItem('usuarioActivo', JSON.stringify(this.userlogeado));
        alert(this.respuesta.mensaje)
      },
      err => {}
    );
  }

}
