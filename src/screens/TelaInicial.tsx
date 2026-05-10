import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TextInput, Animated
} from 'react-native';
import Header from '../components/Header';
import CardProduto from '../components/CardProduto';
import BarraCategorias from '../components/BarraCategorias';
import { cores } from '../styles/cores';
import api from '../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Produto } from '../routes/rotas';

type Props = NativeStackScreenProps<RootStackParamList, 'TelaInicial'>;

const TelaInicial = ({ navigation }: Props) => {

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');

  // animação da tela de splash.
  const opacidadeLogo = useRef(new Animated.Value(0)).current;
  const escalaLogo = useRef(new Animated.Value(0.8)).current;
  const opacidadeSubtitulo = useRef(new Animated.Value(0)).current;
  const opacidadeSplash = useRef(new Animated.Value(1)).current;

  // Nota: UseEffect rodando UMA vez.
  useEffect(() => {
    iniciarSplash();
  }, []);

  // FUNÇÃO: anima a splash para depois buscar os produtos
  const iniciarSplash = () => {
    // Animação de entrada aqui.
    Animated.parallel([
      Animated.timing(opacidadeLogo, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(escalaLogo, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Entrada sub.
      Animated.timing(opacidadeSubtitulo, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // PAUSA!
        setTimeout(() => buscarProdutos(), 600);
      });
    });
  };

  // FUNÇÃO: buscarProdutos
  const buscarProdutos = async () => {
    try {
      setErro(false);
      const resposta = await api.get('/products');
      setProdutos(resposta.data); // Salvando no estado.
    } catch (error) {
      setErro(true);
      console.error('[TelaInicial] Erro ao buscar produtos:', error);
    } finally {
      // Encerra o splash com fade-out suave independente do resultado
      Animated.timing(opacidadeSplash, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setCarregando(false));
    }
  };

  // FILTRO: busca por nome + categoria ativa
  const produtosFiltrados = produtos.filter((produto) => {
    const buscaOk = produto.title.toLowerCase().includes(busca.toLowerCase());
    const categoriaOk = categoriaAtiva === 'todos' || produto.category === categoriaAtiva;
    return buscaOk && categoriaOk;
  });

  // Splash de carregamento ao abrir o app.
  if (carregando) {
    return (
      <Animated.View style={[styles.splashContainer, { opacity: opacidadeSplash }]}>

        {/* Logo animada. */}
        <Animated.Text style={[
          styles.splashLogo,
          { opacity: opacidadeLogo, transform: [{ scale: escalaLogo }] }
        ]}>
          Labouche
        </Animated.Text>

        {/* Subtítulo que aparece logo após a logo */}
        <Animated.Text style={[styles.splashSubtitulo, { opacity: opacidadeSubtitulo }]}>
          sua loja favorita.
        </Animated.Text>

        {/* Pontinhos de loading!! */}
        <Animated.View style={[styles.splashRodape, { opacity: opacidadeSubtitulo }]}>
          <Text style={styles.splashTextoRodape}>carregando produtos...</Text>
        </Animated.View>

      </Animated.View>
    );
  }

  // TELA PRINCIPAL
  return (
    <View style={styles.container}>

      {/* Cabeçalho com SafeAreaView. */}
      <Header titulo="Labouche" />

      {/* Bloco fixo: busca + categorias juntas — imunes ao redimensionamento do FlatList */}
      <View style={styles.topoFixo}>
        <TextInput
          style={styles.input}
          placeholder="Buscar produto..."
          placeholderTextColor={cores.cinza2}
          value={busca}
          onChangeText={setBusca} // Atualizando o estado a cada letra digitada (Tempo R.)
        />

        {/* Barra de seleção por categorias */}
        <BarraCategorias
          categoriaAtiva={categoriaAtiva}
          aoSelecionarCategoria={setCategoriaAtiva}
        />
      </View>

      {/* Lista de produtos filtrados — flex:1 ocupa o restante da tela sem interferir no topo */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardProduto
            produto={item}
            aoClicar={() => navigation.navigate('TelaDetalhes', { produto: item })}
          />
        )}
        contentContainerStyle={styles.lista}
        style={styles.flatList}

        // Exibição para quando a lista filtrada estiver vazia, sem resultado de busca.
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.textoVazio}>🔍 Nenhum produto encontrado.</Text>
            <Text style={styles.textoVazioSub}>Tente outra busca ou categoria.</Text>
          </View>
        }
      />
    </View>
  );
};


// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },

  // Tela de splash.
  splashContainer: {
    flex: 1,
    backgroundColor: cores.topo,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  splashLogo: {
    fontSize: 42,
    fontWeight: '900',
    fontStyle: 'italic',
    color: cores.texto,
    letterSpacing: 1.5,
  },

  splashSubtitulo: {
    fontSize: 16,
    color: cores.texto,
    opacity: 0.7,
    fontStyle: 'italic',
  },

  splashRodape: {
    position: 'absolute',
    bottom: 60,
  },

  splashTextoRodape: {
    fontSize: 13,
    color: cores.texto,
    opacity: 0.5,
    letterSpacing: 0.5,
  },

  topoFixo: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 4,
    backgroundColor: cores.fundo,
  },

  // Acrescentei uma sombra para destacar do fundo.
  input: {
    backgroundColor: cores.branco,
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 12,
    fontSize: 16,
    color: cores.texto,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    elevation: 3,
  },

  // flex:1 trava o FlatList no espaço restante — impede crescimento ao trocar categoria
  flatList: {
    flex: 1,
  },

  // Padding nas laterais e na parte de baixo para melhor visualização dos cards.
  lista: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },


  vazio: {
    paddingTop: 60,
    alignItems: 'center',
    padding: 20,
  },

  textoVazio: {
    color: cores.texto,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  textoVazioSub: {
    color: cores.cinza2,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 6,
  },
});

export default TelaInicial;