import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/weather';
  apiKey = '49f54c932e83c5ed2a5b688235933831';

  constructor(private http: HttpClient) { }

  getWeatherDataByCords(lat, lon): Observable<any> {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.apiKey);

    return this.http.get(this.url, { params });
  }

  getWeatherDataByCityName(cityName: string): Observable<any> {
    const params = new HttpParams()
      .set('q', cityName)
      .set('units', 'metric')
      .set('appid', this.apiKey);

    return this.http.get(this.url, { params });
  }

}
