# 📱 Top Decks

Aplicativo desenvolvido em **React Native (Expo)** para visualizar decks populares do jogo **Clash Royale**, permitindo ao usuário marcar favoritos, navegar entre telas e acompanhar seu perfil dentro do app.

---

## ▶️ Demonstração
https://youtube.com/shorts/w4nKYZW-OU8?si=KESmfjRLmS1XlNiw


---


## 🎯 Visão Geral

O objetivo do aplicativo é facilitar a visualização de decks utilizados no Clash Royale, permitindo que o usuário salve seus decks preferidos, mantendo-os facilmente acessíveis.  
Além disso, foram utilizadas técnicas de armazenamento local e interação com o dispositivo para aprimorar a experiência do usuário.

---

## 🚀 Funcionalidades

| Funcionalidade | Descrição |
|---------------|-----------|
| 🔍 **Listagem de Decks** | Exibe os decks disponíveis com suas respectivas cartas. |
| ⭐ **Favoritar Decks** | O usuário pode marcar e desmarcar decks favoritos. |
| ❤️ **Tela de Favoritos** | Exibe somente os decks que foram favoritados. |
| 👤 **Tela de Perfil** | Mostra nome do usuário e dias registrados no app. |
| 📦 **Armazenamento Local** | Os favoritos são salvos usando **AsyncStorage**, mantendo os dados mesmo após fechar o app. |
| 📳 **Vibração / Feedback tátil** | Ao realizar logout, o app utiliza vibração para melhorar a interação (atuador). |

---

## 🧱 Estrutura Simplificada do Projeto

📦 ProjetoReact
├── assets/ # Ícones e imagens gerais
├── components/
│ ├── DecksScreen.js # Tela com lista de decks
│ ├── FavoriteDecksScreen.js# Tela de favoritos
│ ├── ProfileScreen.js # Tela do perfil do usuário
│ └── EmptyScreen.js # Tela placeholder
├── data/
│ └── decks.js # Base de dados dos decks
├── imagens_cartas/ # Imagens das cartas usadas nos decks
├── App.js # Entrada principal do aplicativo
└── package.json

yaml


---

## 🛠 Tecnologias Utilizadas

- **React Native**
- **Expo**
- **JavaScript**
- **AsyncStorage**
- **React Navigation**
- **Expo Haptics** (vibração / atuador)

---

## ▶️ Como Executar o Projeto

1. Instalar o Expo CLI (caso não tenha):
npm install --global expo-cli




2. Instalar dependências:
npm install


3. Rodar o app:
npx expo start



4. Abra no celular usando o **Expo Go** ou execute no emulador.

---





---

## 🧠 Aprendizados 

- Praticamos a navegação entre telas utilizando o **React Navigation**.
- Aprendemos a utilizar **AsyncStorage** para manter dados persistidos localmente.
- Implementamos feedback tátil utilizando **Expo Haptics**.
- Possíveis evoluções:
  - Sistema de login real
  - Customização de decks
  - Sincronização online com banco de dados

---

## 👤 Autor

Projeto desenvolvido individualmente por **Vinicius Trivellato** para a disciplina **CCP150 - Desenvolvimento de Aplicativos Móveis**.
