import React, { FormEvent, useEffect, useState } from "react";
import {
  Layout,
  Page,
  Card,
  Button,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import { fetchLocation } from "../actions";

import { AppState } from "../reducers/types";

function App() {
  const {
    locationData,
    weatherData,
    weatherLoading,
    locationLoading,
    weatherError,
    locationError,
  } = useSelector<AppState, AppState>((state) => state);

  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const city = localStorage.getItem("city");
    dispatch(fetchLocation(city ? city : "London"));
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

  function handleBookmarkClick() {
    if (locationData) {
      setAdded(true);
      localStorage.setItem("city", locationData.city);
    }
  }

  return (
    <Page title="Weather app">
      <Layout>
        <Layout.Section>
          <form onSubmit={handleFormSubmit}>
            <FormLayout>
              <FormLayout.Group>
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

        <Layout.Section>
          {locationError && !locationLoading && <p>{locationError.message}</p>}
          {weatherError && !weatherLoading && <p>{weatherError.message}</p>}
          {locationLoading && <p>Определение города...</p>}
          {weatherLoading && <p>Загрузка погоды...</p>}

          {weatherData && !weatherLoading && locationData && (
            <Card
              title={`Погода в ${locationData.city}`}
              sectioned
              primaryFooterAction={{
                content: added ? "Добавлено" : "В избранное",
                onAction: handleBookmarkClick,
                disabled: added,
              }}
            >
              <p>Температура: {weatherData?.main?.temp}</p>
              <p>Давление : {weatherData?.main?.pressure}</p>
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default App;
