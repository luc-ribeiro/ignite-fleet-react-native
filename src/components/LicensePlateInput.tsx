import { Text, TextInput, View, type TextInputProps } from "react-native";

type Props = TextInputProps & {
  label: string
}

export function LicencePlateInput({ label, ...rest }: Props) {
  return (
    <View className="w-100 p-4 rounded-md bg-gray-700">
      <Text className="text-gray-300 text-sm font-regular">
        {label}
      </Text>

      <TextInput className="text-gray-200 text-xxxl font-bold text-center mt-4" placeholder="AAA-0000" maxLength={7} autoCapitalize="characters" placeholderTextColor="#7C7C8A" {...rest} />

    </View>
  )
}