import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ModalController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { ReservaTurnosService } from '../reserva_turno.service';

@Component({
  selector: 'app-reserva-create',
  templateUrl: './reserva-create.page.html',
  styleUrls: ['./reserva-create.page.scss'],
})
export class ReservaCreatePage implements OnInit {
  personasList: any;
  fisioterapeutaList: any;
  horarioFisioterapuetaList: any;
  horarioList: any;
  fechaReserva: string;
  horaReserva: string;

  queryPost = {
    fechaCadena: null,
    horaInicioCadena: null,
    horaFinCadena: null,
    idEmpleado: { idPersona : null},
    idCliente:  { idPersona: null},
    observacion : null,
  };
  fechaCadena: Date;
  horario: any;





  constructor(navParams: NavParams, public viewCtrl: ModalController,
              public reservaServices: ReservaTurnosService,
              public loadingController: LoadingController,
              public cdr: ChangeDetectorRef,
              public alertController: AlertController) {
    this.personasList = navParams.get('personasList');
    this.fisioterapeutaList = navParams.get('fisioterapeutaList');
    reservaServices.getHorarioDisponibleFisio(4, '20191101').subscribe(res => {
      this.horarioList = res;

    });
  }

  onSelectChangeFisio() {
    this.getHorarios();

  }

  onSelectChangeDate() {
    if (this.queryPost.idEmpleado.idPersona != null) {
      this.getHorarios();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Reserva',
      subHeader: '',
      message: 'Se ha creado la reserva',
      buttons: ['OK']
    });

    await alert.present();
  }

  async getHorarios() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    this.queryPost.fechaCadena = this.formatDate(this.fechaCadena);
    await loading.present();
    await this.reservaServices
    .getHorarioDisponibleFisio(this.queryPost.idEmpleado.idPersona.toString(),
                               this.queryPost.fechaCadena)
      .subscribe(res => {
        this.horarioList = res;
        this.cdr.detectChanges();
        loading.dismiss();

      }, err => {
        loading.dismiss();
      });
  }



  ngOnInit() {
  }


  async guardar() {
    this.queryPost.horaInicioCadena = this.horario.horaInicioCadena;
    this.queryPost.horaFinCadena = this.horario.horaFinCadena;


    await this.reservaServices.postAgenda(this.queryPost)
      .subscribe(res => {
        console.log('se guardo');
        this.presentAlert();
        this.getHorarios();
      }, err => {
        console.log(err);
      });

    console.log(this.queryPost);
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



  dismissCreate() {
    this.viewCtrl.dismiss();
  }


}
