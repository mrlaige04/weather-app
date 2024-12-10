import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors} from '@angular/common/http';

import { passApiKeyInterceptor } from './pass-api-key.interceptor';
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {API_CONFIG} from "../config/api-config-provider";

describe('passApiKeyInterceptor', () => {
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([passApiKeyInterceptor])),
        provideHttpClientTesting(),
        { provide: API_CONFIG, useValue: { key: 'test-api-key' } },
      ],
    });

    http = TestBed.inject(HttpClient);
  });

  it('should add API key to request params', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);

    http.get('/test').subscribe();

    const req = httpTestingController.expectOne('/test?key=test-api-key');
    expect(req.request.params.get('key')).toBe('test-api-key');
    req.flush({});
    httpTestingController.verify();
  });
});
