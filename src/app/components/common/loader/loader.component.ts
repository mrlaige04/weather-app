import {Component, HostBinding, inject} from '@angular/core';
import {LoaderService} from '../../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  private loadingService = inject(LoaderService);
  public isLoading = this.loadingService.isLoading;

  @HostBinding('style.display') get display() {
    return this.isLoading() ? 'block' : 'none';
  }
}
