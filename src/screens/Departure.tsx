import { useRef } from 'react';
import { View, TextInput, Platform, KeyboardAvoidingView, ScrollView } from "react-native";
import { Header } from "../components/Header";
import { LicencePlateInput } from "../components/LicensePlateInput";
import { TextAreaInput } from "../components/TextAreaInput";
import { Button } from '../components/Button'

const keyboardAvoidingViewBehavior = Platform.OS === 'android' ? 'height' : 'position';

export function Departure() {
  const descriptionRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    console.log('OK!');
  }

  return (

    <View className="flex-1 bg-gray-800">
      <Header title="Saída" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardAvoidingViewBehavior} >
        <ScrollView>
          <View className="flex-1 p-6 pt-10 gap-y-4">
            <LicencePlateInput
              label="Placa do veículo"
              placeholder="BRA1234"
              onSubmitEditing={() => {
                descriptionRef.current?.focus()
              }}
              returnKeyType='next'
            />

            <TextAreaInput
              ref={descriptionRef}
              label="Finalidade"
              placeholder='Vou utilizar o veículo para...'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
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