import { useRef, useState } from 'react';
import { View, TextInput, Platform, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { Header } from "../components/Header";
import { LicencePlateInput } from "../components/LicensePlateInput";
import { TextAreaInput } from "../components/TextAreaInput";
import { Button } from '../components/Button'
import { licencePlateValidate } from '../utils/licensePlateValidate';

import { useRealm } from '../libs/realm';
import { Historic } from '../libs/realm/schemas/Historic';
import { useUser } from '@realm/react';
import { useNavigation } from '@react-navigation/native';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const {goBack} = useNavigation()
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

  return (
    <View className="flex-1 bg-gray-800">
      <Header title="Saída" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior} >
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
      </KeyboardAvoidingView>
    </View>
  )
}