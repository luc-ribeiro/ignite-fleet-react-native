import { StatusBar } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { AppProvider, UserProvider, RealmProvider } from '@realm/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { REALM_APP_ID } from '@env';

import { Routes } from './src/routes';

import { SignIn } from "./src/screens/SignIn";
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <AppProvider id={String(REALM_APP_ID)}>
      <SafeAreaProvider className='flex-1 bg-gray-800'>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <UserProvider fallback={SignIn}>
            <Routes />
        </UserProvider>
        </SafeAreaProvider>
    </AppProvider>
  );
}
