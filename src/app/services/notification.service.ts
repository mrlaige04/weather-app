import {inject, Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private messageService = inject(MessageService);

  showError(title: string, message?: string) {
    this.show('error', title, message);
  }

  private show(severity: string, title: string, message?: string) {
    this.messageService.add({
      severity,
      summary: title,
      detail: message,
      life: 2000,
      closable: true
    });
  }
}
