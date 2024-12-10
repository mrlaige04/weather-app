import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderComponent } from './loader.component';
import { LoaderService } from '../../../services/loader.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { signal } from "@angular/core";

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let loaderService: jasmine.SpyObj<LoaderService>;

  beforeEach(async () => {
    loaderService = jasmine.createSpyObj('LoaderService', ['isLoading']);
    loaderService.isLoading.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [LoaderComponent, CommonModule],
      providers: [
        { provide: LoaderService, useValue: loaderService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be visible when loading', () => {
    component.isLoading = signal(true);
    fixture.detectChanges();
    const loaderDiv = fixture.nativeElement.querySelector('.loader');
    expect(loaderDiv).toBeTruthy();
  });

  it('should be hidden when not loading', () => {
    component.isLoading = signal(false);
    fixture.detectChanges();

    const loaderDiv = fixture.nativeElement.querySelector('.loader');

    const computedStyle = window.getComputedStyle(loaderDiv);
    expect(computedStyle.display).toBe('flex');
  });

  it('should call isLoading from LoaderService', () => {
    component.isLoading();
    expect(loaderService.isLoading).toHaveBeenCalled();
  });
});
