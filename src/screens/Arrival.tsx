import { useEffect, useState } from 'react';
import { View, Text, Alert } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import { BSON } from 'realm';
import { X } from 'phosphor-react-native';
import type { LatLng } from 'react-native-maps';
import dayjs from 'dayjs';

import { useObject, useRealm } from '../libs/realm';
import { Historic } from '../libs/realm/schemas/Historic';
import { getLastSyncTimestamp } from '../libs/asyncStorage/syncStorage';
import { getStorageLocation } from '../libs/asyncStorage/locationStorage';

import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ButtonIcon } from '../components/ButtonIcon';
import { Map } from '../components/Map';
import { Locations } from '../components/Locations';
import { LocationInfoProps } from '../components/LocationInfo';

import { getAddressLocation } from '../utils/getAddressLocation';

import { stopLocationTask } from '../tasks/backgroundLocationTask';
import { Loading } from '../components/Loading';

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const [dataNotSynced, setDataNotSynced] = useState(false);
  const [coordinates, setCoordinates] = useState<LatLng[]>([])
  const [departure, setDeparture] = useState<LocationInfoProps>({} as LocationInfoProps)
  const [arrival, setArrival] = useState<LocationInfoProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  const historic = useObject(Historic, new BSON.UUID(id))
  const { goBack } = useNavigation()
  const realm = useRealm()

  const title = historic?.status === 'departure' ? 'Chegada' : 'Detalhes'

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: "Não", style: 'cancel' },
      { text: "Sim", onPress: () => removeVehicleUsage() }
    ])
  }

  async function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })

    await stopLocationTask()

    goBack()
  }

  async function handleArrivalRegister() {
    try {
      if (!historic) {
        return Alert.alert('Error', 'Não foi possível obter os dados para registrar a chegada do veículo.')
      }

      const locations = await getStorageLocation()

      realm.write(() => {
        historic.status = 'arrival'
        historic.updated_at = new Date()
        historic.coords.push(...locations)
      })

      await stopLocationTask()

      Alert.alert('Chegada', 'Chegada registrada com sucesso!')
      goBack()

    } catch (error) {
      Alert.alert('Error', 'Não foi possível registrar a chegada do veículo.')
    }
  }

  async function getLocationsInfo() {
    if (!historic) {
      return
    }

    const lastSync = await getLastSyncTimestamp();
    const updatedAt = historic!.updated_at.getTime();
    setDataNotSynced(updatedAt > lastSync);

    if (historic?.status === 'departure') {
      const locationsStorage = await getStorageLocation();
      setCoordinates(locationsStorage);
    } else {
      const coords = historic?.coords.map((coord) => {
        return {
          latitude: coord.latitude,
          longitude: coord.longitude
        }
      })
      setCoordinates(coords ?? []);
    }

    if (historic?.coords[0]) {
      const departureStreetName = await getAddressLocation(historic?.coords[0])

      setDeparture({
        label: `Saindo em ${departureStreetName ?? ''}`,
        description: dayjs(new Date(historic?.coords[0].timestamp)).format('DD/MM/YYYY [às] HH:mm')
      })
    }

    if (historic?.status === 'arrival') {
      const lastLocation = historic.coords[historic.coords.length - 1];
      const arrivalStreetName = await getAddressLocation(lastLocation)

      setArrival({
        label: `Chegando em ${arrivalStreetName ?? ''}`,
        description: dayjs(new Date(lastLocation.timestamp)).format('DD/MM/YYYY [às] HH:mm')
      })

      setIsLoading(false)
    }
  }

  useEffect(() => {
    getLocationsInfo()
  }, [historic])

  if (isLoading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-gray-800">
      <Header title={title} />

      {coordinates.length > 0 && (
        <Map coordinates={coordinates} />
      )}

      <View className='grow p-8'>
        <Locations
          departure={departure}
          arrival={arrival}
        />

        <Text className="text-gray-300 text-sm font-regular mt-8 mb-1">Placa do veículo</Text>

        <Text className="text-gray-100 text-xxxl font-bold">{historic?.license_plate}</Text>

        <Text className="text-gray-300 text-sm font-regular mt-8 mb-1">Finalidade</Text>

        <Text className="text-gray-100 text-md font-regular text-justify">{historic?.description}</Text>
      </View>

      {
        historic?.status === 'departure' &&
        (
          <View className='w-100 flex-row gap-4 mt-8 p-8'>
            <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />

            <Button title='Registrar chegada' onPress={handleArrivalRegister} />
          </View>
        )
      }

      {
        dataNotSynced &&
        <Text className='text-gray-300 text-sm font-regular text-center flex-1 m-8'>
          Sincronização da {historic?.status === 'departure' ? "partida" : "chegada"} pendente
        </Text>
      }
    </View>
  )
}