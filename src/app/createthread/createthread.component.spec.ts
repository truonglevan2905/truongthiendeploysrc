import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatethreadComponent } from './createthread.component';

describe('CreatethreadComponent', () => {
  let component: CreatethreadComponent;
  let fixture: ComponentFixture<CreatethreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatethreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatethreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
