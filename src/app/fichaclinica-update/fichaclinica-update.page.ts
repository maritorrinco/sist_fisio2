import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-fichaclinica-update',
  templateUrl: './fichaclinica-update.page.html',
  styleUrls: ['./fichaclinica-update.page.scss'],
})
export class FichaclinicaUpdatePage implements OnInit {

  public ficha={
    idFichaClinica: null, 
    
    observacion:null,
    
  };
  public response_fisio: any;
  public pacientes: Array<{ id: any, nombre:string }> = [];
  public subcategorias: Array<{ id: any, nombre:string }> = [];
  public categorias: Array<{ id: any, nombre:string }> = [];
  public fisioterapeutaSeleccionado:any;
  public fisioterapeutas: Array<{ id: any, nombre:string }> = [];
  public subcategoriaSeleccionado: any;
  public categoriaSeleccionado:any;
  response_paciente: any;
  response: any;
  idFicha: any;
  response_ficha:any;
  constructor(private http: HttpClient, public navCtrl: NavController,private zone: NgZone,private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.getFicha();
  }
  getFicha(){
    this.route.queryParams.subscribe(params => {
      this.idFicha = params["idFicha"];
    });
    const url_fisio = 'http://gy7228.myfoscam.org:8080/stock-pwfe/fichaClinica/'+this.idFicha;
    this.http.get(url_fisio).subscribe((response) => {
      console.log('ficha',response);
      this.response_ficha = response;
    
      this.ficha.observacion = this.response_ficha.observacion;
      this.ficha.idFichaClinica = this.response_ficha.idFichaClinica;
    
      console.log('this',this.ficha);
      
      
    });
    console.log('recibe',this.idFicha)
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
  categoriaSelec(categoria){
    this.subcategorias = [];
    this.subcategoriaSeleccionado = null;
    this.getSubcategorias(categoria);
    console.log('hola', categoria);
  }
  editFicha(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json', 
        'usuario' :'pedro'
      })
    };
    
    const url_ficha = 'http://gy7228.myfoscam.org:8080/stock-pwfe/fichaClinica';
    this.http.put(url_ficha,this.ficha,httpOptions).subscribe((response) => {
      console.log(response,'post');
      
      this.navCtrl.navigateForward('/fichaclinica');
    });
  }
  

}
