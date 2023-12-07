import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import HomeScreen from './telaInicial.js';
import TelaCadastro from './cadastro.js';
import TelaContato from './contato.js';
import TelaLogin from './login.js';
import TelaAvisoPet from './avisoSemPet.js';
import TelaCadastroPet from './cadastroPet.js';
import TelaPets from './hub.js';
import TelaPet from './telaPet.js';
import TelaTratamentos from './tratamentos.js';
import TelaCadastroTratamentos from './cadastroTratamento.js';
import TelaAtividades from './atividades.js';
import TelaCadastroAtividades from './cadastroAtividade.js';

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
          name="Tratamentos"
          component={TelaTratamentos}
        />
        <Stack.Screen
          name="Cadastrar Pet"
          component={TelaCadastroPet}
        />
        <Stack.Screen
          name="Tela Pets"
          component={TelaPets}
          options={({ navigation }) => ({
            headerLeft: () => null,
            headerTitle: "Meus Pets",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Cadastrar Pet")}
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
          name="Tela Pet"
          component={TelaPet}
        />
        <Stack.Screen
          name="Cadastrar Tratamento"
          component={TelaCadastroTratamentos}
        />
        <Stack.Screen
          name= "Atividades"
          component={TelaAtividades}
        />
        <Stack.Screen
          name= "Cadastrar Atividade"
          component={TelaCadastroAtividades}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}