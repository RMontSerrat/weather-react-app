'use client'

import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import { CardContainer, CardContentContainer, FlexContainer, Temperature, Subtitle, IconContainer } from './WeatherCard.styles';
import Typography from "@mui/material/Typography";
import { getWeatherCodes, formatTime } from '@/utils';
import { IconType } from "react-icons";
import { WiStrongWind } from "react-icons/wi";
import { CircularProgress } from "@mui/material";

interface WeatherCardProps {
  weatherId?: number;
  cityName?: string;
  temperature?: number;
  speed?: number;
  time?: string;
  loading: boolean;
  isDay?: boolean;
}

interface WeatherInfo {
  id: number;
  name: string;
  title: string;
  icon: IconType;
}

export default function WeatherCard({ weatherId, loading, isDay, cityName, temperature, speed, time }: WeatherCardProps) {
  const weatherInfo: WeatherInfo | undefined = useMemo(() => {
    return getWeatherCodes(weatherId || 0, !!isDay);
  }, [weatherId, isDay]);

  const Icon = weatherInfo?.icon;

  return (
    <CardContainer>
      <CardContentContainer>
        {loading && <CircularProgress />}
        {!loading && (
          <>
            <FlexContainer>
              <Typography variant="h6">
                {cityName}
              </Typography>
              <Typography variant="h6">
                {!!time && formatTime(time)}
              </Typography>
            </FlexContainer>
            <Box>
              <Temperature variant="h2">
                {temperature}°C
              </Temperature>
              <Subtitle variant="subtitle1">
                {weatherInfo?.title}
              </Subtitle>
            </Box>
            <FlexContainer>
              <IconContainer>
                <WiStrongWind size={30} />
                <Typography variant="h6">
                  {speed}km/h
                </Typography>
              </IconContainer>
              <IconContainer>
                {Icon && <Icon size={100} />}
              </IconContainer>
            </FlexContainer>
          </>
        )}
      </CardContentContainer>
    </CardContainer>
  );
}

