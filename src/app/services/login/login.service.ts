import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiEndPoint = 'http://gy7228.myfoscam.org:8080/stock-pwfe/persona';

  constructor(private http: HttpClient) {}

  getAllUsuariosDelSistema() {
    const jsonEjemploParam = JSON.stringify({ soloUsuariosDelSistema: true });
    const params = new HttpParams().set('ejemplo', jsonEjemploParam);

    return this.http.get (this.apiEndPoint, {params});
  }
}
