import { Injectable } from "@angular/core";
import { Sort as MatSortInterface } from "@angular/material/sort";
import { delay, Observable, of } from "rxjs";
import { PageRequest } from "src/app/shared/models/page-request.model";
import { Page } from "src/app/shared/models/page.model";
import { Sort } from "../../../shared/models/generic-sort.model";
import { Company } from "../../models/general-infos/company.model";

const companies: Company[] = [
  {
    code: "1",
    name: "Apple",
    revenue: 274.515,
  },
  {
    code: "2",
    name: "Samsung Electronics",
    revenue: 200.734,
  },
  {
    code: "3",
    name: "Alphabet",
    revenue: 182.527,
  },
  {
    code: "4",
    name: "Foxconn",
    revenue: 181.945,
  },
  {
    code: "5",
    name: "Dell Technologies",
    revenue: 92.224,
  },
  {
    code: "6",
    name: "Sony",
    revenue: 84.893,
  },
  {
    code: "7",
    name: "Hitachi",
    revenue: 82.345,
  },
  {
    code: "8",
    name: "Intel",
    revenue: 77.867,
  },
  {
    code: "9",
    name: "IBM",
    revenue: 73.62,
  },
  {
    code: "10",
    name: "Tencent",
    revenue: 69.864,
  },
  {
    code: "11",
    name: "Panasonic",
    revenue: 63.191,
  },
  {
    code: "12",
    name: "Lenovo",
    revenue: 60.742,
  },
  {
    code: "13",
    name: "HP Inc",
    revenue: 56.639,
  },
  {
    code: "14",
    name: "LG Electronics",
    revenue: 53.625,
  },
  {
    code: "15",
    name: "VMware",
    revenue: 11.8,
  },
  {
    code: "16",
    name: "Global Payments Inc ",
    revenue: 7.4,
  },
  {
    code: "17",
    name: "SS&C Technologies",
    revenue: 4.7,
  },
  {
    code: "018",
    name: "NetApp",
    revenue: 5.6,
  },
  {
    code: "19",
    name: "ServiceNow",
    revenue: 4.5,
  },
  {
    code: "20",
    name: "Workday",
    revenue: 4.3,
  },
  {
    code: "21",
    name: "Palo Alto Networks",
    revenue: 4.1,
  },
  {
    code: "22",
    name: "Akamai Technologies",
    revenue: 3.2,
  },
  {
    code: "23",
    name: "Fortinet",
    revenue: 2.6,
  },
];
@Injectable({
  providedIn: "root",
})
export class CompaniesService {
  constructor() {}

  public getCompanies(
    request: PageRequest<Company>,
    query: Partial<Company> | undefined
  ): Observable<Page<Company>> {
    console.log("page company request query", request, query);
    const queryCode = query?.code;
    const queryName = query?.name;
    const sort = request.sort;

    const filteredCompaniesByCode = this.filteredCompaniesBy(
      queryCode,
      "code",
      companies
    );

    const filteredCompaniesByName = this.filteredCompaniesBy(
      queryName,
      "name",
      filteredCompaniesByCode
    );

    const sortedCompanies = this.sortCompanies(sort, filteredCompaniesByName);
    const start = request.pageIndex * request.pageSize;
    const end = start + request.pageSize;
    const pageCompanies = sortedCompanies.slice(start, end);
    const page = {
      data: pageCompanies,
      pageIndex: request.pageIndex,
      pageSize: pageCompanies.length,
      length: sortedCompanies.length,
    };
    return of(page).pipe(delay(500));
  }

  private sortCompanies(
    sort: MatSortInterface | Sort<Company> | undefined,
    companies: Company[]
  ) {
    if (!this.isSort(sort)) {
      return [...companies];
    }

    return [...companies].sort((company1, company2) => {
      const company1ActiveSort = company1[sort.active as keyof Company];
      const company2ActiveSort = company2[sort.active as keyof Company];
      let result;
      if (typeof company1ActiveSort === "string") {
        result = company1ActiveSort
          .toLowerCase()
          .localeCompare(company2ActiveSort.toString().toLowerCase());
      } else {
        result = (company1ActiveSort as any) - (company2ActiveSort as any);
      }
      const factor = sort.direction === "asc" ? 1 : -1;
      return result * factor;
    });
  }

  private filteredCompaniesBy(
    query: string | undefined,
    property: keyof Company,
    companies: Company[]
  ): Company[] {
    if (!this.isString(query) || query.length === 0) {
      return [...companies];
    }
    return companies.filter((company) => {
      const propertyValue = company[property];
      return this.isString(propertyValue)
        ? propertyValue.toLowerCase().includes(query.toLowerCase())
        : false;
    });
  }

  private isSort(
    sort: MatSortInterface | Sort<Company> | undefined
  ): sort is MatSortInterface | Sort<Company> {
    return sort !== undefined;
  }

  private isString(value: any | undefined): value is string {
    return typeof value === "string";
  }
}
