import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosUpdateComponent } from './alumnos-update.component';

describe('AlumnosUpdateComponent', () => {
  let component: AlumnosUpdateComponent;
  let fixture: ComponentFixture<AlumnosUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnosUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
