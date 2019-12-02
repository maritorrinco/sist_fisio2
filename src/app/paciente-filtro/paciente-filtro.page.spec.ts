import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PacienteFiltroPage } from './paciente-filtro.page';

describe('PacienteFiltroPage', () => {
  let component: PacienteFiltroPage;
  let fixture: ComponentFixture<PacienteFiltroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteFiltroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteFiltroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
