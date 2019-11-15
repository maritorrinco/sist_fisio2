import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.page.html',
  styleUrls: ['./paciente.page.scss'],
})
export class PacientePage implements OnInit {
  public items: Array<{ nombre: string }> = [];

  constructor(private http: HttpClient) { 
    this.http.get('http://gy7228.myfoscam.org:8080/stock-pwfe/persona').subscribe((response) => {
      console.log(response);
      for (let i = 0; i < response.totalDatos; i++) {
        this.items.push({
          nombre: response.lista[i].nombre,
          });
      }
    });
  }

  ngOnInit() {
  }

}
