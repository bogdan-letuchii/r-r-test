import { makeAutoObservable, runInAction } from 'mobx';
import Geolocation from '@react-native-community/geolocation';
import { Platform } from 'react-native';
import { PERMISSIONS, request, RESULTS, check } from 'react-native-permissions';
import type { Location } from '~/shared/types';

export class UserStore {
  location: Location | null = null;
  isLoadingLocation = false;
  locationError: string | null = null;
  permissionGranted = false;

  constructor() {
    makeAutoObservable(this);
  }

  async requestLocationPermission(): Promise<boolean> {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const currentStatus = await check(permission);

      if (currentStatus === RESULTS.GRANTED) {
        runInAction(() => {
          this.permissionGranted = true;
        });
        return true;
      }

      const result = await request(permission);

      runInAction(() => {
        this.permissionGranted = result === RESULTS.GRANTED;
      });

      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Permission request error:', error);
      runInAction(() => {
        this.permissionGranted = false;
        this.locationError = 'Не удалось запросить разрешение на геолокацию';
      });
      return false;
    }
  }

  async getCurrentLocation(): Promise<Location | null> {
    this.isLoadingLocation = true;
    this.locationError = null;

    try {
      const hasPermission = await this.requestLocationPermission();

      if (!hasPermission) {
        runInAction(() => {
          this.locationError = 'Доступ к геолокации запрещен';
          this.isLoadingLocation = false;
        });
        return null;
      }

      try {
        const fastLocation = await this.getLocationWithOptions({
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000,
        });

        if (fastLocation) {
          if (__DEV__) {
            console.log('Got fast location:', fastLocation);
          }
          return fastLocation;
        }
      } catch (fastError) {
        if (__DEV__) {
          console.log(
            'Fast location failed, trying high accuracy...',
            fastError,
          );
        }
      }

      try {
        const accurateLocation = await this.getLocationWithOptions({
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 10000,
        });

        return accurateLocation;
      } catch (accurateError: any) {
        const errorMessage = this.getReadableErrorMessage(accurateError);
        runInAction(() => {
          this.locationError = errorMessage;
          this.isLoadingLocation = false;
        });
        return null;
      }
    } catch (error) {
      runInAction(() => {
        this.locationError =
          error instanceof Error
            ? error.message
            : 'Не удалось получить геолокацию';
        this.isLoadingLocation = false;
      });
      return null;
    }
  }

  private getLocationWithOptions(options: {
    enableHighAccuracy: boolean;
    timeout: number;
    maximumAge: number;
  }): Promise<Location | null> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        position => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          runInAction(() => {
            this.location = location;
            this.isLoadingLocation = false;
          });

          resolve(location);
        },
        error => {
          reject(error);
        },
        options,
      );
    });
  }

  private getReadableErrorMessage(error: any): string {
    const errorCode = error?.code;

    switch (errorCode) {
      case 1:
        return 'Доступ к геолокации запрещен. Разрешите доступ в настройках приложения.';
      case 2:
        return 'Не удалось определить местоположение. Проверьте, включена ли геолокация на устройстве.';
      case 3:
        return 'Не удалось получить координаты. Попробуйте еще раз или проверьте настройки GPS.';
      default:
        return error?.message || 'Не удалось получить геолокацию';
    }
  }

  reset() {
    this.location = null;
    this.isLoadingLocation = false;
    this.locationError = null;
    this.permissionGranted = false;
  }
}
