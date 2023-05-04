import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlephTableComponent } from './aleph-table.component';

describe('AlephTableComponent', () => {
  let component: AlephTableComponent;
  let fixture: ComponentFixture<AlephTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlephTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlephTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
