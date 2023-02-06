import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'

import { environment } from '../environments/environment'
import { AppComponent } from './app.component'
import { routing } from './app.routing'
import {
  CurrentConditionsComponent,
  ForecastsListComponent,
  InputSelectSearchComponent,
  MainPageComponent,
  StateButtonComponent,
  ZipcodeEntryComponent,
} from './components'
import { ClickOutsideDirective } from './directives/click-outside.directive'
import { HighligthPipe } from './pipes/highlight.pipe'
import { CountryService } from './services/country.service'
import { LocationService } from './services/location.service'
import { WeatherService } from './services/weather.service'

@NgModule({
  declarations: [
    AppComponent,
    ZipcodeEntryComponent,
    ForecastsListComponent,
    CurrentConditionsComponent,
    MainPageComponent,
    StateButtonComponent,
    InputSelectSearchComponent,
    ClickOutsideDirective,
    HighligthPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [LocationService, WeatherService, CountryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
