import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaInicial from '../screens/TelaInicial';
import TelaDetalhes from '../screens/TelaDetalhes';

// Tipagem centralizada — usada pelas telas via import
export type RootStackParamList = {
  TelaInicial: undefined;
  TelaDetalhes: { produto: Produto }; // Recebe o objeto completo do produto
};

// Tipagem de produto (mesma estrutura da Fake Store API).
export type Produto = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
};

// Criei um objeto Stack para as telas registradas.
const Stack = createNativeStackNavigator<RootStackParamList>();

const Rotas = () => {
  return (
    <Stack.Navigator
      // Desativei o header padrão do React Navigation pela minha.
      screenOptions={{ headerShown: false }}
    >
      {/* Na tela inicial, a lista de produtos deve ser a primeira a aparecer */}
      <Stack.Screen name="TelaInicial" component={TelaInicial} />
      {/* Detalhes */}
      <Stack.Screen name="TelaDetalhes" component={TelaDetalhes} />
    </Stack.Navigator>
  );
};

export default Rotas;