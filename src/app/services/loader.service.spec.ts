import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have isLoading signal with initial value false', () => {
    expect(service.isLoading()).toBeFalse();
  });

  it('should set isLoading to true when startLoading is called', () => {
    service.startLoading();
    expect(service.isLoading()).toBe(true);
  });

  it('should set isLoading to false when endLoading is called after startLoading', () => {
    service.startLoading();
    service.endLoading();
    expect(service.isLoading()).toBe(false);
  });
});
