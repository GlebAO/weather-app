import { AppState } from "./types";
import {
  LocationActionTypes,
  WeatherActionTypes,
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE,
  FETCH_WEATHER_FAILURE,
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
} from "../actions";

const initialState: AppState = {
  locationLoading: false,
  locationError: null,
  locationData: { city: "London" },

  weatherLoading: false,
  weatherError: null,
  weatherData: null,
};

export function rootReducer(
  state = initialState,
  action: LocationActionTypes | WeatherActionTypes
): AppState {
  switch (action.type) {
    case FETCH_WEATHER_REQUEST:
      return {
        ...state,
        weatherLoading: true,
        weatherError: null,
        weatherData: null,
      };
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        weatherLoading: false,
        weatherError: null,
        weatherData: action.payload,
      };
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        weatherLoading: false,
        weatherError: action.payload,
        weatherData: null,
      };
    case FETCH_LOCATION_REQUEST:
      return {
        ...state,
        locationLoading: true,
        locationError: null,
        locationData: null,
      };
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        locationLoading: false,
        locationError: null,
        locationData: action.payload,
      };
    case FETCH_LOCATION_FAILURE:
      return {
        ...state,
        locationLoading: false,
        locationError: action.payload,
        locationData: null,
      };
    default:
      return state;
  }
}
