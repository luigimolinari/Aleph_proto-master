import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilitaAddComponent } from './visibilita-add.component';

describe('VisibilitaAddComponent', () => {
  let component: VisibilitaAddComponent;
  let fixture: ComponentFixture<VisibilitaAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibilitaAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilitaAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
