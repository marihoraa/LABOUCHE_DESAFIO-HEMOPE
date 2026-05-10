import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { cores } from '../styles/cores';

type BarraCategoriasProps = {
  categoriaAtiva: string;
  aoSelecionarCategoria: (categoria: string) => void;
};

// Categorias disponíveis na Fake Store API.
const CATEGORIAS = ["todos", "men's clothing", "women's clothing", "jewelery", "electronics"];

// Labels para exibição dos botões.
const labelCategoria = (cat: string) => {
  const mapa: Record<string, string> = {
    'todos': '🏠 Todos',
    "men's clothing": '👔 Masculino',
    "women's clothing": '👗 Feminino',
    'jewelery': '💍 Joias',
    'electronics': '📱 Eletrônicos',
  };
  return mapa[cat] ?? cat;
};

// Aqui: responsabilidade pela barra de filtro por categorias.
// percebendo qual categoria está ATIVA.
const BarraCategorias = ({ categoriaAtiva, aoSelecionarCategoria }: BarraCategoriasProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.lista}
    >
      {CATEGORIAS.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.botao,
            categoriaAtiva === cat && styles.botaoAtivo
          ]}
          onPress={() => aoSelecionarCategoria(cat)}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.textoBotao,
            categoriaAtiva === cat && styles.textoAtivo
          ]}>
            {labelCategoria(cat)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Scroll horizontal das categorias
  container: {
    height: 48,
  },

  lista: {
    paddingHorizontal: 0,
    gap: 8,
    alignItems: 'center',
  },

  botao: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: cores.branco,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',

    // nota: reajuste de sombras nos botões que não estão ativos
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },

  // Cat. selecionada fica com fundo rosa
  botaoAtivo: {
    backgroundColor: cores.destaque,
    borderColor: cores.destaque,
    elevation: 3,
    shadowColor: cores.destaque,
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  textoBotao: {
    fontSize: 13,
    color: cores.texto,
    fontWeight: '500',
  },

  // Texto branco quando a categoria for selecionada
  textoAtivo: {
    color: cores.branco,
    fontWeight: 'bold',
  },
});

export default BarraCategorias;