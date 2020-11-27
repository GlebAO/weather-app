import React, { FormEvent, useEffect, useState } from "react";
import {
  Layout,
  Page,
  Button,
  FormLayout,
  TextField
} from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import { fetchLocation } from "../actions";

import { AppState } from "../reducers/types";
//import { useGeolocation } from "../hooks/useGeolocation";
import CityAutocomplete from "./CityAutocomplete";
import Weather from "./Weather";

function App() {
  const {
    weatherLoading,
    locationLoading,
  } = useSelector<AppState, AppState>((state) => state);

  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState("");

  //const {lat,lng} = useGeolocation();

  useEffect(() => {
    const city = localStorage.getItem("city");
    if(city) {
      dispatch(fetchLocation(city));
    } else {
      // Need to do request to google to fetch city by coords -  lat and lng
      dispatch(fetchLocation("London"));
    }
  }, [dispatch]);

  function handleInputChange(value: string) {
    setSearchString(value);
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (searchString.length > 0) {
      dispatch(fetchLocation(searchString));
    }
  }

  return (
    <Page title="Weather app">
      <Layout>
        <Layout.Section>
          <form onSubmit={handleFormSubmit}>
            <FormLayout>
              <FormLayout.Group>
                <CityAutocomplete />
                <TextField
                  value={searchString}
                  label="Найдите город"
                  placeholder="город..."
                  onChange={handleInputChange}
                />
              </FormLayout.Group>
              <Button
                primary
                disabled={weatherLoading || locationLoading}
                submit
              >
                Найти
              </Button>
            </FormLayout>
          </form>
        </Layout.Section>

        <Weather />

      </Layout>
    </Page>
  );
}

export default App;
