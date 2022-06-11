import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FileService } from "./file.service";

import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

describe("FileService", () => {
  let service: FileService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let inputElement: HTMLInputElement;

  const testUploadFilesWithTrackingProgressUrl =
    "http://demos.hacks.mozilla.org/paul/demos/resources/webservices/devnull.php";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileService],
    });
    service = TestBed.inject(FileService);
    httpClient = TestBed.inject(HttpClient);
  });

  beforeEach(() => {
   inputElement = document.createElement("input");
   inputElement.setAttribute('type', "file");
  });
  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("filesSizeInByte", () => {
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    expect(service.filesSizeInByte( [file])).toBe(file.size);
  });
});
