import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementAdminComponent } from './announcement-admin.component';

describe('AnnouncementAdminComponent', () => {
  let component: AnnouncementAdminComponent;
  let fixture: ComponentFixture<AnnouncementAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
