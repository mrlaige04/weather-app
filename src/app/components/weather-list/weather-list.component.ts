import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {WeatherCardComponent} from '../weather-card/weather-card.component';
import {WeatherService} from '../../services/weather.service';
import {catchError, finalize, forkJoin, of, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-weather-list',
  standalone: true,
  imports: [
    WeatherCardComponent
  ],
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.scss'
})
export class WeatherListComponent implements OnInit {
  private loadingService = inject(LoaderService);
  private destroyRef = inject(DestroyRef);
  private weatherService = inject(WeatherService);
  public forecasts = this.weatherService.forecasts;

  ngOnInit() {
    this.getForecastsForSavedCities();
  }

  private getForecastsForSavedCities() {
    const cities = this.weatherService.cities();
    const requests = cities.map(c => this.weatherService.getWeather(c));

    this.loadingService.startLoading();
    forkJoin(requests)
      .pipe(
        tap((weathers) => {
          weathers.forEach((weather) => this.weatherService.saveForecast(weather))
        }),
        catchError((err) => {
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loadingService.endLoading())
      ).subscribe();
  }
}
