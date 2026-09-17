import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

export type DeviceLocation = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
};

export async function requestCurrentLocation(): Promise<DeviceLocation> {
  if (!Capacitor.isNativePlatform()) {
    return requestBrowserLocation();
  }

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

function requestBrowserLocation(): Promise<DeviceLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Tu navegador no soporta ubicación'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy ?? null
        });
      },
      () => {
        reject(new Error('Permiso de ubicación denegado'));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
}
