import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempiFlussoComponent } from './tempi-flusso.component';

describe('TempiFlussoComponent', () => {
  let component: TempiFlussoComponent;
  let fixture: ComponentFixture<TempiFlussoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempiFlussoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempiFlussoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
