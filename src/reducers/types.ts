import { LocationType, WeatherDataType } from "../actions";

export interface AppState {
    locationLoading: boolean,
    locationError: Error | null,
    locationData: LocationType | null,
    
    weatherLoading: boolean,
    weatherError: Error | null,
    weatherData: WeatherDataType | null
}