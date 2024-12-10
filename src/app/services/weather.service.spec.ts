import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { API_CONFIG } from '../config/api-config-provider';
import { WeatherForCity } from '../models/weather-for-city';
import {provideHttpClient} from "@angular/common/http";

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'cities') {
        return JSON.stringify(['Kyiv', 'Lviv']);
      }
      return null;
    });

    spyOn(localStorage, 'setItem');

    TestBed.configureTestingModule({
      providers: [
          provideHttpClient(),
        provideHttpClientTesting(),
        WeatherService,
        { provide: API_CONFIG, useValue: { url: 'https://api.weatherapi.com/v1' } },
      ],
    });

    service = TestBed.inject(WeatherService);
  });

  it('should initialize with cities from localStorage', () => {
    expect(service.cities()).toEqual(['Kyiv', 'Lviv']);
  });

  it('should save cities to localStorage', () => {
    service.saveForecast({ location: { name: 'Kyiv' } } as WeatherForCity);

    service.saveCities();

    expect(localStorage.setItem).toHaveBeenCalledWith('cities', JSON.stringify(['Kyiv', 'Lviv', 'Kyiv']));
  });

  it('should remove a city and its forecast', () => {
    service.saveForecast({ location: { name: 'Kyiv' } } as WeatherForCity);
    service.removeCity('Kyiv');

    expect(service.cities()).toEqual([]);
    expect(service.forecasts()).toEqual([]);
  });

  it('should save forecast and update cities and forecasts signals', () => {
    const mockWeather: WeatherForCity = {
      id: 'test-id',
      location: { name: 'Kyiv' },
    } as WeatherForCity;

    service.saveForecast(mockWeather);

    expect(service.cities()).toContain('Kyiv');
    expect(service.forecasts()).toContain(mockWeather);
  });
});
