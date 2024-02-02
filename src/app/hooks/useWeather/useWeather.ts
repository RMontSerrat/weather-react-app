import useSWR from "swr";
import { useCityParams } from "@/app/hooks/useCityParams";
import { fetchWeather } from "@/app/services/weather.service";
import { IWeather } from "@/app/interfaces/weather.interface";

export const useWeather = () => {
  const { lon, lat, cityName } = useCityParams();

  const urlEndpoint = lat && lon ? { lat, lon } : null;

  const {
    data: weatherData,
    error,
    isLoading,
    mutate,
    isValidating,
  } = useSWR<IWeather>(urlEndpoint, fetchWeather, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });

  const handleUpdate = () => {
    mutate(weatherData, true);
  };

  return {
    cityName: cityName?.split(",")[0],
    weatherData,
    error,
    isLoading,
    update: handleUpdate,
    isUpdating: isValidating,
  };
};