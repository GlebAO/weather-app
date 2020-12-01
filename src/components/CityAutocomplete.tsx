import { Autocomplete, Icon } from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { SearchMinor } from "@shopify/polaris-icons";
import axios from "axios";
import { fetchLocation } from "../actions";
import { useDispatch } from "react-redux";

function CityAutocomplete() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [requested, setRequested] = useState(false);
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  const updateText = useCallback(async (value) => {
    setInputValue(value);
    if (value.length > 1 && !requested) {
      setRequested(true);
      await axios
        .get<any>(
          `https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_YANDEX_API_KEY}&geocode=${value}&format=json&lang=ru_RU&kind=locality`
        )
        .then((response) => {
          const items = response.data.response.GeoObjectCollection.featureMember.map((object: any) => ({value : object.GeoObject.name, label: object.GeoObject.name}));

          setOptions(items);
        })
        .catch((err) => {})
        .finally(()=>{
            setRequested(false);
        })
    }
  }, [requested]);

  const updateSelection = useCallback((selected) => {
    dispatch(fetchLocation(selected[0]));
    setSelectedOptions(selected);
    setInputValue(selected[0]);
  }, [dispatch]);

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Найдите город"
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="inkLighter" />}
      placeholder="Поиск"
    />
  );

  return (
    <Autocomplete
      options={options}
      selected={selectedOptions}
      onSelect={updateSelection}
      textField={textField}
    />
  );
}

export default CityAutocomplete;
