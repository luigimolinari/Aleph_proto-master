import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpaViewComponent } from './ipa-view.component';

describe('IpaViewComponent', () => {
  let component: IpaViewComponent;
  let fixture: ComponentFixture<IpaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IpaViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
