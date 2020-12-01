import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../reducers/types';
import {
    Button,
    FormLayout,
    TextField
  } from "@shopify/polaris";
import { fetchLocation } from '../actions';

function CityForm() {
    const dispatch = useDispatch();

    const [searchString, setSearchString] = useState("");
    const {weatherLoading,locationLoading} = useSelector<AppState, AppState>((state) => state);

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
    )
}

export default CityForm
