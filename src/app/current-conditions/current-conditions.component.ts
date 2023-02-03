import { interval, Subscription } from 'rxjs'
import { startWith, switchMap } from 'rxjs/operators'

import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { LocationService } from '../location.service'
import { WeatherService } from '../weather.service'

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

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }

  removeLocation(zipcode: string) {
    this.locationService.removeLocation(zipcode)
    this.weatherService.removeCondition(zipcode)
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
