import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './telaInicial.js';
import TelaCadastro from './cadastro.js';
import TelaContato from './contato.js';
import TelaLogin from './login.js';
import TelaAvisoPet from './avisoSemPet.js';
import TelaCadastroPet from './cadastroPet.js';
import TelaPets from './hub.js';
import TelaPet from './telaPet.js';

const Stack = createStackNavigator();

export default function App({ routes }) {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Início"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#B8E8FC',
          },
        }}
      >
        <Stack.Screen
          name="Início"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Criar Conta"
          component={TelaCadastro}
        />
        <Stack.Screen
          name="Login"
          component={TelaLogin}
          options={{
            headerTitle: "Entrar",
          }}
        />
        <Stack.Screen
          name="Contato"
          component={TelaContato}
        />
        <Stack.Screen
          name="Aviso Nenhum Pet"
          component={TelaAvisoPet}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Cadastro Primeiro Pet"
          component={TelaCadastroPet}
          options={{
            headerLeft: () => null,
            headerTitle: "   Cadastre seu primeiro pet",
          }}
        />
        <Stack.Screen
          name="Cadastrar Pet"
          component={TelaCadastroPet}
        />
        <Stack.Screen
          name="Tela Pets"
          component={TelaPets}
          options={{
            headerLeft: () => null,
            headerTitle: "Meus Pets",
          }}
        />
        <Stack.Screen
          name="Tela Pet"
          component={TelaPet}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}