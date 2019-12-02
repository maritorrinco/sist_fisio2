import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})




export class ReservaPage implements OnInit {

  queryList = {
    idEmpleado: { idPersona : null},
    idCliente:  { idPersona: null},
    fechaDesdeCadena: null,
    fechaHastaCadena: null
  };
  fechaDesdeCadena: string;
  fechaHastaCadena: string;
  personasList: any;
  fisioterapeutaList: any;
constructor(navParams: NavParams, public viewCtrl: ModalController) {

  console.log(navParams.get('personasList'));
  console.log(navParams.get('fisioterapeutaList'));

  this.personasList = navParams.get('personasList');
  this.fisioterapeutaList = navParams.get('fisioterapeutaList');

}
  ngOnInit() {
    this.queryList.fechaDesdeCadena = this.formatDate(new Date());
    this.queryList.fechaHastaCadena = this.formatDate(new Date());
  }



  dismiss() {
    if (this.fechaDesdeCadena == null || this.fechaHastaCadena == null) {
      this.fechaDesdeCadena = new Date(2000, 10, 10).toString();
      this.fechaHastaCadena = new Date(2100, 10, 10).toString();
    }

    this.queryList.fechaDesdeCadena = this.formatDate(this.fechaDesdeCadena);
    this.queryList.fechaHastaCadena = this.formatDate(this.fechaHastaCadena);
    console.log('queryList');
    console.log(this.queryList);
    this.viewCtrl.dismiss(this.queryList);
  }

  formatDate(today) {
    if (today === null) {
      return null;
    }
    const newDate = new Date(today);

   
    const dd = String(newDate.getDate()).padStart(2, '0');
    const mm = String(newDate.getMonth() + 1).padStart(2, '0');
    const yyyy = newDate.getFullYear();

    const dateFormat = yyyy + mm  + dd;

    return dateFormat;



  }

}
