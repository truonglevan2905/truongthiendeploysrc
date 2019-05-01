import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopthuComponent } from './hopthu.component';

describe('HopthuComponent', () => {
  let component: HopthuComponent;
  let fixture: ComponentFixture<HopthuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopthuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopthuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
