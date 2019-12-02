import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PacienteUpdateDeletePage } from './paciente-update-delete.page';

describe('PacienteUpdateDeletePage', () => {
  let component: PacienteUpdateDeletePage;
  let fixture: ComponentFixture<PacienteUpdateDeletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteUpdateDeletePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteUpdateDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
