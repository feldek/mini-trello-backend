import axios from "axios";

const weatherKey = process.env.OPEN_WEATHER_MAP_KEY;
export const geoPlugin = async (request, response) => {
  try {
    const { data } = await axios.get<IWeatherKey>("http://www.geoplugin.net/json.gp");
    console.log(data);
    response.status(200).json(data);
  } catch (e) {
    console.log("err");
    response.status(500).json({});
  }
};

export const weatherPlugin = async (request, response) => {
  try {
    const { data } = await axios.get<IWeatherPlugin>(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: request.query.lat,
          lon: request.query.lon,
          appid: weatherKey,
          units: "metric",
        },
      },
    );
    response.status(200).json(data);
  } catch (e) {
    console.log("err", e);
    response.status(500).json({});
  }
};

interface IWeatherPlugin {
  coord: { lon: number; lat: number };
  weather: [{ id: number; main: string; description: string; icon: string }];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust: number };
  rain: { "1h": number };
  clouds: { all: number };
  dt: number;
  sys: { country: string; sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface IWeatherKey {
  geoplugin_request: number;
  geoplugin_status: number;
  geoplugin_delay: string;
  geoplugin_credit: string;
  geoplugin_city: string;
  geoplugin_region: string;
  geoplugin_regionCode: string;
  geoplugin_regionName: string;
  geoplugin_countryCode: string;
  geoplugin_countryName: string;
  geoplugin_continentCode: string;
  geoplugin_continentName: string;
  geoplugin_latitude: number;
  geoplugin_longitude: number;
  geoplugin_locationAccuracyRadius: number;
  geoplugin_timezone: string;
  geoplugin_currencyCode: string;
  geoplugin_currencySymbol: string;
  geoplugin_currencySymbol_UTF8: string;
  geoplugin_currencyConverter: number;
}
