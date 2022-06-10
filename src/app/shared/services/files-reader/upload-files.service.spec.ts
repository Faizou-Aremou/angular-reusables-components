import { TestBed } from '@angular/core/testing';

import { uploadFilesService } from './upload-files.service';

describe('UploadFilesService', () => {
  let service: uploadFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(uploadFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
