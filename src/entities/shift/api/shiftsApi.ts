import type { Location, Shift } from '~/shared/types';

const API_BASE_URL = 'https://mobile.handswork.pro/api';

export class ShiftsApi {
  async getShifts(location: Location): Promise<Shift[]> {
    try {
      const url = `${API_BASE_URL}/shifts/map-list-unauthorized?latitude=${location.latitude}&longitude=${location.longitude}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (__DEV__) {
        console.log('API Response:', JSON.stringify(data, null, 2));
      }

      // API возвращает данные в поле data
      if (Array.isArray(data)) {
        return data;
      }

      if (data.data && Array.isArray(data.data)) {
        return data.data;
      }

      return data.shifts || [];
    } catch (error) {
      console.error('Failed to fetch shifts:', error);
      throw error;
    }
  }
}

export const shiftsApi = new ShiftsApi();
