import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectBarComponent } from './direct-bar.component';

describe('DirectBarComponent', () => {
  let component: DirectBarComponent;
  let fixture: ComponentFixture<DirectBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
