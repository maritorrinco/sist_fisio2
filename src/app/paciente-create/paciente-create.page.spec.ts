import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PacienteCreatePage } from './paciente-create.page';

describe('PacienteCreatePage', () => {
  let component: PacienteCreatePage;
  let fixture: ComponentFixture<PacienteCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacienteCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PacienteCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
