import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoginvalidcomponentComponent } from './dialoginvalidcomponent.component';

describe('DialoginvalidcomponentComponent', () => {
  let component: DialoginvalidcomponentComponent;
  let fixture: ComponentFixture<DialoginvalidcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialoginvalidcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoginvalidcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
