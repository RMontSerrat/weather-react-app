import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import { useDebounce } from 'use-debounce';
import useSWR from 'swr';
import axios from 'axios';
import { StyledAutocomplete, AutocompleteContainer, TextFieldContainer, BackdropContainer } from './CitySearch.styles';

interface CityProps {
  lat?: number | string;
  lon?: number | string;
  name: string;
}

interface CitySearchProps {
  onSelect: (params: CityProps | null) => void;
}

export default function CitySearch({ onSelect }: CitySearchProps) {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue] = useDebounce(inputValue, 500);
  const [open, setOpen] = useState(false);

  const { data: options = [], error } = useSWR(
    debouncedInputValue === '' ? null : `/api/weather/cities?address=${debouncedInputValue}`,
    (url) => axios.get(url).then((res) => res.data)
  );

  return (
    <>
      <AutocompleteContainer>
        <StyledAutocomplete
          id="city-search"
          options={options}
          open={open && inputValue.length > 0}
          loading={!error && !options.length}
          disableCloseOnSelect={false}
          noOptionsText="Nenhum resultado encontrado"
          loadingText={<span>{inputValue ? 'Carregando...' : 'Digite a cidade'}</span>}
          getOptionLabel={(option: CityProps) => option.name}
          onInputChange={(event, newInputValue: string) => {
            setInputValue(newInputValue);
          }}
          onChange={(event, newValue: CityProps | null) => {
            onSelect(newValue);
          }}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          renderInput={(params) => (
            <TextFieldContainer
              hiddenLabel
              {...params}
              placeholder="Busque por uma cidade"
              variant="outlined"
            />
          )}
        />
      </AutocompleteContainer>
      <BackdropContainer open={open} />
    </>
  );
}