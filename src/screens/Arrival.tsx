import { useRoute } from '@react-navigation/native';

import { View, Text } from "react-native";
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ButtonIcon } from '../components/ButtonIcon';
import { X } from 'phosphor-react-native';

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  console.log(id)

  return (
    <View className="flex-1 bg-gray-800">
      <Header title="Chegada" />
      <View className='grow p-8'>
        <Text className="text-gray-300 text-sm font-regular mt-8 mb-1">Placa do veículo</Text>

        <Text className="text-gray-100 text-xxxl font-bold">XXX0000</Text>

        <Text className="text-gray-300 text-sm font-regular mt-8 mb-1">Finalidade</Text>

        <Text className="text-gray-100 text-md font-regular text-justify">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa voluptate atque necessitatibus voluptatibus eveniet rerum maiores neque laborum obcaecati eos debitis deleniti tempore veritatis, voluptates modi, optio ullam quasi dolor!</Text>

        <View className='w-100 flex-row gap-4 mt-8'>
          <ButtonIcon icon={X} />

          <Button title='Registrar chegada' />
        </View>
      </View>
    </View>
  )
}