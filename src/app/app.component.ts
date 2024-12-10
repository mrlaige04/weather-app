import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WeatherAddComponent} from './components/weather-add/weather-add.component';
import {WeatherListComponent} from './components/weather-list/weather-list.component';
import {LoaderComponent} from './components/common/loader/loader.component';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WeatherAddComponent, WeatherListComponent, LoaderComponent, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'weather-app';
}
