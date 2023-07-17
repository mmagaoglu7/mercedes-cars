import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Color } from '../models/color';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // It can be divided into two separate layers.
  // One of HttpService, It would be base service layer. And Other one would be more spesific service layer (CarApiService & ColorApiService)
  // But for this case I think this one is enough
  private baseUrl = 'http://localhost:3000/';
  private services = {
    cars: "cars",
    colors: "colors"
  }
  constructor(private http: HttpClient) { }

  getCarsData() {
    return this.http.get<Array<Car>>(this.baseUrl + this.services.cars);
  }

  getCarById(id: number): Observable<Car> {
    const queryparams = "?id=" + id;
    return this.http.get<Array<Car>>(this.baseUrl + this.services.cars + queryparams).pipe(
      map(resp => {
        return resp[0];
      })
    );
  }

  editCar(carModel: Car) {
    return this.http.put<any>(this.baseUrl + this.services.cars + "/" + carModel.id, carModel)
  }

  getColorsData(): Observable<Array<Color>> {
    return this.http.get<Array<Color>>(this.baseUrl + this.services.colors);
  }

  getColorById(id: number): Observable<Color> {
    const queryparams = "?id=" + id;
    return this.http.get<Array<Color>>(this.baseUrl + this.services.colors + queryparams).pipe(
      map(resp => {
        return resp[0];
      })
    );
  }
}
