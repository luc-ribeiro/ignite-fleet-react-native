import { useEffect, useState } from "react";
import { Alert, FlatList, View, Text } from "react-native";
import Toast from "react-native-toast-message";
import { CloudArrowUp } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";

import { Realm, useUser } from "@realm/react";
import { useQuery, useRealm } from '../libs/realm'
import { Historic } from "../libs/realm/schemas/Historic";
import { getLastSyncTimestamp, saveLastSyncTimestamp } from '../libs/asyncStorage/syncStorage';

import { CarStatus } from "../components/CarStatus";
import { HomeHeader } from "../components/HomeHeader";
import { HistoricCard, type HistoricCardProps } from "../components/HistoricCard";

import { TopMessage } from "../components/TopMessage";

export function Home() {
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null)
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([])
  const [percentageToSync, setPercentageToSync] = useState<string | null>(null);

  const { navigate } = useNavigation()

  const historic = useQuery(Historic)
  const user = useUser();
  const realm = useRealm()

  function handleRegisterMovement() {
    if (vehicleInUse?._id) {
      navigate('arrival', { id: vehicleInUse._id.toString() })
    } else {
      navigate('departure')
    }
  }

  function fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status = 'departure'")[0]
      setVehicleInUse(vehicle)
    } catch (error) {
      Alert.alert('Veículo em uso', 'Não foi possível buscar o veículo em uso.')
      console.log(error)
    }
  }

  async function fetchHistoric() {
    try {
      const response = historic.filtered("status = 'arrival' SORT(created_at DESC)")

      const lastSync = await getLastSyncTimestamp();

      const formattedHistoric = response.map(item => {
        return ({
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: lastSync > item.updated_at!.getTime(),
          created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [às] HH:mm'),
        })
      })

      setVehicleHistoric(formattedHistoric)

    } catch (error) {
      console.log(error)
      Alert.alert('Histórico', 'Não foi possível carregar o histórico.')
    }
  }

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id })
  }

  async function progressNotification(transferred: number, transferable: number) {
    const percentage = (transferred / transferable) * 100;

    if (percentage === 100) {
      await saveLastSyncTimestamp();
      await fetchHistoric();
      setPercentageToSync(null);

      Toast.show({
        type: 'info',
        text1: 'Todos os dados estão sincronizados.'
      })
    }

    if (percentage < 100) {
      setPercentageToSync(`${percentage.toFixed(0)}% sincronizado.`)
    }
  }

  useEffect(() => {
    fetchVehicleInUse()
  }, [])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())

    return () => {
      if (realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse)
      }
    }
  }, [])

  useEffect(() => {
    fetchHistoric()
  }, [historic])

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm.objects('Historic').filtered(`user_id = '${user!.id}'`);

      mutableSubs.add(historicByUserQuery, { name: 'historic_by_user' });
    })
  }, [realm]);

  useEffect(() => {
    const syncSession = realm.syncSession

    if (!syncSession) {
      return
    }

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification
    )

    return () => syncSession.removeProgressNotification(progressNotification)
  }, [])

  return (
    <View className="flex-1 bg-gray-800">
      {
        percentageToSync && <TopMessage title={percentageToSync} icon={CloudArrowUp} />
      }

      <HomeHeader />

      <View className="flex-1 px-8">
        <CarStatus
          licensePlate={vehicleInUse?.license_plate}
          onPress={handleRegisterMovement}
        />

        <Text className="text-white text-md font-bold mb-3">
          Histórico
        </Text>

        <FlatList
          data={vehicleHistoric}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoricCard data={item}
              onPress={() => handleHistoricDetails(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            (<Text className="text-gray-400 text-sm font-regular mt-8 text-center">
              Nenhum registro de utilização.
            </Text>)
          }
        />
      </View>
    </View>
  );
}