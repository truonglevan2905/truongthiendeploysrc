import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistermemberComponent } from './registermember.component';

describe('RegistermemberComponent', () => {
  let component: RegistermemberComponent;
  let fixture: ComponentFixture<RegistermemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistermemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistermemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
