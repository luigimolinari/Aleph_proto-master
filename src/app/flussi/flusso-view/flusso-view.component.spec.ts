import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlussoViewComponent } from './flusso-view.component';

describe('FlussoViewComponent', () => {
  let component: FlussoViewComponent;
  let fixture: ComponentFixture<FlussoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlussoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlussoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
