import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveScreenComponent } from './resolve-screen.component';

describe('ResolveScreenComponent', () => {
  let component: ResolveScreenComponent;
  let fixture: ComponentFixture<ResolveScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResolveScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
