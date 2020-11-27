import React, { useState } from "react";
import { Layout, Card } from "@shopify/polaris";
import { useSelector } from "react-redux";
import { AppState } from "../reducers/types";

function Weather() {
  const {
    locationData,
    weatherData,
    weatherLoading,
    locationLoading,
    weatherError,
    locationError,
  } = useSelector<AppState, AppState>((state) => state);
  const [added, setAdded] = useState(false);

  function handleBookmarkClick() {
    if (locationData) {
      setAdded(true);
      localStorage.setItem("city", locationData.city);
    }
  }

  return (
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
  );
}

export default Weather;
