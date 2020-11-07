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
  newcontra=false
  cont:any
  etiquetabtn="Verificar Identidad"
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
    if(this.newcontra){
      
      this.allservicesService.updatepass({id:this.newuser.carne, newpass:this.newuser.password}).subscribe(
        res => {
          this.cont=res;
          alert(this.cont.message);
          this.router.navigate(['login']);
        },
        err => {

        }
      );
      return
    }
    if(this.newuser.carne!=202000000 && this.newuser.password!="" ){
      this.allservicesService.getone(this.newuser.carne).subscribe(
        res => {
          this.cont=res
          if(this.cont.carne==-1){
            alert("Usuario No existe")
          }
          else if(this.cont.mail==this.newuser.password){
            this.newcontra=true;
            this.etiquetabtn="Guardar nueva contraseña"
            
          }
          else{alert("Datos incorrectos")}
          

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
