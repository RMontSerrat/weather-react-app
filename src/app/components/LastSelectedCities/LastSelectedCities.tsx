import React, { useState } from 'react';
import { ICity } from '@/app/interfaces/city.interface';
import { Typography } from '@mui/material';
import { GoClock } from "react-icons/go";
import { Container, Card, Item, Title } from './LastSelectedCities.styles'
import { useLastSelectedCities } from '@/app/hooks/useLastSelectedCities/useLastSelectedCities';

interface LastSelectedCitiesProps {
  onSelect: (city: ICity) => void;
}

export function LastSelectedCities({ onSelect }: LastSelectedCitiesProps) {
  const { lastSelectedCities } = useLastSelectedCities();

  const handleCitySelect = (city: ICity) => {
    onSelect(city);
  };

  if (!lastSelectedCities.length) {
    return null;
  }

  return (
    <Card>
      <Title variant="body1" color="GrayText">Buscas recentes</Title>
      <Container>
        {lastSelectedCities.map((city) => (
          <Item key={city.name} onClick={() => handleCitySelect(city)}>
            <GoClock />
            <Typography variant="body1">{city.name}</Typography>
          </Item>
        ))}
      </Container>
    </Card>
  );
}
