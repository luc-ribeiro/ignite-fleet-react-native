import { View } from "react-native";
import { HomeHeader } from "../../components/HomeHeader";
import { CarStatus } from "../../components/CarStatus";

export function Home() {
  return (
    <View className="flex-1 bg-gray-800">
      <HomeHeader />

      <View className="flex-1 px-8">
        <CarStatus licensePlate="XXX-1234" />
      </View>
    </View>
  );
}