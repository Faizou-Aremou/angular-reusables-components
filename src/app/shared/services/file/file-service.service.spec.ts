import { TestBed } from '@angular/core/testing';

import { FileDowloaderService} from './file-service.service';

describe('FileService', () => {
  let service: FileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDowloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});