import { Injectable } from "@angular/core";
import { Sort as MatSortInterface } from "@angular/material/sort";
import { delay, Observable, of } from "rxjs";
import { PageRequest } from "src/app/shared/models/page-request.model";
import { Page } from "src/app/shared/models/page.model";
import { Sort } from "../../../shared/models/generic-sort.model";
import { CompanyQuery } from "../../models/general-infos/company-query.model";
import { Company } from "../../models/general-infos/company.model";

const companies: Company[] = [
  {
    code: "1",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "2",
    name: "Apple",
    description: "Google enterprise",
  },
  {
    code: "é",
    name: "Samsung Electronics",
    description: "Google enterprise",
  },
  {
    code: "é",
    name: "Alphabet",
    description: "$182.527",
  },
  {
    code: "é",
    name: "Foxconn",
    description: "Google enterprise",
  },
  {
    code: "006",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "007",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "008",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "009",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "010",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "011",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "012",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "013",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "014",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "015",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "016",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "017",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "018",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "019",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "020",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "021",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "022",
    name: "Google",
    description: "Google enterprise",
  },
  {
    code: "023",
    name: "Google",
    description: "Google enterprise",
  },
];
@Injectable({
  providedIn: "root",
})
export class CompaniesService {
  constructor() {}

  public getCompanies(
    request: PageRequest<Company>,
    query: CompanyQuery | null
  ): Observable<Page<Company>> {
    console.log("page request query", request, query);
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

    const sortCompanies = this.sortCompanies(sort, filteredCompaniesByName);
    const start = request.page * request.size;
    const end = start + request.size;
    const pageCompanies = sortCompanies.slice(start, end);
    const page = {
      content: pageCompanies,
      number: request.page,
      size: pageCompanies.length,
      totalElements: sortCompanies.length,
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
      const company1ActiveSort: string = company1[sort.active as keyof Company];
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
    return companies.filter((company) =>  company[property].toLowerCase().includes(query.toLowerCase())
    );
  }

  private isSort(
    sort: MatSortInterface | Sort<Company> | undefined
  ): sort is MatSortInterface | Sort<Company> {
    return sort !== undefined;
  }

  private isString(value: string | undefined): value is string {
    return value !== undefined;
  }
}
