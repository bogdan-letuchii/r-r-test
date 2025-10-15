import { makeAutoObservable, runInAction } from 'mobx';
import type { Shift, Location } from '~/shared/types';
import { shiftsApi } from '../api';

export class ShiftStore {
  shifts: Shift[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadShifts(location: Location) {
    this.isLoading = true;
    this.error = null;

    try {
      // TODO: Remove hardcoded coordinates in production
      if (__DEV__) {
        location.latitude = 55.756629;
        location.longitude = 37.623115;
      }

      const shifts = await shiftsApi.getShifts(location);

      if (__DEV__) {
        console.log('Shifts received in store:', shifts);
        console.log('Number of shifts:', shifts?.length);
        console.log('First shift:', shifts?.[0]);
      }

      runInAction(() => {
        this.shifts = shifts;
        this.isLoading = false;
        if (__DEV__) {
          console.log('Shifts set in store:', this.shifts.length);
        }
      });
    } catch (error) {
      runInAction(() => {
        this.error =
          error instanceof Error ? error.message : 'Failed to load shifts';
        this.isLoading = false;
      });
    }
  }

  getShiftById(id: string): Shift | undefined {
    return this.shifts.find(shift => shift.id === id);
  }

  reset() {
    this.shifts = [];
    this.isLoading = false;
    this.error = null;
  }
}
