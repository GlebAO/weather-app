import { WeatherDataType } from "./actions";

export type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: "OK" | "ZERO_RESULTS";
};

export type OpenWeatherResponse = {
    status: 200 | 500,
    data: WeatherDataType
}