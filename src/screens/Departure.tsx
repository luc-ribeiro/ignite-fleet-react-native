import { useRef, useState } from 'react';
import { View, TextInput, Platform, KeyboardAvoidingView, ScrollView, Alert } from "react-native";
import { Header } from "../components/Header";
import { LicencePlateInput } from "../components/LicensePlateInput";
import { TextAreaInput } from "../components/TextAreaInput";
import { Button } from '../components/Button'
import { licencePlateValidate } from '../utils/licensePlateValidate';

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')

  const descriptionRef = useRef<TextInput>(null);
  const licensePlateRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    if (!licencePlateValidate(licensePlate)) {
      licensePlateRef.current?.focus()
      return Alert.alert('Placa inválida', 'Por favor, insira uma placa válida.')
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
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}