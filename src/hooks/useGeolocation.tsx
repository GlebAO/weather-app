import { useState, useEffect } from "react";

interface IGeoLocation {
  lat: number;
  lng: number;
}

export const useGeolocation = () => {
  const [position, setPosition] = useState<IGeoLocation | {}>({});
  const [error, setError] = useState<string | null>(null);

  function onChange({ coords: { latitude, longitude } }: GeolocationPosition) {
    setPosition({
      lat: latitude,
      lng: longitude,
    });
  }

  const onError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const defaultSettings = {
      enableHighAccuracy: false,
      timeout: Infinity,
      maximumAge: 0,
    };

    if (!navigator || !navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      onChange,
      onError,
      defaultSettings
    );
  }, []);

  return { ...position, error };
};
