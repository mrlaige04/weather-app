import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public isLoading = signal(false);

  startLoading() {
    this.isLoading.set(true);
  }

  endLoading() {
    this.isLoading.set(false);
  }
}
