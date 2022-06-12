import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { FileService } from "./file.service";

import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { FileUnit } from "../../models/file/file-unit";

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
    inputElement.setAttribute("type", "file");
  });
  test("should be created", () => {
    expect(service).toBeDefined();
  });

  test("Should be return files size in Byte", () => {
    const file1 = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const file2 = new File(["foo2"], "foo.txt", {
      type: "text/plain",
    });

    expect(service.filesSizeInByte([file1, file2])).toBe(7);
  });

  test("Should convert file to DataUrl (Base64 string)", async () => {
    const file = new File(["Each foo is human"], "foo-human", {
      type: "text/plain",
    });
    const data = await service.convertFileToDataUrl(file);
    expect(data).toBe("data:text/plain;base64,RWFjaCBmb28gaXMgaHVtYW4=");
  });

  test("Should convert file to appropriate unit", () => {
    expect(service.reduceOctetToAppropriateUnit(2048)).toEqual({
      size: "2",
      unit: FileUnit.KiB,
    });
  });

  test("Should convert file to appropriate unit by recursion", () => {
    expect(
      service.recursionReduceOctetToAppropriateUnit(
        2048,
        Object.values(FileUnit)
      )
    ).toEqual({
      size: "2",
      unit: FileUnit.KiB,
    });
  });

});
