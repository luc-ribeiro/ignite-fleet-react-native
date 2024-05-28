import { IconProps } from 'phosphor-react-native';
import { View } from 'react-native';

export type IconBoxProps = (props: IconProps) => JSX.Element;

type SizeProps = 'SMALL' | 'NORMAL'

type Props = {
  size?: SizeProps;
  icon: IconBoxProps
}

export function IconBox({ icon: Icon, size = 'NORMAL' }: Props) {
  const iconSize = size === 'NORMAL' ? 24 : 28

  const viewSize = size === 'NORMAL' ? 4 : 2

  return (
    <View className={`rounded-md bg-gray-700 justify-center items-center mr-3 p-${viewSize}`}>
      <Icon size={iconSize} color='#00B37E' />
    </View>
  );
}