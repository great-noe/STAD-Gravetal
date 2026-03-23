import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoteService {
  // Asegúrate de que este puerto sea el mismo en el que corre tu API de .NET
  private apiUrl = 'http://localhost:5188/api/Lotes';

  constructor(private http: HttpClient) { }

  registrarLote(loteData: any): Observable<any> {
    return this.http.post(this.apiUrl, loteData);
  }
  obtenerLotes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
