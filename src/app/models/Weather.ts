export class Weather {
  coord: {
    lon: number,
    lat: number
  };
  sys: {
    country: string,
    sunrise: number,
    sunset: number
  };
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  };
  wind: {
    speed: number,
    deg: number
  };
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ];
  name: string;
  cod: string;
}
