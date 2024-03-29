"use client";

import React, { useEffect } from "react";
import { SearchCityForm } from "@/components/SearchCityForm";
import { WeatherCard } from "@/components/WeatherCard";
import { MainContainer } from "@/components/MainContainer";
import { useRouter } from "next/navigation";
import { ICity } from "@/interfaces/city.interface";
import { useWeather } from "@/hooks/useWeather";

export function ForecastsTemplate() {
  const { weatherData, isLoading, update, isUpdating, error } = useWeather();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/add-forecast");
  }, [router]);

  const handleCitySelect = (city: ICity | null) => {
    if (city) {
      router.push(
        `/forecasts?lat=${city.lat}&lon=${city.lon}&cityName=${city.name}&shortName=${city.shortName}`,
      );
    } else {
      router.push(`/add-forecast`);
    }
  };

  return (
    <MainContainer>
      <SearchCityForm onSelect={handleCitySelect} />
      <WeatherCard loading={isLoading} error={error}>
        {weatherData && (
          <>
            <WeatherCard.Header>
              <WeatherCard.CityName>
                {weatherData.cityName}
              </WeatherCard.CityName>
              <WeatherCard.WeatherUpdate
                onClick={update}
                isUpdating={isUpdating}
              />
            </WeatherCard.Header>
            <WeatherCard.Temperature
              temperature={weatherData.temperature}
              description={weatherData.weatherDescription}
            />
            <WeatherCard.Footer>
              <WeatherCard.WeatherInfo
                windSpeed={weatherData.windSpeed}
                windDirection={weatherData.windDirection}
              />
              {weatherData.icon && <WeatherCard.Icon icon={weatherData.icon} />}
            </WeatherCard.Footer>
          </>
        )}
      </WeatherCard>
    </MainContainer>
  );
}
