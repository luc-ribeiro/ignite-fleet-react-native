import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { IconProps } from 'phosphor-react-native';

export type IconBoxProps = (props: IconProps) => JSX.Element;

type Props = TouchableOpacityProps & {
  icon: IconBoxProps;
}

export function ButtonIcon({ icon: Icon, ...rest }: Props) {

  return (
    <TouchableOpacity className='h-14 w-14 rounded-md items-center justify-center bg-gray-600' activeOpacity={0.7} {...rest}>
      <Icon
        size={24}
        color='#00875F'
      />
    </TouchableOpacity>
  );
}