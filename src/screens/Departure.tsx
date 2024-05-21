import { View } from "react-native";
import { Header } from "../components/Header";
import { LicencePlateInput } from "../components/LicensePlateInput";


export function Departure() {
  return (
    <View className="flex-1 bg-gray-800">
      <Header title="Saída" />

      <View className="flex-1 p-6 mt-4">
        <LicencePlateInput
          label="Placa do veículo"
          placeholder="BRA1234"
        />
      </View>
    </View>
  )
}