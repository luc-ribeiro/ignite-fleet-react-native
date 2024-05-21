import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.7} className="flex-1 min-h-14 max-h-14 p-4 rounded-md items-center justify-center bg-brand-mid" disabled={isLoading} {...rest}>
      {
        isLoading ? (
          <ActivityIndicator className="text-white" />
        ) : (
          <Text className='text-white text-md font-bold'>
            {title}
          </Text>
        )
      }
    </TouchableOpacity>
  )
}