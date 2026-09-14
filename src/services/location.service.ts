import { Geolocation } from '@capacitor/geolocation';

export type DeviceLocation = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
};

export async function requestCurrentLocation(): Promise<DeviceLocation> {
  const permission = await Geolocation.requestPermissions();

  if (permission.location !== 'granted') {
    throw new Error('Permiso de ubicación denegado');
  }

  const position = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 10000
  });

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy ?? null
  };
}