import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  username: string;
  password: string;
  response: any;
  usernameError: string;

  // tslint:disable-next-line: max-line-length
  constructor( private menuCtrl: MenuController, private loginService: LoginService, private router: Router) {
    this.usernameError = '';
    this.menuCtrl.enable(false);
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.username = '';
    this.password = '';
    this.menuCtrl.enable(false);
  }

  inputClick() {
    this.usernameError = '';
  }

  logInForm() {
    this.loginService.getAllUsuariosDelSistema().subscribe(response => {
      this.response = response;
      const usuariosDelSistema = this.response.lista;
      const userToLogIn = usuariosDelSistema.filter(u => u.usuarioLogin === this.username);

      if ( userToLogIn.length > 0 ) {
        this.router.navigate(['home']);
        this.menuCtrl.enable(true);
      } else {
        this.usernameError = 'Ingrese un usuario válido';
        this.router.navigate(['login']);
      }
    });
  }
}
