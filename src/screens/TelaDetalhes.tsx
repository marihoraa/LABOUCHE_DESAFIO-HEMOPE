import {View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../components/Header';
import { cores } from '../styles/cores';
// Importando tipagens centralizadas de rotas.tsx
import { RootStackParamList } from '../routes/rotas';

type Props = NativeStackScreenProps<RootStackParamList, 'TelaDetalhes'>;

const TelaDetalhes = ({ route, navigation }: Props) => {

  // Objeto passado pela TelaInicial.
  const { produto } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={cores.topo} barStyle="dark-content" />
      <Header titulo="Detalhes do Produto" mostrarVoltar={true} />

      {/* Optei permitir rolar o conteúdo caso a descrição seja longa. */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Imagem em destaque */}
        <View style={styles.containerImagem}>
          <Image source={{ uri: produto.image }} style={styles.imagemProduto} />
        </View>

        <View style={styles.containerInfo}>
          <Text style={styles.categoria}>{produto.category}</Text>
          <Text style={styles.titulo}>{produto.title}</Text>
          <Text style={styles.preco}>R$ {produto.price.toFixed(2)}</Text>
          <View style={styles.separador} />
          <Text style={styles.rotuloDescricao}>Descrição</Text>

          {/* Aqui tem o texto da descrição - API! */}
          <Text style={styles.descricao}>{produto.description}</Text>
        </View>

        <View style={styles.containerBotoes}>
          {/* Adicionar ao Carrinho (fic.) */}
          <TouchableOpacity style={styles.botaoComprar} activeOpacity={0.8}>
            <Text style={styles.textoBotaoComprar}>🛒  Adicionar ao carrinho</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },

  // Adicionei padding para que o conteúdo não cole nas bordas.
  scroll: {
    paddingBottom: 40,
  },

  // Área branca da imagem para destaque do produto.
  containerImagem: {
    backgroundColor: cores.branco,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },

  imagemProduto: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
  },

  containerInfo: {
    padding: 20,
  },

  categoria: {
    color: cores.cinza2,
    fontSize: 13,
    textTransform: 'uppercase', // Deixa a categoria em maiúsculas.
    letterSpacing: 1,
    marginBottom: 6,
  },

  titulo: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 26,
    marginBottom: 10,
  },

  preco: {
    color: cores.destaque,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },

  // Linha horizontal fina separando preço da descrição.
  separador: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },

  rotuloDescricao: {
    color: cores.texto,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  descricao: {
    color: cores.cinza2,
    fontSize: 14,
    lineHeight: 22,
  },

  containerBotoes: {
    paddingHorizontal: 20,
    gap: 12,
  },

  botaoComprar: {
    backgroundColor: cores.destaque,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: cores.destaque,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  textoBotaoComprar: {
    color: cores.branco,
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoVoltar: {
    borderWidth: 2,
    borderColor: cores.topo,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },

  textoBotaoVoltar: {
    color: cores.texto,
    fontSize: 15,
    fontWeight: '600',
  },
});

export default TelaDetalhes;