import { Observable, Subscription } from 'rxjs'

import { Component, OnDestroy, OnInit } from '@angular/core'

import { Condition, Option } from '../../interface'
import { Location } from '../../interface/location.interface'
import { CountryService } from '../../services/country.service'
import { LocationService } from '../../services/location.service'
import { WeatherService } from '../../services/weather.service'

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html',
  styleUrls: ['./zipcode-entry.component.css'],
})
export class ZipcodeEntryComponent implements OnInit, OnDestroy {
  zipcode: string
  countrycode: string
  options = []

  subscription: Subscription

  constructor(
    private locationService: LocationService,
    private weatherService: WeatherService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.subscription = this.countryService.fetchAllCountries().subscribe((countries) => {
      this.options = countries
        ?.map((country) => {
          return { name: country?.name, value: country?.code }
        })
        ?.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  addLocation(): Observable<any> {
    return this.weatherService.fetchCondition({
      zipcode: this.zipcode,
      countrycode: this.countrycode,
    })
  }

  onAddedLocation(condition: Condition, location: Location) {
    this.locationService.addLocation(location)
    this.weatherService.addCondition(condition)
    this.zipcode = ''
  }

  onChangeCountry(option: Option) {
    this.countrycode = option?.value
  }
}
