import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FichaclinicaPage } from './fichaclinica.page';

describe('FichaclinicaPage', () => {
  let component: FichaclinicaPage;
  let fixture: ComponentFixture<FichaclinicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaclinicaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FichaclinicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
