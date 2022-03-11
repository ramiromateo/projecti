import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AllservicesService } from 'src/app/servicio/allservices.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public allservicesService: AllservicesService,private router: Router) { }
  editable=false
  cont:any
  tipouser="Administrador"
  newuser={
    carne:"",
    names:"",
    lastnames:"",
    contrasenia:"",
    mail:""
  }
  
  ngOnInit(): void {
    if (localStorage.getItem('usuarioActivo')) {
      this.router.navigate(['inicio']);
    }
  }
  saveuser(){
    if(this.newuser.carne!=="" && this.newuser.contrasenia!="" ){
      this.allservicesService.login(this.newuser).subscribe(
        res => {
          this.cont=res
          if(this.cont.id_user==-1){
            alert("Usuario y/o contraseña incorrectas")
          }
          /*else if(this.cont.password==this.newuser.contrasenia){
            localStorage.setItem('usuarioActivo', JSON.stringify(this.cont));
            this.router.navigate(['inicio']);
          }*/
          else{alert("Gologin")}
          

        },
        err => {}
      );
    }
    else{
      alert("LLene todos lo campos")
    }
  }

  callregister(){
    this.router.navigate(['register']);
  }

}
