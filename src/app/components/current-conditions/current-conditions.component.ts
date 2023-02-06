import { interval, Subscription } from 'rxjs'
import { startWith, switchMap } from 'rxjs/operators'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Location } from '../../interfaces/location.interface'
import { LocationService } from '../../services/location.service'
import { WeatherService } from '../../services/weather.service'

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css'],
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {
  subscription: Subscription

  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initPolling()
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }

  getCurrentConditions() {
    return this.weatherService.getConditions()
  }

  showForecast(location: Location) {
    this.router.navigate(['/forecast', location?.zipcode, location?.countrycode])
  }

  removeLocation(location: Location) {
    this.locationService.removeLocation(location)
    this.weatherService.removeCondition(location)
  }

  private initPolling() {
    this.subscription = interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => {
          const locations = this.locationService?.locations
          return this.weatherService.fetchAllConditions(locations)
        })
      )
      .subscribe((conditions) => {
        this.weatherService.saveConditions(conditions)
      })
  }
}
