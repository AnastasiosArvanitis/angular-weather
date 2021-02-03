import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../../services/weather.service';
import {Weather} from '../../models/Weather';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  lat: number;
  lon: number;
  weather: Weather;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getLocation();
    // this.weatherService.getWeatherDataByCords(35, 139).subscribe(console.log());
  }

  // tslint:disable-next-line:typedef
  getLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition( success => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;

        this.weatherService.getWeatherDataByCords(this.lat, this.lon).subscribe( data => {
          this.weather = data;
        });
      });
    }
  }

  getCity(city: string): any {
    this.weatherService.getWeatherDataByCityName(city).subscribe(data => {
      this.weather = data;
    });
  }

}
