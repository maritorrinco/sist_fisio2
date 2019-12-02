import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservaEditPage } from './reserva-edit.page';

describe('ReservaEditPage', () => {
  let component: ReservaEditPage;
  let fixture: ComponentFixture<ReservaEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
