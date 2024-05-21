import { useRoute } from '@react-navigation/native';

import { View } from "react-native";

type RouteParamsProps = {
  id: string
}

export function Arrival() {
  const route = useRoute()
  const { id } = route.params as RouteParamsProps

  console.log(id)

  return (
    <View className="flex-1 bg-red-500"></View>
  )
}