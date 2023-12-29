import { TestBed } from '@angular/core/testing';

import { TaskTwoService } from './task-two.service';

describe('TaskTwoService', () => {
  let service: TaskTwoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskTwoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
