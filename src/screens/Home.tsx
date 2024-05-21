import { View } from "react-native";
import { HomeHeader } from "../components/HomeHeader";
import { CarStatus } from "../components/CarStatus";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const { navigate } = useNavigation()

  function handleRegisterMovement() {
    navigate('departure')
  }

  return (
    <View className="flex-1 bg-gray-800">
      <HomeHeader />

      <View className="flex-1 px-8">
        <CarStatus onPress={handleRegisterMovement}/>
      </View>
    </View>
  );
}