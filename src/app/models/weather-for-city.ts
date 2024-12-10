import {CurrentWeather} from './current-weather';
import {CityLocation} from './location';

export interface WeatherForCity {
  id: string;
  q: string;
  location: CityLocation;
  current: CurrentWeather;
}

