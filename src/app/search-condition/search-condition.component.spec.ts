import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchConditionComponent } from './search-condition.component';

describe('SearchConditionComponent', () => {
  let component: SearchConditionComponent;
  let fixture: ComponentFixture<SearchConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
