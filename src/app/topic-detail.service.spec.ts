import { TestBed } from '@angular/core/testing';

import { TopicDetailService } from './topic-detail.service';

describe('TopicDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TopicDetailService = TestBed.get(TopicDetailService);
    expect(service).toBeTruthy();
  });
});
