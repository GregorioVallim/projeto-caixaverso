import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transfer } from '../../main-panel/pages/transfer/models/transfer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransfersService {
  private readonly http = inject(HttpClient);

  apiUrl = 'http://localhost:3000';


  createTransfer(transfer: Transfer): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/transfers`, transfer);
    }

}
