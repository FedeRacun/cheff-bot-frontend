import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {}

  saveForm(receta: any): Observable<any> {
    console.log(receta);
    return this.http.post('http://localhost:3312/recetas', receta);
  }
}
