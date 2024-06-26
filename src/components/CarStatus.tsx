import { Key, Car } from 'phosphor-react-native';
import { View, Text, TouchableOpacityProps, TouchableOpacity } from 'react-native';

type Props = TouchableOpacityProps & {
  licensePlate?: string | null;
}

export function CarStatus({ licensePlate = null, ...rest }: Props) {
  const Icon = licensePlate ? Car : Key
  const message = licensePlate ? `Veículo ${licensePlate} em uso. ` : 'Nenhum veículo em uso. '
  const status = licensePlate ? 'chegada' : 'saída';

  return (
    <TouchableOpacity className="w-100 my-8 rounded-md bg-gray-700 flex-row items-center p-5" {...rest}>
      <View className="w-[77px] h-[77px] rounded-md bg-gray-600 mr-3 justify-center items-center">
        <Icon size={52} color='#00B37E' />
      </View>

      <Text className='text-gray-100 text-sm font-regular flex-1 text-justify' style={{ textAlignVertical: 'center'}}>
        {message}

        <Text className='text-brand-light text-sm font-bold'>
          Clique aqui para registrar a {status}.
        </Text>
      </Text>
    </TouchableOpacity>
  );
}