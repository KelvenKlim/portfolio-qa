# Test Structure

Esta é a estrutura organizada de testes do projeto, dividida por tipo e feature.

## 📁 Estrutura de Diretórios

```
src/test/
├── setup.ts                    # Configuração global de testes
├── mocks/                      # Mocks compartilhados
│   ├── framer-motion.tsx      # Mock de animações
│   └── localStorage.ts        # Mock de localStorage
├── utils/                      # Utilitários de teste
│   ├── test-utils.tsx         # Render customizado com providers
│   ├── mockData.ts            # Dados de mock reutilizáveis
│   └── helpers.ts             # Funções auxiliares de teste
│
├── unit/                       # 🧪 Testes Unitários
│   ├── lib/                   # Testes de bibliotecas/utils
│   │   └── utils.test.ts
│   ├── hooks/                 # Testes de React hooks
│   │   └── use-mobile.test.ts
│   └── i18n/                  # Testes de internacionalização
│       └── LanguageContext.test.tsx
│
├── component/                  # 🎨 Testes de Componentes
│   ├── landing/               # Componentes da landing page
│   │   ├── Navbar.test.tsx
│   │   ├── Hero.test.tsx
│   │   └── Footer.test.tsx
│   └── ui/                    # Componentes UI reutilizáveis
│       └── (Button, Card, Badge, etc)
│
└── integration/                # 🔗 Testes de Integração
    └── (Testes de fluxo completo)
```

## 🎯 Tipos de Teste

### Unit Tests (`unit/`)
- **Objetivo**: Testar funções, hooks e contextos isoladamente
- **Características**: 
  - Rápidos
  - Sem dependências externas
  - Mocks mínimos
  - 100% de cobertura esperada
- **Exemplos**: utils, hooks customizados, providers

### Component Tests (`component/`)
- **Objetivo**: Testar comportamento de componentes React
- **Características**:
  - Render com providers necessários
  - Interações do usuário
  - Estados e props
  - Acessibilidade
  - Responsive design
- **Organização**: Espelha a estrutura de `src/components/`

### Integration Tests (`integration/`)
- **Objetivo**: Testar fluxos completos e interações entre componentes
- **Características**:
  - Múltiplos componentes trabalhando juntos
  - Navegação entre páginas
  - Fluxos de usuário end-to-end
  - Context providers completos

## 🛠️ Utilitários

### test-utils.tsx
Fornece um render customizado com todos os providers:
- `QueryClientProvider`
- `LanguageProvider`
- `TooltipProvider`
- `BrowserRouter`

```tsx
import { render } from '@/test/utils/test-utils';

render(<MyComponent />); // Já inclui todos os providers
```

### mockData.ts
Dados de mock reutilizáveis:
- Traduções mock
- Usuários mock
- Links de navegação mock

### helpers.ts
Funções auxiliares:
- `mockLocalStorage()`
- `mockMatchMedia()`
- `resizeWindow()`
- `waitFor()`

## 📊 Comandos de Teste

```bash
# Todos os testes
npm test

# Apenas testes unitários
npm run test:unit

# Apenas testes de componentes
npm run test:components

# Apenas testes de integração
npm run test:integration

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# UI interativa
npm run test:ui
```

## ✅ Padrões e Boas Práticas

### Estrutura de Teste
```tsx
describe('feature/Component', () => {
  beforeEach(() => {
    // Setup comum
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('should render correctly', () => {
      // Arrange, Act, Assert
    });
  });

  describe('Functionality', () => {
    it('should handle user interaction', () => {
      // Arrange, Act, Assert
    });
  });

  describe('Accessibility', () => {
    it('should be accessible', () => {
      // Arrange, Act, Assert
    });
  });
});
```

### Naming Convention
- Arquivos: `ComponentName.test.tsx` ou `functionName.test.ts`
- Describes: `'feature/ComponentName'` ou `'feature/functionName'`
- Tests: `'should [comportamento esperado]'`

### Organização
- Agrupar testes relacionados em `describe()` blocks
- Um arquivo de teste por arquivo de código
- Espelhar a estrutura de diretórios do código fonte

## 🎨 Coverage Thresholds

```json
{
  "lines": 80,
  "functions": 80,
  "branches": 75,
  "statements": 80
}
```

## 📈 Status Atual

### ✅ Completo
- **Unit Tests**: 38 testes
  - lib/utils.ts: 9 testes
  - hooks/use-mobile.tsx: 10 testes
  - i18n/LanguageContext.tsx: 18 testes (com 1 teste duplicado)

- **Component Tests**: 91 testes
  - landing/Navbar.tsx: 22 testes
  - landing/Hero.tsx: 39 testes
  - landing/Footer.tsx: 30 testes

**Total**: 129 testes passando ✅

### 🚧 Em Progresso
- Reorganização da estrutura de testes
- Padronização de imports

### 📋 Próximos Passos
- NavLink component tests
- UI component tests (Button, Card, Badge)
- Additional landing components
- Integration tests
