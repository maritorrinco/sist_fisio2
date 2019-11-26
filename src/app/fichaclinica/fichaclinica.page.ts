import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { NgZone  } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

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
  public categoriaSeleccionado:any;
  public subcategoriaSeleccionado:any;
  public items: Array<{ paciente: string, fisioterapeuta:string, fecha:string, subcat: string, files:Array<{ idFichaArchivo: string, nombre: string, urlImagen: string }> }> = [];
  public fisioterapeutas: Array<{ id: any, nombre:string }> = [];
  public pacientes: Array<{ id: any, nombre:string }> = [];
  public subcategorias: Array<{ id: any, nombre:string }> = [];
  public categorias: Array<{ id: any, nombre:string }> = [];
  public desde:any=null;
  public hasta:any=null;
  response_paciente: any;
  response_archivo: any;
  public filtros = {
    fechaDesdeCadena: null,
    fechaHastaCadena: null,
    idCliente:{idPersona:null},
    idEmpleado:{idPersona:null},
    idTipoProducto:{idTipoProducto:null}
  };
  creacion: false;
  constructor(private http: HttpClient, public navCtrl: NavController,private zone: NgZone,private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.getFisioterapeutas();
    this.getPacientes();
    this.getCategorias();
    this.getFichas();
    
  }
  getFichas(){
    console.log('get fichas', this.filtros)
    const url = 'http://gy7228.myfoscam.org:8080/stock-pwfe/fichaClinica';
   
    let params = new HttpParams().set('ejemplo',JSON.stringify(this.filtros))

    this.http.get(url,{params:params}).subscribe((response) => {
      console.log(response, this.items.length);
      this.response = response;
      this.items = [];
      this.zone.run(() => {
        console.log('force update the screen');
        
        for (let i = 0; i < this.response.totalDatos; i++) {
          let getFilesParams = new HttpParams().set('idFichaClinica', this.response.lista[i].idFichaClinica)
          this.http.get('http://gy7228.myfoscam.org:8080/stock-pwfe/fichaArchivo',{params:getFilesParams}).subscribe((response_archivo) => {
            this.response_archivo = response_archivo;
            let files_array = [];
            for (let j = 0; j < this.response_archivo.totalDatos; j++){
              files_array.push({ idFichaArchivo: this.response_archivo.lista[j].idFichaArchivo, nombre: this.response_archivo.lista[j].nombre, urlImagen: this.response_archivo.lista[j].urlImagen });
            }
            this.items.push({
              paciente: this.response.lista[i].idCliente.nombre+' '+this.response.lista[i].idCliente.apellido,
              fisioterapeuta: this.response.lista[i].idEmpleado.nombre + ' '+this.response.lista[i].idEmpleado.apellido,
              fecha: moment(this.response.lista[i].fechaHora).format("DD/MM/YYYY"),
              subcat: this.response.lista[i].idTipoProducto.descripcion,
              files: files_array
              });
          });
        }
        console.log('FICHAS======', this.items);
        console.log(this.items.length)
      });
    });
  }
  createFicha(){
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
    this.filtros.idEmpleado.idPersona = fisioterapeuta;
    this.getFichas();
  }
  pacienteSelec(paciente){
    this.filtros.idCliente.idPersona = paciente;
    this.getFichas();
    console.log('hola', paciente);
  }
  desdeSelec(desde){
    const date = moment(desde).format("YYYYMMDD");
    this.filtros.fechaDesdeCadena = date;
    this.getFichas();
    //this.desde=this.desde.split("-");
    console.log('hola', desde, date);
  }
  hastaSelec(hasta){
    const date = moment(hasta).format("YYYYMMDD");
    this.filtros.fechaHastaCadena = date;
    this.getFichas();
    console.log('hola', hasta);
  }
  categoriaSelec(categoria){
    this.subcategorias = [];
    this.subcategoriaSeleccionado = null;
    this.getSubcategorias(categoria);
    console.log('hola', categoria);
  }
  getCategorias(){
    const url_fisio = 'http://gy7228.myfoscam.org:8080/stock-pwfe/categoria';
    this.http.get(url_fisio).subscribe((response) => {
      console.log(response);
      this.response = response;
      for (let i = 0; i <this.response.totalDatos; i++) {
        this.categorias.push({
          id: this.response.lista[i].idCategoria,
          nombre: this.response.lista[i].descripcion,
          });
      }
    });
  }
  getSubcategorias(categoria){
    
    let params = new HttpParams().set('ejemplo',JSON.stringify({"idCategoria":{"idCategoria":categoria}}));
    const url_fisio = 'http://gy7228.myfoscam.org:8080/stock-pwfe/tipoProducto';
    this.http.get(url_fisio,{params:params}).subscribe((response) => {
      console.log(response);
      this.response_paciente = response;
      for (let i = 0; i <this.response_paciente.totalDatos; i++) {
        this.subcategorias.push({
          id: this.response_paciente.lista[i].idTipoProducto,
          nombre: this.response_paciente.lista[i].descripcion,
          });
      }
    });

  }
  subcategoriaSelec(subcategoria){
    this.filtros.idTipoProducto.idTipoProducto = parseInt(subcategoria);
    this.getFichas();
    console.log('sub categoria', subcategoria);
  }
  cerrar(){
    this.creacion = false;
    this.route.queryParams = null;
  }
}
