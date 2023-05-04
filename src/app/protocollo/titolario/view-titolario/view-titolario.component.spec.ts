import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTitolarioComponent } from './view-titolario.component';

describe('ViewTitolarioComponent', () => {
  let component: ViewTitolarioComponent;
  let fixture: ComponentFixture<ViewTitolarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTitolarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTitolarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
