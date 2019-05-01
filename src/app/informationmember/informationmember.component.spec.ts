import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationmemberComponent } from './informationmember.component';

describe('InformationmemberComponent', () => {
  let component: InformationmemberComponent;
  let fixture: ComponentFixture<InformationmemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationmemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
