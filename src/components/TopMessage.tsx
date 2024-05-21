import { Dimensions, View, Text } from 'react-native';
import { IconProps } from 'phosphor-react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IconBoxProps = (props: IconProps) => JSX.Element;

type Props = {
  icon?: IconBoxProps;
  title: string;
}

export function TopMessage({ title, icon: Icon }: Props) {
  const dimensions = Dimensions.get('window')

  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 5;


  return (
    <View style={{ paddingTop, width: dimensions.width }} className='absolute z-10 bg-gray-500 pb-1 flex-row items-center justify-center'>
      {
        Icon &&
        <Icon
          size={12}
          color='#E1E1E6'
        />
      }

      <Text className='text-gray-100 text-sm font-regular ml-1'>{title}</Text>
    </View>
  );
}