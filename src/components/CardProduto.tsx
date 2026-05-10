import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { cores } from '../styles/cores';
import { Produto } from '../routes/rotas';

type CardProdutoProps = {
  produto: Produto;
  aoClicar: () => void;
};


const CardProduto = ({ produto, aoClicar }: CardProdutoProps) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={aoClicar}
      activeOpacity={0.75} // Feedback visual mais sutil (preferência)
    >
      {/* foto da API */}
      <Image source={{ uri: produto.image }} style={styles.foto} />
      <View style={styles.info}>
        {/*limitei o título a 2 linhas para manter o card clean */}
        <Text style={styles.nome} numberOfLines={2}>{produto.title}</Text>
        <Text style={styles.categoria}>{produto.category}</Text>
        <Text style={styles.preco}>R$ {produto.price.toFixed(2)}</Text>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: cores.branco,
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  foto: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
  },

  // Texto + foto.
  info: {
    marginLeft: 15,
    flex: 1, // Faz o bloco de texto ocupar o espaço restante do card.
  },

  nome: {
    color: cores.texto,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
  },

  categoria: {
    color: cores.cinza2,
    fontSize: 12,
    marginTop: 3,
  },

  preco: {
    color: cores.destaque,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default CardProduto;