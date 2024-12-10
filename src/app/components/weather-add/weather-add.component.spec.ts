import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherAddComponent } from './weather-add.component';
import { WeatherService } from '../../services/weather.service';
import { NotificationService } from '../../services/notification.service';
import { LoaderService } from '../../services/loader.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { WeatherForCity } from '../../models/weather-for-city';

describe('WeatherAddComponent', () => {
  let component: WeatherAddComponent;
  let fixture: ComponentFixture<WeatherAddComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let loaderService: jasmine.SpyObj<LoaderService>;

  beforeEach(() => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeather', 'saveForecast', 'cities', 'saveCities']);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['showError']);
    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['startLoading', 'endLoading']);

    TestBed.configureTestingModule({
      declarations: [WeatherAddComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: LoaderService, useValue: loaderServiceSpy },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherAddComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error response when getWeather fails', () => {
    const errorResponse = {
      error: { error: { message: 'City not found' } }
    } as any as WeatherForCity;

    weatherService.getWeather.and.returnValue(of(errorResponse));

    component.form.setValue({ city: 'Invalid City' });
    component.submit();

    expect(notificationService.showError).toHaveBeenCalledWith('Error', 'City not found');
  });

  it('should handle success response when getWeather returns valid data', () => {
    const mockWeather: WeatherForCity = {
      id: '1',
      q: 'city-query',
      location: { name: 'Test City' },
      current: {
        temp_c: 15,
        temp_f: 59,
        condition: { text: 'Clear', code: 1000 }
      }
    };

    weatherService.getWeather.and.returnValue(of(mockWeather));
    weatherService.cities.and.returnValue(['Existing City']);
    weatherService.saveForecast.and.callThrough();
    weatherService.saveCities.and.callThrough();

    component.form.setValue({ city: 'Test City' });
    component.submit();

    expect(weatherService.saveForecast).toHaveBeenCalledWith(mockWeather);
    expect(component.form.value.city).toBe('');
    expect(weatherService.saveCities).toHaveBeenCalled();
  });

  it('should show error when same city is already added', () => {
    const mockWeather: WeatherForCity = {
      id: '1',
      q: 'city-query',
      location: { name: 'Existing City' },
      current: {
        temp_c: 15,
        temp_f: 59,
        condition: { text: 'Clear', code: 1000 }
      }
    };

    weatherService.getWeather.and.returnValue(of(mockWeather));
    weatherService.cities.and.returnValue(['Existing City']);
    weatherService.saveForecast.and.callThrough();
    weatherService.saveCities.and.callThrough();

    component.form.setValue({ city: 'Existing City' });
    component.submit();

    expect(notificationService.showError).toHaveBeenCalledWith('Same city already exists.');
    expect(weatherService.saveForecast).not.toHaveBeenCalled();
  });

  it('should set isLoading to true when submitting form', () => {
    const mockWeather: WeatherForCity = {
      id: '1',
      q: 'city-query',
      location: { name: 'Test City' },
      current: {
        temp_c: 15,
        temp_f: 59,
        condition: { text: 'Clear', code: 1000 }
      }
    };

    weatherService.getWeather.and.returnValue(of(mockWeather));
    weatherService.cities.and.returnValue(['Existing City']);
    weatherService.saveForecast.and.callThrough();
    weatherService.saveCities.and.callThrough();

    component.form.setValue({ city: 'Test City' });
    component.submit();

    expect(component.isLoading()).toBe(true);
  });

  it('should set isLoading to false after weather data is processed', () => {
    const mockWeather: WeatherForCity = {
      id: '1',
      q: 'city-query',
      location: { name: 'Test City' },
      current: {
        temp_c: 15,
        temp_f: 59,
        condition: { text: 'Clear', code: 1000 }
      }
    };

    weatherService.getWeather.and.returnValue(of(mockWeather));
    weatherService.cities.and.returnValue(['Existing City']);
    weatherService.saveForecast.and.callThrough();
    weatherService.saveCities.and.callThrough();

    component.form.setValue({ city: 'Test City' });
    component.submit();

    expect(component.isLoading()).toBe(false);
  });
});
