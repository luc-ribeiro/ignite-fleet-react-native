import { useEffect, useRef, useState } from 'react';
import { View, TextInput, ScrollView, Alert, Text } from "react-native";
import { CarSimple } from 'phosphor-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  useForegroundPermissions,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  LocationObjectCoords,
  requestBackgroundPermissionsAsync
} from 'expo-location';

import { useNavigation } from '@react-navigation/native';

import { useRealm } from '../libs/realm';
import { Historic } from '../libs/realm/schemas/Historic';
import { useUser } from '@realm/react';

import { LicencePlateInput } from "../components/LicensePlateInput";
import { TextAreaInput } from "../components/TextAreaInput";
import { Header } from "../components/Header";
import { Button } from '../components/Button'
import { Loading } from '../components/Loading';
import { LocationInfo } from '../components/LocationInfo';
import { Map } from '../components/Map'

import { licencePlateValidate } from '../utils/licensePlateValidate';
import { getAddressLocation } from '../utils/getAddressLocation';
import { startLocationTask } from '../tasks/backgroundLocationTask';

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords | null>(null)

  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions()

  const { goBack } = useNavigation()
  const realm = useRealm()
  const user = useUser()

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  async function handleDepartureRegister() {
    try {
      if (!licencePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()
        return Alert.alert('Placa inválida', 'Por favor, insira uma placa válida.')
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus()
        return Alert.alert('Finalidade inválida', 'Por favor, informe a finalidade da utilização do veículo.')
      }

      if (!currentCoords?.latitude && !currentCoords?.longitude) {
        return Alert.alert('Localização', 'Não foi possível obter a localização atual. Tente novamente.')
      }

      setIsRegistering(true)

      const backgroundPermissions = await requestBackgroundPermissionsAsync()

      if (!backgroundPermissions.granted) {
        setIsRegistering(false)
        return Alert.alert('Localização', 'É necessário permitir que o App tenha acesso localização em segundo plano. Acesse as configurações do dispositivo e habilite "Permitir o tempo todo."')
      }

      await startLocationTask();

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user!.id,
          license_plate: licensePlate.toUpperCase(),
          description,
          coords: [{
            latitude: currentCoords.latitude,
            longitude: currentCoords.longitude,
            timestamp: new Date().getTime()
          }]
        }))
      })

      Alert.alert('Sucesso', 'Saída registrada com sucesso.')
      goBack()

    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível registrar a saída. Tente novamente mais tarde.')
      setIsRegistering(false)
    }
  }

  useEffect(() => {
    requestLocationForegroundPermission()
  }, [])

  useEffect(() => {
    if (!locationForegroundPermission?.granted) {
      return
    }

    let subscription: LocationSubscription

    watchPositionAsync({
      accuracy: LocationAccuracy.High,
      timeInterval: 1000
    }, (location) => {
      setCurrentCoords(location.coords)
      getAddressLocation(location.coords)
        .then(address => {
          if (address) {
            setCurrentAddress(address)
          }
        })
        .finally(() => setIsLoadingLocation(false))
    }).then(response => subscription = response)

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [locationForegroundPermission])

  if (!locationForegroundPermission?.granted) {
    return (
      <View className="flex-1 bg-gray-800">
        <Header title="Saída" />

        <Text className="text-white font-regular text-center m-6">Você precisa permitir que o aplicativo tenha acesso a localização para utilizar essa funcionalidade. Por favor, acesse as configurações do seu dispositivo para conceder essa permissão ao aplicativo.</Text>
      </View>
    )
  }

  if (isLoadingLocation) {
    return (
      <Loading />
    )
  }

  return (
    <View className="flex-1 bg-gray-800">
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          {currentCoords && <Map coordinates={[currentCoords]} />}

          <View className="flex-1 p-6 pt-10 gap-y-4">
            {
              currentAddress &&
              <LocationInfo
                icon={CarSimple}
                label='Localização atual'
                description={currentAddress}
              />
            }


            <LicencePlateInput
              ref={licensePlateRef}
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => {
                descriptionRef.current?.focus()
              }}
              returnKeyType='next'
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder='Vou utilizar o veículo para...'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button
              title='Registar Saída'
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  )
}