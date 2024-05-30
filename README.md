<div align="center">
  <h1>Ignite Fleet</h1>
</div>

<div align="right">
  Clique <a href="https://github.com/luc-ribeiro/ignite-fleet-react-native/blob/main/README-PTBR.md">aqui</a> para ver a versão em português.
</div>

## 📄 Project

An app that allows users to track their vehicle's departure and arrival history. It includes features such as social login with Google, geolocation, and offline and remote database synchronization.

## 💻 Techs

- **React Native**
- **TypeScript**
- **Expo**
- **Offline and Remote Database with RealmDB**
- **Geolocation with Google Maps**
- **Social login with Google**
- **Expo Task Manager**
- **Expo Location**
- **AsyncStorage**
- **DayJS**

## 🔖 Layout 
![Capa](https://github.com/luc-ribeiro/ignite-fleet-react-native/assets/69688077/9fef128a-4699-4153-a01b-90b595f397a9)

## 🚀 Running the project

To run this project, you need to:

- Create an Android, iOS and Web auth key on Google Console
- Create a Cluster and App Service on Mongo RealmDB
- Create a Google Maps API key on Google Console
- Setup the auth keys and the Realm App ID on ```.env``` file

```bash
1. Clone this repository
$ git clone https://github.com/luc-ribeiro/ignite-fleet-react-native.git

2. Install dependencies 
$ npm i

3. Create an .env using the .env.example file structure. Use the keys generated before.

4. Run the project:
$ npx expo prebuild
$ npx expo run:android

- With Expo Go open on your device, scan the QR code in the terminal.
Note: You need to have Expo Go installed on your mobile device.
