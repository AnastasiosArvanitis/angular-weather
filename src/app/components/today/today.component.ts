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
  loading = false;
  geo: boolean;
  cityNotFound: boolean;
  message: string;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getLocation();
    // this.weatherService.getWeatherDataByCords(35, 139).subscribe(console.log());
  }

  // tslint:disable-next-line:typedef
  getLocation() {
    if ('geolocation' in navigator) {
      this.geo = true;
      navigator.geolocation.watchPosition( success => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        this.weatherService.getWeatherDataByCords(this.lat, this.lon).subscribe( data => {
          this.weather = data;
        });
      },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            this.geo = false;
            this.message = 'If you do not wish to give your position you will have to chose a city';
            console.log('geo: ' + this.geo);
            console.log('mes: ' + this.message);
          }
      });
    }
  }

  getCity(city: string): any {
    this.loading = true;
    this.weatherService.getWeatherDataByCityName(city)
      .subscribe(data => {
        if (data.cod === '404') {
          this.weather = null;
          this.cityNotFound = true;
          this.message = 'The city you are looking for was not found';
          console.log('City not found');
        } else {
          this.cityNotFound = false;
          this.weather = data;
          console.log('City found');
        }
    },
        error => {
          this.cityNotFound = true;
          this.message = 'The city you are looking for was not found';
          this.loading = false;
          console.log('other error');
        },
        () => {
        this.loading = false;
        console.log('Response completed');
        }
    );
  }

}
