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
    carne:202000000,
    names:"",
    lastnames:"",
    password:"",
    mail:""
  }
  ngOnInit(): void {
    if (localStorage.getItem('usuarioActivo')) {
      this.router.navigate(['inicio']);
    }
  }
  saveuser(){
    if(this.newuser.carne!=202000000 && this.newuser.password!="" ){
      this.allservicesService.getone(this.newuser.carne).subscribe(
        res => {
          this.cont=res
          if(this.cont.carne==-1){
            alert("Usuario No existe")
          }
          else if(this.cont.password==this.newuser.password){
            localStorage.setItem('usuarioActivo', JSON.stringify(this.cont));
            this.router.navigate(['inicio']);
          }
          else{alert("Contraseña incorrecta")}
          

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
