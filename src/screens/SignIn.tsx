import { useState } from 'react';
import { Alert, ImageBackground, Text } from 'react-native';
import { GoogleSignin} from '@react-native-google-signin/google-signin'
import { Realm, useApp } from '@realm/react';

import backgroundImg from '@assets/background.png';
import { Button } from '../components/Button';
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from '@env';

GoogleSignin.configure({
  scopes: ['email', 'profile'],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID
})

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  
  const app = useApp()

  
  async function handleGoogleSignIn() {
    try {
      setIsAuthenticating(true)

      const { idToken } = await GoogleSignin.signIn()

      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken)

        await app.logIn(credentials)
      } else {
        Alert.alert("Entrar", 'Não foi possível conectar a conta Google')
        setIsAuthenticating(false)
      }

    } catch (error) {
      console.log(error)
      Alert.alert("Entrar", 'Não foi possível conectar a conta Google')
      setIsAuthenticating(false)
    }
  }

  return (
    <ImageBackground className='flex-1 justify-center p-12 bg-gray-800' source={backgroundImg} >
      <Text className='text-brand-light text-xxxl font-bold text-center'>Ignite Fleet</Text>

      <Text className='text-gray-100 text-md font-regular text-center mb-8'>Gestão de uso de veículos</Text>

      <Button title="Entrar com o Google" isLoading={isAuthenticating} onPress={handleGoogleSignIn} />
    </ImageBackground>
  );
}

