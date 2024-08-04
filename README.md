## Tuni App

Tuni é um aplicativo de gestão de transporte universitário, desenvolvido em React Native com a plataforma Expo. O aplicativo oferece uma interface intuitiva para estudantes e motoristas, facilitando a organização de rotas, horários, agendamentos e comunicações.

### Funcionalidades Principais

- **Navegação por Abas**: O aplicativo possui uma navegação principal através de abas na parte inferior da tela, permitindo acesso rápido ao Feed, Horários, Notificações, Conversas e Agendamentos.
- **Calendário**: Modal interativo de calendário na tela Feed para seleção de datas.
- **Notificações**: Sistema de notificações que alerta os usuários sobre mudanças de horário e atrasos do ônibus.
- **Chat**: Funcionalidade de chat para comunicação entre estudantes e motoristas.
- **Agendamentos**: Visualização e gerenciamento de agendamentos de transporte por dia da semana.
- **Perfis**: Exibição de detalhes do perfil do usuário logado ao clicar na imagem de perfil.

### Estrutura do Projeto

```bash
src/
├── assets/
│   └── fonts/
│       └── PoppinsBold.ttf
├── components/
│   └── CustomerTabBar.js
├── data/
│   └── users.json
├── navigation/
│   ├── AppStack.js
│   ├── AppTabs.js
│   ├── AuthStack.js
│   └── HootNavigator.js
├── screens/
│   ├── App/
│   │   ├── Chats.js
│   │   ├── ChatDetails.js
│   │   ├── Clocks.js
│   │   ├── Feed.js
│   │   ├── Notifications.js
│   │   ├── ProfileDetails.js
│   │   ├── ScheduleDetails.js
│   │   └── Schedules.js
│   └── Auth/
│       ├── Login.js
│       ├── ForgotPassword.js
│       ├── NewPassword.js
│       └── Register.js
└── App.js
```

### Instalação

Para executar este projeto localmente, siga as instruções abaixo:

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/fernandesraquel/mobile-project.git
    cd mobile-project
    ```

2. **Instale as dependências**:
    ```bash
    npm install
    ```

3. **Inicie o projeto**:
    ```bash
    npx expo start
    ```

### Configuração do Ambiente

Este projeto utiliza as seguintes tecnologias e bibliotecas:

- **React Native**: Framework para desenvolvimento de aplicativos móveis.
- **Expo**: Plataforma para facilitar o desenvolvimento em React Native.
- **React Navigation**: Biblioteca para navegação entre telas.
- **Moment.js**: Biblioteca para manipulação de datas.
- **react-native-calendars**: Componente de calendário para React Native.
- **expo-font**: Para carregamento de fontes personalizadas.
- **expo-vector-icons**: Conjunto de ícones para uso em React Native.

### Uso

O aplicativo Tuni possui as seguintes telas principais:

- **Feed**: Mostra as rotas do dia e serviços adicionais disponíveis.
- **Clocks**: Exibe os horários de transporte.
- **Notificações**: Mostra notificações importantes sobre o transporte.
- **Conversas**: Área de chat para comunicação entre usuários.
- **Agendamentos**: Exibe e gerencia os agendamentos de transporte para os estudantes.

### Customizações

- **CustomerTabBar**: Componente personalizado para a barra de navegação por abas, estilizada de acordo com o padrão de cores do aplicativo.
- **Modal de Calendário**: Modal que exibe um calendário para seleção de datas, com estilização personalizada.

### Estilo e Temas

O aplicativo segue um tema de cores consistente:
- **Azul**: Utilizado para destaques e botões principais.
- **Laranja**: Utilizado para alertas e notificações.

### Contribuição

Se desejar contribuir para este projeto, por favor siga os passos abaixo:

1. **Fork o projeto**.
2. **Crie uma branch para sua feature** (`git checkout -b feature/nova-feature`).
3. **Commit suas mudanças** (`git commit -m 'Adiciona nova feature'`).
4. **Faça push para a branch** (`git push origin feature/nova-feature`).
5. **Abra um Pull Request**.

### Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

**Desenvolvido por Raquel Fernandes**

Para mais informações, entre em contato: raquel.lima.072@ufrn.edu.br


 
