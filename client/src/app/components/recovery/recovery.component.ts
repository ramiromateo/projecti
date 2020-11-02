import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AllservicesService } from 'src/app/servicio/allservices.service';


@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
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
          else if(this.cont.mail==this.newuser.password){
            alert("Sesion ingresar nueva contra")
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
