import { View, Text } from "react-native";
import type { IconBoxProps } from "./ButtonIcon";
import { IconBox } from "./IconBox";

export type LocationInfoProps = {
  label: string;
  description: string
}

type Props = LocationInfoProps & {
  icon: IconBoxProps
}

export function LocationInfo({ icon, label, description }: Props) {
  return (
    <View className="w-100 flex-row items-center my-3">
      <IconBox icon={icon} />

      <View className="flex-1">
        <Text className="text-gray-300 text-sm font-regular" numberOfLines={1}>
          {label}
        </Text>

        <Text className="text-gray-100 text-sm font-regular" numberOfLines={1}>
          {description}
        </Text>
      </View>
    </View>
  );
}