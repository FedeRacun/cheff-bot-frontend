import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {}

  saveForm(receta: any): Observable<any> {
    return this.http.post('https://cheff-bot-backend.herokuapp.com/recetas', receta);
  }
}
