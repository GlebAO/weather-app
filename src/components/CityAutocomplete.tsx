import { Autocomplete, Icon } from '@shopify/polaris';
import React, { useCallback, useState } from 'react';
import {SearchMinor} from '@shopify/polaris-icons';

function CityAutocomplete() {
    const deselectedOptions = [
        {value: 'rustic', label: 'Rustic'},
        {value: 'antique', label: 'Antique'},
        {value: 'vinyl', label: 'Vinyl'},
        {value: 'vintage', label: 'Vintage'},
        {value: 'refurbished', label: 'Refurbished'},
      ];
      
      const [selectedOptions, setSelectedOptions] = useState([]);
      const [inputValue, setInputValue] = useState('');
      const [options, setOptions] = useState(deselectedOptions);
    
      const updateText = useCallback(
        (value) => {
          setInputValue(value);
    
          if (value === '') {
            setOptions(deselectedOptions);
            return;
          }
    
          const filterRegex = new RegExp(value, 'i');
          const resultOptions = deselectedOptions.filter((option) =>
            option.label.match(filterRegex),
          );
          setOptions(resultOptions);
        },
        [deselectedOptions],
      );
    
      const updateSelection = useCallback((selected) => {
        const selectedValue = selected.map((selectedItem:any) => {
          const matchedOption = options.find((option) => {
            return option.value.match(selectedItem);
          });
          return matchedOption && matchedOption.label;
        });
    
        setSelectedOptions(selected);
        setInputValue(selectedValue);
      }, []);
    
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

export default CityAutocomplete
