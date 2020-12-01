import { Action } from 'redux';
import { AppState } from "../reducers/types";
import { ThunkAction } from 'redux-thunk';
import axios from "axios";
import { detectLocation } from '../utils/GeoUtils';

export const FETCH_LOCATION_REQUEST = 'FETCH_LOCATION_REQUEST'
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS'
export const FETCH_LOCATION_FAILURE = 'FETCH_LOCATION_FAILURE'

export type LocationType = {
    city: string
}

interface locationRequestedAction {
    type: typeof FETCH_LOCATION_REQUEST;
}
interface locationLoadedAction {
    type: typeof FETCH_LOCATION_SUCCESS,
    payload: LocationType
}
interface locationErrorAction {
    type: typeof FETCH_LOCATION_FAILURE
    payload: Error
}

export type LocationActionTypes = locationRequestedAction | locationLoadedAction | locationErrorAction;

const locationRequested = (): LocationActionTypes => {
    return {
        type: FETCH_LOCATION_REQUEST
    };
};

const locationLoaded = (location: LocationType): LocationActionTypes => {
    return {
        type: FETCH_LOCATION_SUCCESS,
        payload: location
    };
};

const locationError = (error: Error): LocationActionTypes => {
    return {
        type: FETCH_LOCATION_FAILURE,
        payload: error
    };
};

export const fetchLocation = (
    searchString: string
): ThunkAction<void, AppState, unknown, Action<string>> => async dispatch => {
    dispatch(locationRequested());

    /*setTimeout(() => {
        if (Math.random() > 0.75) {
            dispatch(locationError(new Error(`Could't fetch city`)))
        }else {   
            const loc = {city: searchString};

            //success request to google
            dispatch(locationLoaded(loc));

            dispatch(fetchWeather(loc.city))
        }       
    }, 700);*/
    //
    await axios.get<any>(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_YANDEX_API_KEY}&geocode=${searchString}&format=json&lang=en_US&kind=locality`).then(response => {
        if (response.data.status !== "OK") {
            dispatch(locationError(new Error("Could not fetch location!")))
        }
        let cityName = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.name;

        dispatch(locationLoaded({ city: cityName }))
        dispatch(fetchWeather(cityName))
    })
        .catch(err => {
            dispatch(locationError(err))
            //alert(err.message);
            //console.log(err);
        });

    /* await axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(searchString)}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`).then(response => {
        if (response.data.status !== "OK") {
            dispatch(locationError(new Error("Could not fetch location!")))
        }
        const cityName = response.data.results[0].cityName;

        dispatch(locationLoaded({city: cityName}))
        dispatch(fetchWeather(cityName))
    })
        .catch(err => {
            dispatch(locationError(err))
            //alert(err.message);
            //console.log(err);
        });*/
}

export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST'
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS'
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE'

interface weatherRequestedAction {
    type: typeof FETCH_WEATHER_REQUEST;
}
interface weatherLoadedAction {
    type: typeof FETCH_WEATHER_SUCCESS,
    payload: WeatherDataType
}
interface weatherErrorAction {
    type: typeof FETCH_WEATHER_FAILURE
    payload: Error
}

export type WeatherActionTypes = weatherRequestedAction | weatherLoadedAction | weatherErrorAction;

const weatherRequested = (): WeatherActionTypes => {
    return {
        type: FETCH_WEATHER_REQUEST
    };
};

const weatherLoaded = (weather: WeatherDataType): WeatherActionTypes => {
    return {
        type: FETCH_WEATHER_SUCCESS,
        payload: weather
    };
};

const weatherError = (error: Error): WeatherActionTypes => {
    return {
        type: FETCH_WEATHER_FAILURE,
        payload: error
    };
};

export type WeatherDataType = {
    name: string,
    main: {
        temp: number,
        pressure: number,
        humidity: number,
        temp_min: number,
        temp_max: number,
    }
}

export const fetchWeather = (
    city: string
): ThunkAction<void, AppState, unknown, Action<string>> => async dispatch => {
    dispatch(weatherRequested());
    await axios.get<WeatherDataType>(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then(response => {
        if (response.status !== 200) {
            dispatch(weatherError(new Error('Wrong city')))
        }
        const weather: WeatherDataType = response.data;

        dispatch(weatherLoaded(weather))
    })
        .catch(err => {
            dispatch(weatherError(new Error(err.response.data.message)))
            //alert(err.message);
            // console.log(err);
        });
}

export const FETCH_COORDS_REQUEST = 'FETCH_COORDS_REQUEST'
export const FETCH_COORDS_SUCCESS = 'FETCH_COORDS_SUCCESS'
export const FETCH_COORDS_FAILURE = 'FETCH_COORDS_FAILURE'

interface coordsRequestedAction {
    type: typeof FETCH_COORDS_REQUEST;
}
interface coordsLoadedAction {
    type: typeof FETCH_COORDS_SUCCESS,
    payload: GeolocationPosition
}
interface coordsErrorAction {
    type: typeof FETCH_COORDS_FAILURE
    payload: Error
}

export type coordsActionTypes = coordsRequestedAction | coordsLoadedAction | coordsErrorAction;

const coordsRequested = (): coordsActionTypes => {
    return {
        type: FETCH_COORDS_REQUEST
    };
};

const coordsLoaded = (coords: GeolocationPosition): coordsActionTypes => {
    return {
        type: FETCH_COORDS_SUCCESS,
        payload: coords
    };
};

const coordsError = (error: Error): coordsActionTypes => {
    return {
        type: FETCH_COORDS_FAILURE,
        payload: error
    };
};

export const fetchGeo = (): ThunkAction<void, AppState, unknown, Action<string>> => async dispatch => {
    dispatch(coordsRequested());
    await detectLocation().then(coords => {
        dispatch(coordsLoaded(coords))
        const {coords:{latitude, longitude}} = coords;
        dispatch(fetchLocation(`${longitude},${latitude}`))
    })
        .catch(err => {
            dispatch(coordsError(err))
        });
}