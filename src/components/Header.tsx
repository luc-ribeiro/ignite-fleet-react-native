import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string
}


export function Header({ title }: Props) {
  const insets = useSafeAreaInsets()
  const { goBack } = useNavigation()

  const paddingTop = insets.top + 42

  return (
    <View style={{ paddingTop }} className="w-100 px-8 pb-6 flex-row justify-between bg-gray-700">

      <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
        <ArrowLeft size={24} weight="bold" color="#00B37E" />
      </TouchableOpacity>

      <Text className="text-gray-100 text-xl font-bold">{title}</Text>

    </View>
  )
}