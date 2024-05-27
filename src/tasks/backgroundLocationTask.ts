import {
  Accuracy,
  hasStartedLocationUpdatesAsync,
  startLocationUpdatesAsync, 
  stopLocationUpdatesAsync
} from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { saveStorageLocation, removeStorageLocation } from '../libs/asyncStorage/locationStorage';

export const BACKGROUND_TASK_NAME = 'location-tracking';

TaskManager.defineTask(BACKGROUND_TASK_NAME, async ({ data, error }: any) => {
  try {
    if (error) {
      throw error
    }

    console.log('DATA =>', data)

    if (data) {
      const { coords, timestamp } = data.locations[0];

      const currentLocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        timestamp
      }

      console.log('CURRENT LOCATION =>', currentLocation)

      await saveStorageLocation(currentLocation)
    }

  } catch (error) {
    console.log(error)
    stopLocationTask()
  }
})

export async function startLocationTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)

    console.log('hasStarted Antes => ', hasStarted)


    if (hasStarted) {
      await stopLocationTask()
    }

    console.log('hasStarted Depois => ', hasStarted)

    await startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Accuracy.Highest,
      distanceInterval: 1,
      timeInterval: 1000
    })

  console.log('Chegou aqui startLocationUpdatesAsync')


  } catch (error) {
    console.log(error)
  }

}

export async function stopLocationTask() {
  try {
    const hasStarted = await hasStartedLocationUpdatesAsync(BACKGROUND_TASK_NAME)

    if (hasStarted) {
      await stopLocationUpdatesAsync(BACKGROUND_TASK_NAME)
      await removeStorageLocation()
    }
  } catch (error) {
    console.log(error)
  }
}