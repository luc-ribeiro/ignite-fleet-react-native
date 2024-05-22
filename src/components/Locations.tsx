import { Car, FlagCheckered } from 'phosphor-react-native'

import { LocationInfo, LocationInfoProps } from './LocationInfo'
import { View } from 'react-native';

type Props = {
  departure: LocationInfoProps,
  arrival: LocationInfoProps
}

export function Locations({ arrival, departure }: Props) {
  return (
    <View className="w-100">
      <LocationInfo 
        icon={Car}
        label={departure.label}
        description={departure.description}
      />

      <View className='h-16 w-0.5 -m-0.5 ml-6 border border-l-gray-400' />

      <LocationInfo 
        icon={FlagCheckered}
        label={arrival.label}
        description={arrival.description}
      />
    </View>
  );
}