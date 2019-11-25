import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fichaclinica-create',
  templateUrl: './fichaclinica-create.page.html',
  styleUrls: ['./fichaclinica-create.page.scss'],
})
export class FichaclinicaCreatePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  todo = {}
  logForm() {
    console.log(this.todo)
  }
}
