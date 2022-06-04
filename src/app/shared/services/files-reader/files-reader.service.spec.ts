import { TestBed } from '@angular/core/testing';

import { FilesReaderService } from './files-reader.service';

describe('UploadFilesService', () => {
  let service: FilesReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
