# Futebol Feminino - Passa a Bola

Uma plataforma web completa para o futebol feminino, conectando jogadoras e torcedoras através de uma experiência digital integrada.

## Funcionalidades

- **Autenticação**: Sistema de login e registro para jogadoras e torcedoras
- **Comunidade**: Feed de posts, comentários e interações sociais
- **Loja**: Catálogo de produtos, carrinho de compras e lista de desejos
- **Votação**: Sistema de votação para premiações e reconhecimento de jogadoras
- **Perfil**: Perfis personalizados para jogadoras e torcedoras
- **Partidas**: Calendário e resultados de partidas

## Requisitos

- Node.js 16.x ou superior
- npm 8.x ou superior
- API do backend rodando (veja instruções abaixo)

## Instalação

1. Clone o repositório:
   ```bash
   git clone
   cd 
Instale as dependências:

npm install
Configure as variáveis de ambiente: Crie um arquivo .env.local na raiz do projeto com o seguinte conteúdo:

Executando o projeto
Desenvolvimento
npm run dev
O site estará disponível em http://localhost:3000.

Produção
npm run build
npm start
Conexão com a API
Este projeto requer uma API backend para funcionar corretamente. Por padrão, ele tentará se conectar a http://localhost:3001/api.

Configurando a API
Clone o repositório da API:

git clone https://github.com/seu-usuario/futebol-feminino-api.git
cd futebol-feminino-api
Siga as instruções no README da API para configurar e executar o servidor.

Certifique-se de que a API esteja rodando antes de iniciar o frontend.

Modo de desenvolvimento sem API
Durante o desenvolvimento, o projeto pode funcionar com dados mockados quando a API não está disponível. No entanto, para a experiência completa e funcionalidades como autenticação, a API é necessária.

Estrutura do Projeto
reactweb/
├── app/                  # Páginas e rotas da aplicação
│   ├── (auth)/           # Páginas de autenticação
│   └── (main)/           # Páginas principais da aplicação
├── components/           # Componentes reutilizáveis
│   ├── community/        # Componentes da comunidade
│   ├── layout/           # Componentes de layout (Header, Footer)
│   ├── shop/             # Componentes da loja
│   ├── ui/               # Componentes de UI genéricos
│   └── voting/           # Componentes de votação
├── contexts/             # Contextos React (AuthContext, etc.)
├── hooks/                # Hooks personalizados
├── services/             # Serviços e APIs
│   └── mocks/            # Dados mockados para desenvolvimento
└── public/               # Arquivos estáticos
Tecnologias Utilizadas
Next.js 13 (App Router)
React 18
Tailwind CSS
Axios
React Hook Form
Licença
Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.


Com essas alterações, o projeto estará pronto para uso normal, sem os componentes e estilos de desenvolvimento, e com um README completo explicando como rodar o projeto e a necessidade da API.

Você pode personalizar o README conforme necessário, adicionando mais detalhes específicos sobre o seu projeto ou ajustando as instruções de instalação e execução.

Api em https://projeto-passa-bola.onrender.com
Vercel link: https://projeto-passa-bola.vercel.app/login