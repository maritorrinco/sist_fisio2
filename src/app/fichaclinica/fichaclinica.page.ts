import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-fichaclinica',
  templateUrl: './fichaclinica.page.html',
  styleUrls: ['./fichaclinica.page.scss'],
})
export class FichaclinicaPage implements OnInit {
  public response: any;
  public response_fisio: any;
  public fisioterapeutaSeleccionado:any;
  public pacienteSeleccionado:any;
  public items: Array<{ paciente: string, fisioterapeuta:string }> = [];
  public fisioterapeutas: Array<{ id: any, nombre:string }> = [];
  public pacientes: Array<{ id: any, nombre:string }> = [];
  public desde:any=null;
  public hasta:any=null;
  response_paciente: any;
  constructor(private http: HttpClient, public navCtrl: NavController) {
    
  }

  ngOnInit() {
    this.getFisioterapeutas();
    this.getPacientes();
    this.getFichas();
  }
  getFichas(){
    const url = 'http://gy7228.myfoscam.org:8080/stock-pwfe/fichaClinica';
    let query  ={"fechaDesdeCadena":this.desde,"fechaHastaCadena":this.hasta};
    let params = new HttpParams().set('ejemplo',JSON.stringify(query))

    this.http.get(url,{params:params}).subscribe((response) => {
      console.log(response);
      this.response = response;
      for (let i = 0; i < this.response.totalDatos; i++) {
        this.items.push({
          paciente: this.response.lista[i].idCliente.nombre+' '+this.response.lista[i].idCliente.apellido,
          fisioterapeuta: this.response.lista[i].idEmpleado.nombre + ' '+this.response.lista[i].idEmpleado.apellido,
          
          });
      }
    });
  }
  createFicha(){
    console.log('click')
    this.navCtrl.navigateForward('/fichaclinica-create');
  }
  getFisioterapeutas(){
    let params = new HttpParams().set('ejemplo',JSON.stringify({"soloUsuariosDelSistema":true}))
    
    const url_fisio = 'http://gy7228.myfoscam.org:8080/stock-pwfe/persona';
    this.http.get(url_fisio,{params:params}).subscribe((response) => {
      console.log(response);
      this.response_fisio = response;
      for (let i = 0; i < this.response_fisio.totalDatos; i++) {
        this.fisioterapeutas.push({
          id: this.response_fisio.lista[i].idPersona,
          nombre: this.response_fisio.lista[i].nombre + ' '+this.response_fisio.lista[i].apellido,
          
          });
      }
    });

  }
  getPacientes(){
    let params = new HttpParams().set('ejemplo',JSON.stringify({"soloUsuariosDelSistema":false}))
    
    const url_fisio = 'http://gy7228.myfoscam.org:8080/stock-pwfe/persona';
    this.http.get(url_fisio,{params:params}).subscribe((response) => {
      console.log(response);
      this.response_paciente = response;
      for (let i = 0; i <this.response_paciente.totalDatos; i++) {
        this.pacientes.push({
          id: this.response_paciente.lista[i].idPersona,
          nombre: this.response_paciente.lista[i].nombre + ' '+this.response_paciente.lista[i].apellido,
          
          });
      }
    });

  }
  fisioterapeutaSelec(fisioterapeuta){
    console.log('hola', fisioterapeuta);
  }
  pacienteSelec(paciente){
    console.log('hola', paciente);
  }
  desdeSelec(desde){
    this.getFichas();
    //this.desde=this.desde.split("-");
    console.log('hola', desde);
  }
  hastaSelec(hasta){
    this.getFichas();
   // this.hasta=this.hasta.split("-");
    console.log('hola', hasta);
  }
}
