# TechSubs UI Style Guide

Este documento reúne as principais diretrizes visuais e de layout para a interface do TechSubs, facilitando a implementação fiel dos wireframes em React.

---

## Paleta de Cores
**Principais cores do sistema (com códigos):**

- **Roxo principal:** #7C3AED  
  (Tailwind: purple-600)
- **Roxo claro:** #E9D5FF  
  (Tailwind: purple-100)
- **Laranja principal:** #F97316  
  (Tailwind: orange-500)
- **Laranja claro:** #FED7AA  
  (Tailwind: orange-100)
- **Azul claro:** #DBEAFE  
  (Tailwind: blue-100)
- **Verde:** #10B981  
  (Tailwind: emerald-600)
- **Vermelho (danger):** #EF4444  
  (Tailwind: red-500)
- **Cinza escuro:** #111827  
  (Tailwind: gray-900)
- **Cinza médio:** #6B7280  
  (Tailwind: gray-500/700)
- **Cinza claro:** #F3F4F6  
  (Tailwind: gray-100)
- **Branco:** #FFFFFF

**Gradientes sugeridos:**
- Roxo (#7C3AED) → Laranja (#F97316)
- Roxo (#7C3AED) → Indigo (#6366F1)
- Roxo claro (#E9D5FF) → Branco (#FFFFFF)

## Tipografia
- **Fonte principal:** Inter, sans-serif (ou similar)
- **Tamanhos:**
  - Título principal: 2.25rem a 3.75rem (text-4xl a text-6xl)
  - Subtítulo: 1.25rem a 1.5rem (text-xl a text-2xl)
  - Texto normal: 1rem (text-base)
  - Pequeno: 0.875rem (text-sm)
- **Peso:**
  - Títulos: bold (700)
  - Subtítulos: semibold (600)
  - Texto: normal (400)

## Espaçamentos e Bordas
- **Espaçamento externo (margin):** 1rem a 2rem (mb-4, mb-8, mt-16)
- **Espaçamento interno (padding):** 1rem a 2rem (p-4, py-8, px-6)
- **Bordas arredondadas:**
  - Cards: 1rem (rounded-2xl)
  - Botões: 0.5rem a 1rem (rounded-lg, rounded-xl)
- **Sombra:**
  - Cards e mockups: shadow-md a shadow-xl

---

## Layout Geral
- **Sidebar fixa à esquerda:**
  - Largura: 240px
  - Fundo: gradiente suave (roxo claro para branco)
  - Ícones e labels alinhados à esquerda
  - Avatar do usuário no rodapé
- **Área principal:**
  - Máximo: 1200px (max-w-7xl)
  - Centralizada com padding lateral (px-6 ou px-8)

---

## Componentes e Elementos

### Botões
- **Primário:** Fundo laranja (#F97316), texto branco, bold, rounded-xl
- **Secundário:** Fundo branco, borda roxa, texto roxo
- **Ações (ícones):**
  - Editar: laranja
  - Deletar: vermelho (#EF4444)
  - Visualizar: cinza escuro

### Badges
- **Categoria:** Fundo pastel (laranja, verde, azul), texto escuro, rounded-full, padding-x pequeno
- **Status:** Badge colorido (verde para ativo, cinza para inativo, vermelho para cancelado)

### Tabelas/Listas
- **Cabeçalho:** Bold, cor primária
- **Linhas:** Fundo branco, hover com leve cinza (#F3F4F6)
- **Avatar:** Círculo colorido com iniciais do serviço
- **Ações:** Ícones alinhados à direita

---

## Detalhes por Página

### Landing Page
- Hero section com grid 2 colunas (título à esquerda, mockup à direita)
- Gradiente de fundo (roxo para indigo)
- Cards de features em grid 3 colunas

### Dashboard
- Sidebar fixa
- Cards de resumo no topo (total de assinaturas, gasto mensal, próximas renovações)
- Lista/tabela de assinaturas recentes

### Services
- Sidebar fixa
- Título "My Services", subtítulo
- Botão "+ New Service" no topo direito
- Tabela/lista de serviços: avatar, nome, categoria (badge), website (link), ações (ícones)

### Subscriptions
- Sidebar fixa
- Título "My Subscriptions"
- Botão "+ New Subscription"
- Tabela/lista: serviço (avatar), plano, preço, próxima cobrança, status (badge), ações

### Profile
- Sidebar fixa
- Título "My Profile"
- Avatar grande, nome, email
- Formulário para editar dados
- Botão "Save Changes", opção de deletar conta

### Report
- Sidebar fixa
- Título "Reports"
- Filtros no topo (data, serviço, status)
- Tabela de dados
- Botões de exportação (CSV, Excel, PDF)
- Resumo de gastos

### Login/Register
- Formulário centralizado
- Campos: email, senha (e nome para registro)
- Botões destacados
- Link para reset de senha

### Error 404
- Mensagem amigável
- Ícone ou ilustração
- Botão para voltar à home/dashboard

---

## Observações Gerais
- Use sempre espaçamentos generosos e contraste suave
- Prefira gradientes e cores pastel para fundos
- Ícones devem ser simples e facilmente reconhecíveis
- Layout responsivo: sidebar colapsa em telas pequenas, listas viram cards

---

Este guia serve como referência para manter a consistência visual e facilitar a implementação dos wireframes em React.