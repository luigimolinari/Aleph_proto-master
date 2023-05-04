import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrutturaViewComponent } from './struttura-view.component';

describe('StrutturaViewComponent', () => {
  let component: StrutturaViewComponent;
  let fixture: ComponentFixture<StrutturaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrutturaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrutturaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
