import {Component, DestroyRef, inject, signal} from '@angular/core';
import {Card} from 'primeng/card';
import {PrimeTemplate} from 'primeng/api';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {WeatherService} from '../../services/weather.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError, finalize, of, tap} from 'rxjs';
import {LoaderService} from '../../services/loader.service';
import {WeatherForCity} from '../../models/weather-for-city';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-weather-add',
  standalone: true,
  imports: [
    Card,
    PrimeTemplate,
    Button,
    InputText,
    ReactiveFormsModule
  ],
  templateUrl: './weather-add.component.html',
  styleUrl: './weather-add.component.scss'
})
export class WeatherAddComponent {
  private notificationService = inject(NotificationService);
  private loaderService = inject(LoaderService);
  private destroyRef = inject(DestroyRef);
  private weatherService = inject(WeatherService);

  public isLoading = signal(false);

  form = new FormGroup({
    city: new FormControl('', [Validators.required]),
  });

  submit() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading.set(true);
    this.loaderService.startLoading();
    this.weatherService.getWeather(this.form.value.city!)
      .pipe(
        catchError((err) => {
          const message = err.error.error.message;
          this.notificationService.showError('Error', message);
          return of(null);
        }),
        tap((weather) => {
          if (!weather) return;

          if (this.hasCollision(weather)) {
            this.notificationService.showError('Same city already exists.');
            return;
          }

          this.weatherService.saveForecast(weather);
          this.form.reset();
          this.weatherService.saveCities();
        }),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.loaderService.endLoading();
          this.isLoading.set(false);
        })
      ).subscribe();
  }

  private hasCollision(weather: WeatherForCity) {
    const cities = this.weatherService.cities();
    const sameCity = cities.find(c => c == weather.location.name);
    return !!sameCity;
  }
}
