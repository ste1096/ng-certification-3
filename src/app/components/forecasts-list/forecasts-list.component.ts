import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { WeatherService } from '../../services/weather.service'

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css'],
})
export class ForecastsListComponent {
  zipcode: string
  countrycode: string
  forecast: any

  constructor(private weatherService: WeatherService, route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.zipcode = params['zipcode']
      this.countrycode = params['countrycode']
      this.weatherService
        .fetchForecast({ zipcode: this.zipcode, countrycode: this.countrycode })
        .subscribe((data) => (this.forecast = data))
    })
  }
}
