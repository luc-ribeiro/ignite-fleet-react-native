import { Text, TextInput, View, type TextInputProps } from "react-native";
import { forwardRef } from 'react';

type Props = TextInputProps & {
  label: string
}

const TextAreaInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  return (
    <View className="w-100 h-36 p-4 rounded-md bg-gray-700 mt-4">
      <Text className="text-gray-300 text-sm font-regular">
        {label}
      </Text>

      <TextInput ref={ref} className="text-gray-200 text-md font-regular align-top mt-4" autoCapitalize="sentences" placeholderTextColor="#7C7C8A" multiline {...rest} />
    </View>
  )
})

export { TextAreaInput }