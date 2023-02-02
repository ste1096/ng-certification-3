import { EMPTY, interval, Subscription } from 'rxjs'
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
    return this.weatherService.getCurrentConditions()
  }

  updateCurrentConditions() {
    const locations = this.locationService.locations
    return this.weatherService.updateCurrentConditions(locations)
  }

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }

  private initPolling() {
    this.subscription = interval(30000)
      .pipe(
        startWith(0),
        switchMap(() => {
          this.updateCurrentConditions()
          return EMPTY
        })
      )
      .subscribe(() => {
        //do nothing
      })
  }
}
