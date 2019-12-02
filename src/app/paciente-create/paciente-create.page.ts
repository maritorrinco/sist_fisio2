import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.page.html',
  styleUrls: ['./paciente-create.page.scss'],
})
export class PacienteCreatePage implements OnInit {
  public persona = {
    nombre: null, 
    apellido: null, 
    email: null, 
    telefono: null,
    ruc: null, 
    cedula: null, 
    tipoPersona: null, 
    fechaNacimiento: null
  }
  myDate: any;
  constructor(private http: HttpClient,public navCtrl: NavController) {}

  ngOnInit() {
  }
  createPersona(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json', 
        'usuario' :'pedro'
      })
    };
    this.persona.fechaNacimiento=moment(this.myDate).format("YYYY-MM-DD")+' '+'00:00:00';    
    const url_persona = 'http://gy7228.myfoscam.org:8080/stock-pwfe/persona';
    this.http.post(url_persona,this.persona,httpOptions).subscribe((response) => {
      console.log(response,'post');      
      this.navCtrl.navigateRoot('/paciente');
    }); 
  }
}
