# Guia de Integração do Frontend React com o Backend TechSubs API

Este documento contém todas as informações necessárias para configurar e conectar o frontend React ao backend TechSubs API hospedado no Render com banco de dados Neon PostgreSQL.

## Informações de Conexão

- **URL Base da API**: `https://fullstackphp-sprint5-api.onrender.com`
- **Versão da API**: v1
- **Formato de Dados**: JSON
- **Autenticação**: OAuth 2.0 (Laravel Passport)

## Configuração do Ambiente Frontend

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do seu projeto React com as seguintes variáveis:

```
REACT_APP_API_URL=https://fullstackphp-sprint5-api.onrender.com
REACT_APP_API_VERSION=v1
```

### Configuração do CORS

O backend já está configurado para aceitar requisições do frontend. Certifique-se de que seu frontend esteja usando HTTPS em produção para evitar problemas de segurança com cookies e requisições.

## Autenticação

### Fluxo de Login

1. Envie uma requisição POST para `/api/login` com:
   ```json
   {
     "email": "email@exemplo.com",
     "password": "senha"
   }
   ```

2. A resposta incluirá um token de acesso:
   ```json
   {
     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9...",
     "user": {
       "id": 1,
       "name": "Nome do Usuário",
       "email": "email@exemplo.com",
       "role": "user"
     }
   }
   ```

3. Armazene o token no localStorage ou em um cookie seguro.

### Uso do Token

Inclua o token em todas as requisições autenticadas no cabeçalho:

```javascript
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}
```

### Registro de Usuário

Envie uma requisição POST para `/api/register` com:
```json
{
  "name": "Nome Completo",
  "email": "email@exemplo.com",
  "password": "senha",
  "password_confirmation": "senha"
}
```

## Endpoints Principais

### Serviços

- **Listar Serviços**: GET `/api/services`
- **Detalhes do Serviço**: GET `/api/services/{id}`
- **Criar Serviço**: POST `/api/services`
- **Atualizar Serviço**: PUT `/api/services/{id}`
- **Excluir Serviço**: DELETE `/api/services/{id}`

### Assinaturas

- **Listar Assinaturas**: GET `/api/subscriptions`
- **Detalhes da Assinatura**: GET `/api/subscriptions/{id}`
- **Criar Assinatura**: POST `/api/subscriptions`
- **Atualizar Assinatura**: PUT `/api/subscriptions/{id}`
- **Excluir Assinatura**: DELETE `/api/subscriptions/{id}`

### Usuários

- **Perfil do Usuário**: GET `/api/user`
- **Atualizar Perfil**: PUT `/api/user`

## Tratamento de Erros

O backend retorna erros no seguinte formato:

```json
{
  "message": "Mensagem de erro",
  "errors": {
    "campo": [
      "Erro específico do campo"
    ]
  }
}
```

Códigos de status HTTP comuns:
- 200: Sucesso
- 201: Criado com sucesso
- 400: Requisição inválida
- 401: Não autenticado
- 403: Não autorizado
- 404: Recurso não encontrado
- 422: Erro de validação
- 500: Erro interno do servidor

## Considerações para Deploy

### Configuração do Vercel/Netlify

Para deploy no Vercel ou Netlify, crie um arquivo de configuração para redirecionar todas as rotas para o index.html:

**vercel.json**:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**netlify.toml**:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Requisitos de SSL

- O backend exige conexões HTTPS
- O frontend também deve usar HTTPS para evitar problemas de cookies e requisições mistas
- Certifique-se de que todas as requisições usem HTTPS

### Configurações Específicas para o Neon PostgreSQL

O backend já está configurado para usar o Neon PostgreSQL com as configurações de segurança necessárias. O frontend não precisa se preocupar com isso diretamente, mas deve estar ciente de que:

1. As conexões com o backend podem ser um pouco mais lentas devido às verificações de segurança SSL
2. O backend está usando `sslmode=require` para conexões seguras com o Neon
3. As sessões estão configuradas para usar cookies seguros

## Exemplo de Cliente API em React

```javascript
// api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Redirecionar para login se o token expirou
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

1. Use um gerenciador de estado como Redux ou Context API para gerenciar o estado de autenticação
2. Implemente um sistema de refresh token para manter os usuários logados
3. Utilize componentes de loading durante as requisições assíncronas
4. Implemente tratamento de erros consistente em toda a aplicação
5. Considere usar React Query ou SWR para gerenciamento de cache e estado do servidor