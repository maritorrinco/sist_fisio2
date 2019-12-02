import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController } from '@ionic/angular';
import { ReservaTurnosService } from '../reserva_turno.service';


import { ModalController } from '@ionic/angular';
import { ReservaPage } from '../reserva/reserva.page';
import { ReservaCreatePage } from '../reserva-create/reserva-create.page';



@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.page.html',
  styleUrls: ['./reserva-list.page.scss'],
})


export class ReservaListPage implements OnInit {

  reservasList: any;
  personasList: any;
  fisioterapeutaList: any;
  searchTerm = '';
  queryList = {
    idEmpleado: { idPersona : null},
    idCliente:  { idPersona: null},
    fechaDesdeCadena: null,
    fechaHastaCadena: null
  };

  fechaHoy: string;

  putQuery = {
    idReserva: null, observacion: null, flagAsistio: null
  };

  constructor(public reservaServices: ReservaTurnosService,
              public loadingController: LoadingController,
              public modalController: ModalController,
              public alertController: AlertController) {}



  myFunction(event) {
    this.putQuery.idReserva = event.idReserva;
    console.log(this.putQuery);

    this.presentAlert().then(res => {
      console.log(res);

    });
  }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Asistencia',
      subHeader: '',
      message: 'Marcar Asistencia del Paciente?',
      inputs: [
        {
          name: 'observacion',
          placeholder: 'observacion'
        }
      ],
      buttons: [
        {
          text: 'Si',
          role: 'confirmar',
          handler: (data) => {

            this.putQuery.observacion = data.observacion;
            this.putQuery.flagAsistio = 'S';
            this.confirmarReserva();
            console.log(this.putQuery);
          }
        },
        {
          text: 'No',
          handler: (data) => {
            this.putQuery.observacion = data.observacion;
            this.putQuery.flagAsistio = 'N';
            this.confirmarReserva();

            console.log(this.putQuery);


          }
        }
      ]
    });

    await alert.present();
  }

  async confirmarReserva() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.reservaServices.putAsistencia(this.putQuery)
      .subscribe(res => {
        console.log('guardado');
        this. getReservas(this.queryList);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
    });
  }





  async deleteReserva(idReserva: number) {
    console.log(idReserva);
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.reservaServices.deleteAgenda(idReserva)
      .subscribe(res => {
        console.log('eliminado');
        this. getReservas(this.queryList);
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });

  }



  async openModalCreate() {
    const modal = await this.modalController.create({
      component: ReservaCreatePage,
      componentProps: {
                        personasList: this.personasList,
                        fisioterapeutaList: this.fisioterapeutaList
                      }
    });

    modal.onDidDismiss().then(data => {
      this.getReservas(this.queryList);
     });
    return await modal.present();
  }

  async openModalFilter() {
    const modal = await this.modalController.create({
      component: ReservaPage,
      componentProps: {
                        personasList: this.personasList,
                        fisioterapeutaList: this.fisioterapeutaList
                      }
    });

    modal.onDidDismiss().then(data => {
      console.log(data);
      this.queryList = data.data;
      this.getReservas(data.data);
     });
    return await modal.present();



  }

  async getReservas(query) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.reservaServices.getFilterReservas(query)
      .subscribe(res => {
        console.log('reservas');
        console.log(res);
        // tslint:disable-next-line: no-string-literal
        this.reservasList = res['lista'];
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }




 




  async getClassrooms() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.reservaServices.getAgendaLibreOcupado('20190906', '4')
      .subscribe(res => {
        this.reservasList = res;
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
  }



  async getPersonas() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.reservaServices.getPersonas()
      .subscribe(res => {
        this.personasList = res;
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });

  }


  async getFisioterapeuta() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.reservaServices.getPersonas(true)
      .subscribe(res => {
        this.fisioterapeutaList = res;
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });

  }



  mostrarItem(item) {
    const fechaHoy = this.formatDate(new Date());

    if (item.flagEstado === 'C' || item.flagAsistio != null) {
        return false;
    }
    if (item.fechaCadena < fechaHoy) {
      return false;
  }
    return true;

  }





  ngOnInit() {
    this.queryList.fechaHastaCadena = this.formatDate(new Date());
    this.queryList.fechaDesdeCadena = this.formatDate(new Date());
    this.getReservas(this.queryList);
    this.getPersonas();
    this.getFisioterapeuta();

    this.fechaHoy = new Date().toString();

  }


  searchChanged() {
    console.log(this.queryList);
    this.getClassrooms();
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
