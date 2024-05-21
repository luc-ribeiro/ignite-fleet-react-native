import { TouchableOpacity, TouchableOpacityProps, View, Text } from 'react-native';

import { Check, ClockClockwise } from 'phosphor-react-native';

export type HistoricCardProps = {
  id: string;
  licensePlate: string;
  created: string;
  isSync: boolean;
}

type Props = TouchableOpacityProps & {
  data: HistoricCardProps;
}

export function HistoricCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity className='w-100 bg-gray-700 py-5 px-4 flex-row justify-between items-center rounded-md mb-3' {...rest}>
      <View className="flex-1">
        <Text className="text-white text-md font-bold">
          {data.licensePlate}
        </Text>

        <Text className="text-gray-200 text-xs font-regular mt-1">
          {data.created}
        </Text>
      </View>

      {
        data.isSync ?
          <Check 
            size={24}
            color="#00B37E"
          /> 
          :
          <ClockClockwise 
            size={24}
            color='#7C7C8A'
          />
      }

    </TouchableOpacity>
  );
}