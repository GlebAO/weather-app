import React, {  useEffect } from "react";
import {
  Layout,
  Page,
} from "@shopify/polaris";
import { useDispatch } from "react-redux";
import { fetchGeo, fetchLocation } from "../actions";
//import { useGeolocation } from "../hooks/useGeolocation";
import CityAutocomplete from "./CityAutocomplete";
import Weather from "./Weather";

function App() {  
  const dispatch = useDispatch();

  useEffect(() => {
    const city = localStorage.getItem("city");
    if(city) {
      dispatch(fetchLocation(city));
    } else {
      dispatch(fetchGeo());
    }
  }, [dispatch]);

  return (
    <Page title="Weather app">
      <Layout>
        <Layout.Section>
          <CityAutocomplete />
        </Layout.Section>
        <Weather />
      </Layout>
    </Page>
  );
}

export default App;
