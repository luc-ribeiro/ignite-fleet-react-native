import { useEffect, useRef, useState } from 'react';
import { View, TextInput, ScrollView, Alert, Text } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForegroundPermissions } from 'expo-location';

import { useNavigation } from '@react-navigation/native';

import { useRealm } from '../libs/realm';
import { Historic } from '../libs/realm/schemas/Historic';
import { useUser } from '@realm/react';

import { LicencePlateInput } from "../components/LicensePlateInput";
import { TextAreaInput } from "../components/TextAreaInput";
import { Header } from "../components/Header";
import { Button } from '../components/Button'

import { licencePlateValidate } from '../utils/licensePlateValidate';

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const [locationForegroundPermission, requestLocationForegroundPermission] = useForegroundPermissions()

  const { goBack } = useNavigation()
  const realm = useRealm()
  const user = useUser()

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    try {
      if (!licencePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()
        return Alert.alert('Placa inválida', 'Por favor, insira uma placa válida.')
      }

      if (description.trim().length === 0) {
        descriptionRef.current?.focus()
        return Alert.alert('Finalidade inválida', 'Por favor, informe a finalidade da utilização do veículo.')
      }

      setIsRegistering(true)

      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user!.id,
          license_plate: licensePlate.toUpperCase(),
          description
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

  if (!locationForegroundPermission?.granted) {
    return (
      <View className="flex-1 bg-gray-800">
        <Header title="Saída" />

        <Text className="text-white font-regular text-center m-6">Você precisa permitir que o aplicativo tenha acesso a localização para utilizar essa funcionalidade. Por favor, acesse as configurações do seu dispositivo para conceder essa permissão ao aplicativo.</Text>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-gray-800">
      <Header title="Saída" />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <View className="flex-1 p-6 pt-10 gap-y-4">
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