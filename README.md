# LABOUCHE_DESAFIO-HEMOPE
# Projeto Labouche 

# Candidata: [MARIA EDUARDA CAVALCANTE HORA]

# Descrição
Aplicativo Mobile desenvolvido em React Native para listagem e detalhamento de produtos variados. Este aplicativo consome uma API externa (Fake Store API), que permite a exibição dos produtos selecionados e seus respectivos preços, imagens, categorias e descrições. Neste projeto, foi explorada a elaboração de animações em telas de carregamento e um layout responsivo durante busca em tempo real e navegação entre telas. O usuário poderá navegar entre produtos, filtrá-los por categoria ou busca textual, e visualizar os detalhes de cada item numa tela apropriada.

# Tecnologias Utilizadas
* React Native 
* Expo - Para desenvolvimento, execução e visualização do projeto.
* React Navigation 
* TypeScript
* react-native-safe-area-context - Para evitar a sobreposição do cabeçalho.
* Axios

# Como Executar o Projeto
Em primeira mão, deve-se instalar o Node.js, Expo CLI e o aplicativo Expo Go no celular.
# 1. Clone o repositório
# 2. Acesse a pasta do projeto
# 3. Instale as dependências
# 4. Inicie o servidor de desenvolvimento via QR Code disponibilizado pelo Expo.

# Estrutura de Pastas
DESAFIO-HEMOPE/
src/ 
> components/: BarraCategorias.tsx (Add. filtro fixo e horizontal por categoria + prod.) e Header.tsx (Cabeçalho reutilizável).
> routes/: rotas.tsx (Configuração do React Navigation + tipagens centralizadas).
> screens/: TelaInicial.tsx  (Listagem de produtos com busca e filtros) e TelaDetalhes.tsx: (Detalhes do produto selecionado).
> services/: api.ts (Axios para a Fake Store API).
> styles/: cores.ts (Paleta de cores global do app).
App.tsx
package.json

# Decisões Técnicas
Neste desafio, um ponto primordial a ser explorado foi a animação nativa da tela de carregamento, visando proporcionar uma experiência diferenciada ao atender os requisitos deste projeto. Para tal, implementei com useNativeDriver: true para manter a fluidez do app, sem impactar a navegação. No mais, acrescentei uma tipagem centralizada no arquivo de rotas e estabeleci o RootStackParamList e Produtos neste arquivo, para a exportação para todas as telas - sendo assim, evitando uma possível duplicação e estabelecendo uma cnavegação mais consistente. 

Ao navegar para TelaDetalhes, o produto completo segue o caminho via route.params, eliminando a necessidade de uma segunda requisição à API apenas para exibir os detalhes, tornando a navegação instantânea. 

Estabeleci uma componente Header reutilizável, habilitando uma prop mostrarVoltar opcional, adaptando seu layout (com ou sem botão de retorno) conforme a tela. Isso evita a criação de cabeçalhos duplicados e mantém consistência visual do aplicativo. Além disso, um ponto extra foi o filtro por categoria e a busca textual sobre o estado local produtos, sem nenhuma chamada adicional à API. O resultado é reatividade imediata ao digitar ou selecionar uma categoria, bem como a pesquisa por barra, exibindo os resultados em tempo real.
Paleta de cores via objeto centralizado
Todas as cores do app são importadas de cores.ts. Qualquer ajuste visual futuro é feito em um único lugar, sem necessidade de busca e substituição em múltiplos arquivos.
