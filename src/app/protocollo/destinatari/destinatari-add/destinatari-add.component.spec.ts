import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinatariAddComponent } from './destinatari-add.component';

describe('DestinatariAddComponent', () => {
  let component: DestinatariAddComponent;
  let fixture: ComponentFixture<DestinatariAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinatariAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinatariAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
