import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-fichaclinica-create',
  templateUrl: './fichaclinica-create.page.html',
  styleUrls: ['./fichaclinica-create.page.scss'],
})
export class FichaclinicaCreatePage implements OnInit {
  public ficha={
    motivoConsulta: null, 
    diagnostico:null,
    observacion:null,
    idEmpleado:{
      idPersona:null 
    }, 
    idCliente:{
        idPersona:null 
    },
    idTipoProducto:
    {
      idTipoProducto:null 
    } 
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
  response_fichaCreada : any;
  //public files: Array<{ idFichaArchivo: string, nombre: string, urlImagen: string }> = [];
  public filesUp: any = [];
  constructor(private http: HttpClient, public navCtrl: NavController,private zone: NgZone) { }

  ngOnInit() {
    this.getFisioterapeutas();
    this.getPacientes();
    this.getCategorias();
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
  createFicha(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json', 
        'usuario' :'pedro'
      })
    };
    
    const url_ficha = 'http://gy7228.myfoscam.org:8080/stock-pwfe/fichaClinica';
    this.http.post(url_ficha,this.ficha,httpOptions).subscribe((response) => {
      console.log(response,'post');
      this.response_fichaCreada = response;
      this.addFiles(this.response_fichaCreada.idFichaClinica);
      this.navCtrl.navigateForward('/fichaclinica');
    });
  }
  changeListener($event) {
    this.filesUp = [];
    this.zone.run(() => {
      this.filesUp.push($event.target.files);
    });
    console.log(this.filesUp);
  }
  addFiles(idFicha){
    const formData = new FormData();
    for (let i = 0; i < this.filesUp[0].length; i++){
      formData.append('file', this.filesUp[0][i]);
      formData.append('nombre', this.filesUp[0][i].name);
      formData.append('idFichaClinica', idFicha);
      console.log("formDATA===", formData, this.filesUp[0][i]);

      this.http.post("http://gy7228.myfoscam.org:8080/stock-pwfe/fichaArchivo/archivo",formData)
      .subscribe((data:any)=>{
        console.log(data);    
      },
      error => {
      },
      () => {
        console.log("ok");
      })    
    }
  }
}
