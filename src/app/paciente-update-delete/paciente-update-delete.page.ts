import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-paciente-update-delete',
  templateUrl: './paciente-update-delete.page.html',
  styleUrls: ['./paciente-update-delete.page.scss'],
})
export class PacienteUpdateDeletePage implements OnInit {
  idPersona:any;
  response_persona:any; 
  myDate: any; 
  public persona = {
    idPersona:null,
    nombre: null, 
    apellido: null, 
    email: null, 
    telefono: null,
    ruc: null, 
    cedula: null, 
    tipoPersona: null, 
    fechaNacimiento: null
  }
  public filtros = {
    idCliente:{idPersona:null}
  };
  response:any;
  public status = true;
  constructor(private http: HttpClient,private route: ActivatedRoute,
    public alertController: AlertController,public navCtrl: NavController) { }

  ngOnInit() {
    this.persona = {
      idPersona:null,
      nombre: null, 
      apellido: null, 
      email: null, 
      telefono: null,
      ruc: null, 
      cedula: null, 
      tipoPersona: null, 
      fechaNacimiento: null
    }
    this.status = true;
    this.getPersona();
  }
  getPersona(){
    this.route.queryParams.subscribe(params => {
      this.idPersona = params["idPersona"];
    });
    const url_fisio = 'http://gy7228.myfoscam.org:8080/stock-pwfe/persona/'+this.idPersona;
    this.http.get(url_fisio).subscribe((response) => {          
      this.response_persona = response;
      this.persona.idPersona= this.response_persona.idPersona;
      this.persona.nombre = this.response_persona.nombre;
      this.persona.apellido = this.response_persona.apellido;
      this.persona.email = this.response_persona.email;
      this.persona.telefono = this.response_persona.telefono;
      this.persona.ruc = this.response_persona.ruc;
      this.persona.cedula = this.response_persona.cedula;
      this.persona.tipoPersona = this.response_persona.tipoPersona;
      this.persona.fechaNacimiento= this.response_persona.fechaNacimiento;       
    }); 
    this.filtros.idCliente.idPersona=this.idPersona;
    let params = new HttpParams().set('ejemplo',JSON.stringify(this.filtros));       
    const url_reserva = 'http://gy7228.myfoscam.org:8080/stock-pwfe/reserva';    
    this.http.get(url_reserva,{params:params}).subscribe((response) => { 
      console.log(response,"entra reserva");
      this.response = response;
      if (this.response.totalDatos > 0) {this.status = false};
    }); 
    
    const url_ficha = 'http://gy7228.myfoscam.org:8080/stock-pwfe/fichaClinica';    
    this.http.get(url_ficha,{params:params}).subscribe((response) => { 
      console.log(response,"entra ficha");
      this.response = response;
      if (this.response.totalDatos > 0) {this.status = false};
    }); 
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      subHeader: 'Eliminar registro',
      message: '¿Esta seguro que desea Eliminar este registro?.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {            
          }
        }, {
          text: 'Aceptar',
          handler: () => {            
            this.http.delete('http://gy7228.myfoscam.org:8080/stock-pwfe/persona'+'/'+this.idPersona).subscribe((response)=>{              
              this.navCtrl.navigateRoot('/paciente');
            });    
          }
        }
      ]
    });        
    await alert.present();
    let result = await alert.onDidDismiss();    
  }
  editPersona(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json', 
        'usuario' :'pedro'
      })
    };    
    this.persona.fechaNacimiento=moment(this.myDate).format("YYYY-MM-DD")+' '+'00:00:00';    
    const url_ficha = 'http://gy7228.myfoscam.org:8080/stock-pwfe/persona';
    this.http.put(url_ficha,this.persona,httpOptions).subscribe((response) => {
                        
    });
    this.navCtrl.navigateRoot('/paciente');
  }

}
