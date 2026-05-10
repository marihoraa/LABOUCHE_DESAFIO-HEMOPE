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
Em primeira mão, deve-se instalar o Node.js, Expo CLI e o aplicativo Expo Go no celular. Clone o repositório, acesse a pasta do projeto, instale as dependências e inicie o servidor de desenvolvimento via QR Code disponibilizado pelo Expo.

# Decisões Técnicas
Neste desafio, um ponto primordial a ser explorado foi a animação nativa da tela de carregamento, visando proporcionar uma experiência diferenciada ao atender os requisitos deste projeto. Para tal, implementei com useNativeDriver: true para manter a fluidez do app, sem impactar a navegação. No mais, acrescentei uma tipagem centralizada no arquivo de rotas e estabeleci o RootStackParamList e Produtos neste arquivo, para a exportação para todas as telas - sendo assim, evitando uma possível duplicação e estabelecendo uma cnavegação mais consistente. 

Ao navegar para TelaDetalhes, o produto completo segue o caminho via route.params, eliminando a necessidade de uma segunda requisição à API apenas para exibir os detalhes, tornando a navegação instantânea. 

Estabeleci uma componente Header reutilizável, habilitando uma prop mostrarVoltar opcional, adaptando seu layout (com ou sem botão de retorno) conforme a tela. Isso evita a criação de cabeçalhos duplicados e mantém consistência visual do aplicativo. Além disso, um ponto extra foi o filtro por categoria e a busca textual sobre o estado local produtos, sem nenhuma chamada adicional à API. O resultado é reatividade imediata ao digitar ou selecionar uma categoria, bem como a pesquisa por barra, exibindo os resultados em tempo real.

Ademais, decidi manter os comentários para controle interno do projeto.

# Estrutura de Pastas

# Estrutura de Pastas

```text
DESAFIO-HEMOPE/
├── src/
│   ├── components/
│   │   ├── BarraCategorias.tsx  # Filtro horizontal por categoria
│   │   └── Header.tsx           # Cabeçalho reutilizável
│   ├── routes/
│   │   └── rotas.tsx            # Configuração de navegação e tipos
│   ├── screens/
│   │   ├── TelaInicial.tsx      # Listagem, busca e filtros
│   │   └── TelaDetalhes.tsx     # Detalhes do produto
│   ├── services/
│   │   └── api.ts               # Configuração do Axios (Fake Store API)
│   └── styles/
│       └── cores.ts             # Paleta de cores global
├── App.tsx                      # Entrada principal do app
└── package.json                 # Demais dependências do projeto
+


https://github.com/user-attachments/assets/735be50c-4493-4bcb-8996-75a8a3a70a19
https://github.com/user-attachments/assets/44760b67-8df6-4118-ae58-56af78e2c06d
https://github.com/user-attachments/assets/ff0e2e2e-b159-4734-9bea-718b761c12a1
https://github.com/user-attachments/assets/24f97ad3-da1b-4ea6-ac82-7f7b803998a5
https://github.com/user-attachments/assets/f6431e62-94f1-47cb-961a-440066e9e689
https://github.com/user-attachments/assets/29c29240-8c1a-4c8a-b5bc-4a3b9ff2e40d




