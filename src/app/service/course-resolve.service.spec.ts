import { TestBed } from '@angular/core/testing';

import { CourseResolveService } from './course-resolve.service';

describe('CourseResolveService', () => {
  let service: CourseResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
