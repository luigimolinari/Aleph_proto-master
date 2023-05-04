import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraticaSearchComponent } from './pratica-search.component';

describe('PraticaSearchComponent', () => {
  let component: PraticaSearchComponent;
  let fixture: ComponentFixture<PraticaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PraticaSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PraticaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
