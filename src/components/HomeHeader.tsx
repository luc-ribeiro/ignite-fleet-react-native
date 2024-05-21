import { Text, View, TouchableOpacity } from 'react-native';
import { useUser, useApp } from '@realm/react';
import { Image } from 'expo-image'

import { Power } from 'phosphor-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function HomeHeader() {
  const user = useUser()
  const app = useApp()
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;

  function handleLogout() {
    app.currentUser?.logOut()
  }

  return (
    <View style={{ paddingTop }} className="w-100 p-8 flex-row items-center bg-gray-700">
      <Image
        className='w-[54px] h-[54px] rounded-md'
        source={{ uri: user?.profile.pictureUrl }} placeholder="L184i9ofbHof00ayjsay~qj[ayj@"
      />

      <View className="flex-1 ml-3">
        <Text className="text-gray-100 text-md font-regular">
          Olá
        </Text>

        <Text className="text-gray-100 text-lg font-bold">
          {user?.profile.name}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
        <Power size={32} color="#7C7C8A" />
      </TouchableOpacity>


    </View>
  );
}