import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecktopicsComponent } from './checktopics.component';

describe('ChecktopicsComponent', () => {
  let component: ChecktopicsComponent;
  let fixture: ComponentFixture<ChecktopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChecktopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecktopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
