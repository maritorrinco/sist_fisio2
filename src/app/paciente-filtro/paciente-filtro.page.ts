import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgZone  } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-paciente-filtro',
  templateUrl: './paciente-filtro.page.html',
  styleUrls: ['./paciente-filtro.page.scss'],
})
export class PacienteFiltroPage implements OnInit {
  public items: Array<{ nombre: string,apellido: string }> = [];
  response:any;
  dato:any;
  public filtros = {
    nombre: null,
    apellido: null
  };
  nombreSeleccionado:any;
  apellidoSeleccionado:any;
  constructor(private http: HttpClient,private zone: NgZone,public navCtrl: NavController) { }

  ngOnInit() {
    this.filtros.nombre=null;
    this.filtros.apellido=null;
    this.getPersonas();
    this.nombreSeleccionado=null;
    this.apellidoSeleccionado=null;
  }
  getPersonas(){
    let params = new HttpParams().set('ejemplo',JSON.stringify(this.filtros))
    this.http.get('http://gy7228.myfoscam.org:8080/stock-pwfe/persona',{params:params}).subscribe((response) => {
      console.log(response);
      this.items = [];
      this.response = response;
      this.zone.run(() => {
        for (let i = 0; i < this.response.totalDatos; i++) {
          this.items.push({
            nombre: this.response.lista[i].nombre,
            apellido:this.response.lista[i].apellido
            });
        }
      });      
    });
  };

  texto(){
    this.filtros.nombre=this.dato;
    this.getPersonas();
  }
  Limpiar(){
    this.filtros.nombre=null;
    this.filtros.apellido=null;    
    this.getPersonas();
    this.dato="";
  }
  filtro(){
    console.log(this.apellidoSeleccionado);
    console.log(this.nombreSeleccionado);
    let navigationExtras: NavigationExtras = {
      queryParams: {
          nombre: this.nombreSeleccionado,
          apellido: this.apellidoSeleccionado,
          usarfiltro:true,
          
      }
    };  
    this.navCtrl.navigateRoot('/paciente',navigationExtras); 
  }

}
