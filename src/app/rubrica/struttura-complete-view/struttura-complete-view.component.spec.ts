import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrutturaCompleteViewComponent } from './struttura-complete-view.component';

describe('StrutturaCompleteViewComponent', () => {
  let component: StrutturaCompleteViewComponent;
  let fixture: ComponentFixture<StrutturaCompleteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrutturaCompleteViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrutturaCompleteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
