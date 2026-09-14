import { Capacitor, CapacitorHttp } from '@capacitor/core';

const API_URL = import.meta.env.VITE_API_URL;

export async function apiPost<TResponse, TBody>(path: string, body: TBody): Promise<TResponse> {
  const url = `${API_URL}${path}`;

  if (Capacitor.isNativePlatform()) {
    const response = await CapacitorHttp.post({
      url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: body
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.data?.message || 'Error en la solicitud');
    }

    return response.data as TResponse;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || 'Error en la solicitud');
  }

  return response.json();
}
