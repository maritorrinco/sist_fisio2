import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgZone  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {
  public response: any;
  public items: Array<{ nombre: string,apellido: string,id:any }> = [];
  public itemsfiltro: Array<{ nombre: string,apellido: string }> = [];
  public nombreSeleccionado:any;
  public apellidoSeleccionado:any;
  public filtros = {
    nombre: null,
    apellido: null
  };  
  
  constructor(private route: ActivatedRoute,private http: HttpClient,private zone: NgZone,public navCtrl: NavController) {console.log("Funcionaa entra aca");};
  ngOnInit() {    
    this.filtros.nombre=null;
    this.filtros.apellido=null;
    this.route.queryParams.subscribe(params => {            
      if(params["nombre"]!= "null" && params["apellido"] !="null" ){        
        this.filtros.nombre = params["nombre"];
        this.filtros.apellido = params["apellido"];
      }      
    });  
    this.getPersonas();
    this.personasfiltro();      
  }
  personasfiltro(){
    this.http.get('http://gy7228.myfoscam.org:8080/stock-pwfe/persona').subscribe((response) => {
      this.response = response;
      this.zone.run(() => {
        for (let i = 0; i < this.response.totalDatos; i++) {
          this.itemsfiltro.push({
            nombre: this.response.lista[i].nombre,
            apellido:this.response.lista[i].apellido
            });
        }
      });
    });
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
            apellido:this.response.lista[i].apellido,
            id:this.response.lista[i].idPersona,
            });
        }
      });
    });
  };
  nombreSelec(nombre){   
    if(nombre=="null"){this.filtros.nombre=null}else{this.filtros.nombre=nombre};
    this.getPersonas();
  }

  apellidoSelec(apellido){
    if(apellido=="null"){this.filtros.apellido=null}else{this.filtros.apellido=apellido};
    this.getPersonas();
  }
  createPersona(){
    this.navCtrl.navigateRoot('/paciente-create');
  }
  edit(item){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          idPersona: item,
          
      }
    };  
    this.navCtrl.navigateRoot('/paciente-update-delete',navigationExtras);    
  }
  filtroVentana(){
    console.log("Alejandro f");
    this.navCtrl.navigateRoot('/paciente-filtro');
  }
  Limpiar(){
    this.filtros.nombre = null;
    this.filtros.apellido = null;
    this.getPersonas();
  }
}
