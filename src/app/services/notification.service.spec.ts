import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {MessageService} from "primeng/api";

describe('NotificationService', () => {
  let service: NotificationService;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        { provide: MessageService, useValue: spy },
      ],
    });

    service = TestBed.inject(NotificationService);
    messageServiceSpy = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call MessageService.add with error severity', () => {
    const title = 'Error Title';
    const message = 'Error Message';

    service.showError(title, message);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: title,
      detail: message,
      life: 2000,
      closable: true,
    });
  });

  it('should call MessageService.add with error severity and no detail', () => {
    const title = 'Error Title';

    service.showError(title);

    expect(messageServiceSpy.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: title,
      detail: undefined,
      life: 2000,
      closable: true,
    });
  });
});
