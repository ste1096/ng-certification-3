import { forkJoin, Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'

import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { Condition } from '../interfaces'
import { Location } from '../interfaces/location.interface'

@Injectable()
export class WeatherService {
  static URL = 'http://api.openweathermap.org/data/2.5'
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604'
  static ICON_URL =
    'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/'

  private conditions: Condition[] = []

  constructor(private http: HttpClient) {}

  getConditions() {
    return this.conditions
  }

  addCondition(condition: Condition) {
    this.conditions.push(condition)
  }

  removeCondition({ zipcode, countrycode }: Location) {
    const i = this.conditions?.findIndex(
      ({ zip, country }) => zip === zipcode && country === countrycode
    )
    this.conditions.splice(i, 1)
  }

  saveConditions(conditions: Condition[]) {
    this.conditions = conditions
  }

  fetchCondition({ zipcode, countrycode }: Location): Observable<Condition> {
    return this.http
      .get(
        `${WeatherService.URL}/weather?zip=${zipcode},${countrycode}&units=imperial&APPID=${WeatherService.APPID}`
      )
      .pipe(
        map((condition) => {
          return { zip: zipcode, country: countrycode, data: condition }
        })
      )
  }

  fetchAllConditions(locations: Location[]): Observable<Condition[]> {
    const conditions$: Observable<Condition>[] = []
    locations?.forEach((location) => {
      conditions$.push(this.fetchCondition(location))
    })
    return conditions$?.length ? forkJoin(conditions$) : of([])
  }

  fetchForecast({ zipcode, countrycode }: Location): Observable<any> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get(
      `${WeatherService.URL}/forecast/daily?zip=${zipcode},${countrycode}&units=imperial&cnt=5&APPID=${WeatherService.APPID}`
    )
  }

  getWeatherIcon(id) {
    if (id >= 200 && id <= 232) {
      return `${WeatherService.ICON_URL}art_storm.png`
    } else if (id >= 501 && id <= 511) {
      return `${WeatherService.ICON_URL}art_rain.png`
    } else if (id === 500 || (id >= 520 && id <= 531)) {
      return `${WeatherService.ICON_URL}art_light_rain.png`
    } else if (id >= 600 && id <= 622) {
      return `${WeatherService.ICON_URL}art_snow.png`
    } else if (id >= 801 && id <= 804) {
      return `${WeatherService.ICON_URL}art_clouds.png`
    } else if (id === 741 || id === 761) {
      return `${WeatherService.ICON_URL}art_fog.png`
    }
    return `${WeatherService.ICON_URL}art_clear.png`
  }
}
