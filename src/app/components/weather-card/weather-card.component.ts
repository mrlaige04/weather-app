import {Component, inject, input} from '@angular/core';
import {CardModule} from 'primeng/card';
import {PrimeTemplate} from 'primeng/api';
import {Button} from 'primeng/button';
import {WeatherForCity} from '../../models/weather-for-city';
import {WeatherService} from '../../services/weather.service';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [
    CardModule,
    PrimeTemplate,
    Button
  ],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {
  private weatherService = inject(WeatherService);
  public weather = input.required<WeatherForCity>();

  removeCity() {
    this.weatherService.removeCity(this.weather().location.name);
  }
}
