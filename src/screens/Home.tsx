import { Alert, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useQuery } from '../libs/realm'

import { HomeHeader } from "../components/HomeHeader";
import { CarStatus } from "../components/CarStatus";
import { Historic } from "../libs/realm/schemas/Historic";
import { useEffect, useState } from "react";


export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const { navigate } = useNavigation()

  const historic = useQuery(Historic)

  function handleRegisterMovement() {
    navigate('departure')
  }

  function fetchVehicle() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      Alert.alert('Veículo em uso', 'Não foi possível buscar o veículo em uso.')
      console.log(error)
    }
  }

  useEffect(() => {
    fetchVehicle()
  }, [])

  return (
    <View className="flex-1 bg-gray-800">
      <HomeHeader />

      <View className="flex-1 px-8">
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />
      </View>
    </View>
  );
}