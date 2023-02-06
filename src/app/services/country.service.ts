import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Country } from '../interfaces'

@Injectable()
export class CountryService {
  static URL = 'https://restcountries.com/v3.1/all'

  constructor(private http: HttpClient) {}

  fetchAllCountries(): Observable<Country[]> {
    return this.http.get(`${CountryService.URL}`).pipe(
      map((result: any[]) => {
        return result?.map((res) => {
          return { code: res?.cca2, name: res?.name?.common }
        })
      })
    )
  }
}
