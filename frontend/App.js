import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import NavigationKeys from './util/navigationKeys.js';
import HomeScreen from './telaInicial.js';
import TelaCadastro from './cadastro.js';
import TelaContato from './contato.js';
import TelaLogin from './login.js';
import TelaCadastroPet from './cadastroPet.js';
import TelaPets from './hub.js';
import TelaPet from './telaPet.js';
import TelaRegistros from './registros.js';
import TelaCadastroRegistro from './cadastroRegistro.js';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Início"
        screenOptions={{
          headerTintColor: '#4A1E91',
        }}
      >
        <Stack.Screen
          name={NavigationKeys.Inicio}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={NavigationKeys.CriarConta}
          component={TelaCadastro}
        />
        <Stack.Screen
          name={NavigationKeys.Login}
          component={TelaLogin}
          options={{
            headerTitle: "Entrar",
          }}
        />
        <Stack.Screen
          name={NavigationKeys.Contato}
          component={TelaContato}
        />
        <Stack.Screen
          name={NavigationKeys.CadastroPrimeiroPet}
          component={TelaCadastroPet}
          options={{
            headerLeft: () => null,
            headerTitle: "   Cadastre seu primeiro pet",
          }}
        />
        <Stack.Screen
          name={NavigationKeys.CadastroPet}
          component={TelaCadastroPet}
        />
        <Stack.Screen
          name={NavigationKeys.TelaPets}
          component={TelaPets}
          options={({ navigation }) => ({
            headerLeft: () => null,
            headerTitle: "Meus Pets",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate(NavigationKeys.CadastroPet)}
                style={{ paddingRight: 15 }}
              >
                <Text
                  style={{ fontSize: 19, color: '#4A1E91' }}
                >
                  Cadastrar Pet</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={NavigationKeys.TelaPet}
          component={TelaPet}
        />
        <Stack.Screen
          name={NavigationKeys.Registro}
          component={TelaRegistros}
        />
        <Stack.Screen
          name={NavigationKeys.CadastroRegistro}
          component={TelaCadastroRegistro}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}