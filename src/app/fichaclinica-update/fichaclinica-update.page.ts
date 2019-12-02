import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';

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
  files: Array<{ idFichaArchivo: string, nombre: string, urlImagen: string }> = [];
  response_paciente: any;
  response: any;
  idFicha: any;
  response_ficha:any;
  response_archivo: any;
  creacion: false;
  uploadText: any;
  downloadText: any;
  fileTransfer: FileTransferObject;
  fileMeta: any;
  fileEntry: any;
  nativepath: string;
  binaryData: any;
  fileUp: any;
  constructor(private http: HttpClient, public navCtrl: NavController,private zone: NgZone,private route: ActivatedRoute,private transfer:FileTransfer,private file:File,private filePath:FilePath,private fileChooser:FileChooser) { 
    this.uploadText = "";
    this.downloadText = "";
  }

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
      
      let getFilesParams = new HttpParams().set('idFichaClinica', this.ficha.idFichaClinica)
      this.http.get('http://gy7228.myfoscam.org:8080/stock-pwfe/fichaArchivo',{params:getFilesParams}).subscribe((response_archivo) => {
        this.response_archivo = response_archivo;
        for (let j = 0; j < this.response_archivo.totalDatos; j++){
          this.files.push({ idFichaArchivo: this.response_archivo.lista[j].idFichaArchivo, nombre: this.response_archivo.lista[j].nombre, urlImagen: this.response_archivo.lista[j].urlImagen });
        }
      });  
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
  // getFileInfo(fileEntry: any, nativepath: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     fileEntry.file(
  //         meta =>
  //             resolve({
  //                 nativeURL: fileEntry.nativeURL,
  //                 fileNameFromPath: nativepath.substring(nativepath.lastIndexOf('/') + 1),                  
  //                 ...meta
  //             }),
  //         error => reject(error)
  //     );
  //   });
  // }
  // uploadFile(idFicha: string){
  //   /*this.fileChooser.open().then((uri)=>{
  //     this.filePath.resolveNativePath(uri).then((nativepath)=>{
  //       this.nativepath = nativepath;
  //     },(err)=>{
  //       alert(JSON.stringify(err));      
  //     });
  //     this.file.resolveLocalFilesystemUrl(uri).then((fileEntry: any) => {
  //       this.getFileInfo(fileEntry, this.nativepath).then((fileMeta: any)=>{
  //         this.fileMeta = fileMeta;
  //         this.fileEntry = fileEntry;*/
  //         /*this.fileTransfer = this.transfer.create();
  //         let options:FileUploadOptions={
  //           fileKey: 'file',
  //           fileName: this.fileMeta.fileNameFromPath,
  //           httpMethod: 'PUT',
  //           chunkedMode: false,
  //           // mimeType: this.fileMeta.type,
  //           mimeType: "multipart/form-data",
  //           headers:{
  //             file: this.fileEntry,
  //             nombre: this.fileMeta.fileNameFromPath,
  //             idFichaClinica: this.idFicha
  //           }
  //         }
  //         this.uploadText = "Uploading..."
  //         this.fileTransfer.upload(this.nativepath,'http://gy7228.myfoscam.org:8080/stock-pwfe/fichaArchivo/archivo',options).then((data)=>{
  //           alert("Transfer done = " + JSON.stringify(data));
  //           this.uploadText = "";
  //         },(err)=>{
  //           this.uploadText = "";
  //         });*/
  //         const url_arch = 'http://gy7228.myfoscam.org:8080/stock-pwfe/fichaArchivo/archivo';
  //         /*let headers = new HttpHeaders({
  //           'Content-Type': 'multipart/form-data',
  //         });*/
  //         //var myUploadedFile = document.getElementById("myFile").files[0];
  //         let body = {
  //           //file: myUploadedFile,
  //           idFichaClinica: this.idFicha,
  //           nombre: this.fileMeta.fileNameFromPath
  //         };
  //         //let options = { headers: headers };
  //         this.http.post(url_arch, body , null).subscribe((response) => {
  //           console.log(response,'post file');
  //         });
          
  //   /*});
  //     });
  //   },(err)=>{
  //     alert(JSON.stringify(err));
  //   });*/
  // }
  // abortUpload(){
  //   this.fileTransfer.abort();
  //   alert("upload cancelled");
  // }
  changeListener($event) : void {
    const formData = new FormData();
    this.fileUp = $event.target.files[0];
    console.log(this.file);

    formData.append('file', this.fileUp);
    formData.append('nombre', this.fileUp.name);
    formData.append('idFichaClinica', this.idFicha);
    console.log("formDATA===", formData,this.fileUp);

    this.http.post("http://gy7228.myfoscam.org:8080/stock-pwfe/fichaArchivo/archivo",formData)
    .subscribe((data:any)=>{
      console.log(data);
      //this.refresh();
      this.files = [];
      this.ngOnInit();
    },
    error => {
      //this.refresh();
      //alert("Ocurrió un error al subir el archivo. Intente de nuevo.");
      this.files = [];
      this.ngOnInit()
    },
    () => {
      // 'onCompleted' callback.
      // No errors, route to new page here
      console.log("ok");
      this.files = [];
      this.ngOnInit();
      //this.refresh();
    })    
  }
  //refresh() {
    // this.zone.run(() => {
    //   console.log('force update the screen');
    // });
    //this.ngOnInit()
  //}
  delete(id: number) : void {
    this.http.delete("http://gy7228.myfoscam.org:8080/stock-pwfe/fichaArchivo/" + id).subscribe(
      resp => {
        console.log('deleted');
        alert("Archivo eliminado");
        this.files = [];
        this.ngOnInit();
      },
      error => {
        console.log('error occur, delete fail')
        alert("Error eliminando archivo");
      }
  );
  }
  /*download(file: any): void {
    this.fileTransfer = this.transfer.create();
    this.fileTransfer.download(file.urlImagen, file.nombre).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (err) => {
      // handle error
      console.log('Error',err);
    });
  }*/
}
