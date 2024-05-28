<div align="center">
  <h1>Ignite Fleet</h1>
</div>

<div align="right">
  Click <a href="https://github.com/luc-ribeiro/ignite-fleet-react-native/blob/main/README.md">here</a> to view the english version.
</div>

## 📄 Projeto

Um aplicativo que permite aos usuários rastrear o histórico de partidas e chegadas de seus veículos. Inclui recursos como login social com Google, geolocalização e sincronização de banco de dados offline e remoto.

## 💻 Tecnologias

- **React Native**
- **TypeScript**
- **Expo**
- **Banco de dados offline e remoto com RealmDB**
- **Geolocalização com Google Maps**
- **Login social com Google**
- **Expo Task Manager**
- **Expo Location**
- **AsyncStorage**
- **DayJS**

## 🔖 Layout 

![Capa](https://github.com/luc-ribeiro/ignite-fleet-react-native/assets/69688077/9fef128a-4699-4153-a01b-90b595f397a9)

## 🚀 Executando o projeto

Para executar este projeto, você precisa:

- Criar uma chave de autenticação para Android, iOS e Web no Google Console
- Criar um Cluster e um App Service no Mongo RealmDB
- Criar uma chave de API do Google Maps no Google Console
- Configurar as chaves de autenticação e o ID do App Realm no arquivo ```.env```

```bash
1. Clone este repositório
$ git clone https://github.com/luc-ribeiro/ignite-fleet-react-native.git

2. Instale as dependências 
$ npm i

3. Crie um arquivo .env usando a estrutura do arquivo .env.example. Use as chaves geradas anteriormente.

4. Execute o projeto:
$ npx expo prebuild
$ npx expo run:android

- Com o Expo Go aberto em seu dispositivo, escaneie o QR code no terminal.
OBS: É preciso ter o Expo Go instalado em seu dispositivo móvel.
```
