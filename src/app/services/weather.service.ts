import {inject, Injectable, signal} from '@angular/core';
import {API_CONFIG} from '../config/api-config-provider';
import {HttpClient, HttpParams} from '@angular/common/http';
import {WeatherForCity} from '../models/weather-for-city';
import {map, Observable, tap, throwError} from 'rxjs';
import {v4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly storageKey = 'cities';
  private _cities = signal<string[]>(this.getSavedCities());
  public cities = this._cities.asReadonly();

  private _forecasts = signal<WeatherForCity[]>([]);
  public forecasts = this._forecasts.asReadonly();

  private http = inject(HttpClient);
  private config = inject(API_CONFIG);

  private getSavedCities() {
    const fromStorage = localStorage.getItem(this.storageKey);
    if (!fromStorage) return [];

    const cities = JSON.parse(fromStorage) as string[];
    return cities ?? [];
  }

  saveCities() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cities()));
  }

  removeCity(city: string) {
    const cities = this._cities();
    const filteredCities = cities.filter(city => city !== city);
    this._cities.set(filteredCities);

    const forecasts = this._forecasts();
    const filteredForecasts = forecasts.filter(f => f.location.name !== city);
    this._forecasts.set(filteredForecasts);

    this.saveCities();
  }

  getWeather(q: string): Observable<WeatherForCity> {
    const url = `${this.config.url}/current.json`;
    const params = new HttpParams()
      .set('q', q);

    return this.http.get<WeatherForCity>(url, { params })
      .pipe(
        map(w => {
          w.id = v4();
          return w;
        })
      );
  }

  saveForecast(weather: WeatherForCity) {
    this._cities.update(w => [...w, weather.location.name]);
    this._forecasts.update(f => [...f, weather]);
  }
}
