import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllservicesService } from 'src/app/servicio/allservices.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  mostrarcurso=false
  mostrarprofesor=true
  mostrarcurso1=true
  mostrarprofesor1=true
  mostrarlabelcurso=false
  mostrarlabelprofesor=false
  colorcurso="btn-light"
  colorprofesor="btn-success"
  colorcursoprofesor="btn-success"
  
  colorcurso1="btn-light"
  colorprofesor1="btn-warning"
  colorcursoe="btn-warning"
  colorprofesore="btn-warning"
  cursos:any=[]
  catedraticos:any=[]
  publicaciones:any=[]
  all:any=[]
  selector1:any
  selector2:any
  filtrodefault:number=0
  newpublication={
    message:"",
    datepublication:new Date(),
    typepublication:0,
    professor_codeprofessor:0,
    courseprofessor_code:0,
    course_codecourse:0,
    user_carne:0
  }

  constructor(public allservicesService: AllservicesService,private router: Router) { }
  

  ngOnInit(): void {
    if (!localStorage.getItem('usuarioActivo')) {
      this.router.navigate(['login']);
    }
    this.getobject();
  }

  getobject(){
    
    this.allservicesService.getallinicio().subscribe(
      res => {
        this.all=res
        this.cursos=this.all[0]
        this.catedraticos=this.all[1]
        this.publicaciones=this.all[2]
      },
      err => {}
    );
  }

  saltaralert(){
    alert("ups")
  }
  filcurso(){
    this.getobject();
    this.colorcurso1="btn-light"
    this.colorprofesor1="btn-warning"
    this.colorcursoe="btn-warning"
    this.colorprofesore="btn-warning"
    this.filtrodefault=0
    this.mostrarprofesor1=true;
    this.mostrarcurso1=true;
  }

  filprofesor(){
    this.getobject();
    this.colorcurso1="btn-warning"
    this.colorprofesor1="btn-light"
    this.colorcursoe="btn-warning"
    this.colorprofesore="btn-warning"
    this.filtrodefault=1
    this.mostrarprofesor1=true;
    this.mostrarcurso1=true;
  }
  filcursoe(){
    this.getobject();
    this.colorcurso1="btn-warning"
    this.colorprofesor1="btn-warning"
    this.colorcursoe="btn-light"
    this.colorprofesore="btn-warning"
    this.filtrodefault=2
    this.mostrarprofesor1=true;
    this.mostrarcurso1=false;
  }
  filprofesore(){
    this.getobject();
    this.colorcurso1="btn-warning"
    this.colorprofesor1="btn-warning"
    this.colorcursoe="btn-warning"
    this.colorprofesore="btn-light"
    this.filtrodefault=3
    this.mostrarprofesor1=false;
    this.mostrarcurso1=true;
  }
  
  
  forcurso(){
    this.getobject();
    this.colorcurso="btn-light"
    this.colorprofesor="btn-success"
    this.colorcursoprofesor="btn-success"



    this.mostrarcurso=false
    this.mostrarprofesor=true
  }

  getespecificcourse(){
    this.cursos=[]
    let numero=0;
    this.selector2=document.getElementById("selectorcatedratico");
    numero=Number( this.selector2.value);
    this.allservicesService.getspecificcourse(numero).subscribe(
      res => {
        this.cursos=res
      },
      err => {}
    );
  }


  forprofesor(){
    this.getobject();
    this.colorcurso="btn-success"
    this.colorprofesor="btn-light"
    this.colorcursoprofesor="btn-success"


    this.mostrarcurso=true
    this.mostrarprofesor=false
  }

  ambos(){
    this.mostrarcurso=false;
    this.mostrarprofesor=false;
    this.colorcurso="btn-success"
    this.colorprofesor="btn-success"
    this.colorcursoprofesor="btn-light"


    this.getespecificcourse();
    
  }

  guaradarpublicacion(){
    this.newpublication.datepublication=new Date();
    let useractual=localStorage.getItem('usuarioActivo');
    this.newpublication.user_carne=JSON.parse(useractual).carne;
    
    
    if(this.mostrarcurso==this.mostrarprofesor){
      //ambas
      this.newpublication.typepublication=0;
      this.selector1=document.getElementById("selectorcuros")
      

      for (let index = 0; index < this.cursos.length; index++) {
        if(this.cursos[index].codecourse==Number(this.selector1.value)){
          this.newpublication.courseprofessor_code=this.cursos[index].codeCourseProfessor;
        }
      }
      this.selector2=document.getElementById("selectorcatedratico");
      
      
      
      this.newpublication.professor_codeprofessor=Number(this.selector2.value);
      this.newpublication.course_codecourse=Number(this.selector1.value);
      console.log(this.newpublication)
      
    }
    else if(this.mostrarcurso){
      //para profesores
      this.newpublication.typepublication=1;

      this.selector2=document.getElementById("selectorcatedratico")
      this.newpublication.professor_codeprofessor=Number(this.selector2.value);
      
      this.newpublication.course_codecourse=0;
      this.newpublication.courseprofessor_code=0;
    }
    else{
      this.newpublication.typepublication=2;
      //para cursoss
      this.selector1=document.getElementById("selectorcuros")
      this.newpublication.professor_codeprofessor=0;
      this.newpublication.course_codecourse=Number(this.selector1.value);
      
      this.newpublication.courseprofessor_code=0;
    }
    this.allservicesService.creatpublication(this.newpublication).subscribe(
      res => {
        this.all=res
        alert(this.all.message );
        this.getobject();
      },
      err => {}
    );
    
  }

  filtrar(){
    
      this.selector2=document.getElementById("selectorcatedratico1");
      
      this.selector1=document.getElementById("selectorcuros1");
      
      this.allservicesService.filtrar(this.filtrodefault,Number(this.selector2.value),Number(this.selector1.value)).subscribe(
        res => {
          this.publicaciones=res
        },
        err => {}
      );
  }
  verpublicacion(item){
    localStorage.setItem('publicacion', JSON.stringify(item));
    this.router.navigate(['publicacion']);
  }
  verpublicacionv2(item){
    this.verpublicacion(item)
    localStorage.setItem('mostrar', JSON.stringify(item));
  }

}
