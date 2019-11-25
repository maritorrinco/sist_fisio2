import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FichaclinicaCreatePage } from './fichaclinica-create.page';

describe('FichaclinicaCreatePage', () => {
  let component: FichaclinicaCreatePage;
  let fixture: ComponentFixture<FichaclinicaCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaclinicaCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FichaclinicaCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
