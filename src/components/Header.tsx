import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cores } from '../styles/cores';
import { useNavigation } from '@react-navigation/native';

// Título obrigatório, botão de voltar opcional.
type HeaderProps = {
  titulo: string;
  mostrarVoltar?: boolean; // default: false
};

const Header = ({ titulo, mostrarVoltar = false }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        {mostrarVoltar && (
          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.seta}>←</Text>
          </TouchableOpacity>
        )}

        <Text style={[
          styles.titulo,
          mostrarVoltar ? styles.tituloNormal : styles.tituloLoja,
          mostrarVoltar && styles.tituloCentralizado
        ]}>
          {titulo}
        </Text>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: cores.topo,
  },

  container: {
    backgroundColor: cores.topo,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  botaoVoltar: {
    marginRight: 12,
    padding: 4,
  },

  seta: {
    fontSize: 22,
    color: cores.texto,
  },

  titulo: {
    flex: 1,
    color: cores.texto,
  },

  tituloLoja: {
    fontSize: 26,
    fontWeight: '900',
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: 1.5,
  },

  // Título normal das outras telas
  tituloNormal: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Centraliza o título quando o botão de voltar está presente
  tituloCentralizado: {
    textAlign: 'center',
    marginRight: 36,
  },
});

export default Header;