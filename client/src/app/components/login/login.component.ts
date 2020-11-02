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
            alert("Sesion iniciada")
          }
          else{alert("Contraseña incorrecta")}
          //this.router.navigate(['login']);

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
