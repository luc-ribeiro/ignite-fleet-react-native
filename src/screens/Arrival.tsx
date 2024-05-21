import { useNavigation, useRoute } from '@react-navigation/native';
import { X } from 'phosphor-react-native';

import { BSON } from 'realm';
import { useObject, useRealm } from '../libs/realm';
import { Historic } from '../libs/realm/schemas/Historic';

import { View, Text, Alert } from "react-native";

import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ButtonIcon } from '../components/ButtonIcon';

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  const historic = useObject(Historic, new BSON.UUID(id))
  const { goBack } = useNavigation()
  const realm = useRealm()

  function handleRemoveVehicleUsage() {
    Alert.alert('Cancelar', 'Cancelar a utilização do veículo?', [
      { text: "Não", style: 'cancel' },
      { text: "Sim", onPress: () => removeVehicleUsage() }
    ])
  }

  function removeVehicleUsage() {
    realm.write(() => {
      realm.delete(historic)
    })
    goBack()
  }

  return (
    <View className="flex-1 bg-gray-800">
      <Header title="Chegada" />
      <View className='grow p-8'>
        <Text className="text-gray-300 text-sm font-regular mt-8 mb-1">Placa do veículo</Text>

        <Text className="text-gray-100 text-xxxl font-bold">{historic?.license_plate}</Text>

        <Text className="text-gray-300 text-sm font-regular mt-8 mb-1">Finalidade</Text>

        <Text className="text-gray-100 text-md font-regular text-justify">{historic?.description}</Text>

        <View className='w-100 flex-row gap-4 mt-8'>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUsage} />

          <Button title='Registrar chegada' />
        </View>
      </View>
    </View>
  )
}