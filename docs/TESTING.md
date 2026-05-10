# 🧪 Guia de Testes - Portfolio QA# 🧪 Estrutura de Testes - Portfolio QA



## 📊 Status Atual## 📋 Sumário



| Métrica | Valor |Este documento descreve a arquitetura de testes implementada no projeto, baseada em uma estrutura de camadas organizada por tipo e feature, garantindo qualidade, manutenibilidade e cobertura de código.

|---------|-------|

| **Total de Testes** | 128 ✅ |> **📁 Estrutura reorganizada**: Todos os testes agora estão centralizados em `src/test/` e organizados por tipo (unit, component, integration) e feature. Veja [TEST_STRUCTURE.md](./TEST_STRUCTURE.md) para detalhes completos da organização.

| **Testes Unitários** | 37 (29%) |

| **Testes de Componentes** | 91 (71%) |---

| **Taxa de Sucesso** | 100% |

| **Tempo de Execução** | ~1.3s |## 🏗️ Arquitetura de Testes



---### **Estrutura de Diretórios**



## 📁 Estrutura de Diretórios```

src/test/

```├── setup.ts                    # Configuração global

src/test/├── mocks/                      # Mocks compartilhados

├── setup.ts                    # Configuração global├── utils/                      # Utilitários de teste

├── README.md                   # Documentação detalhada├── unit/                       # 🧪 Testes Unitários

││   ├── lib/

├── mocks/                      # Mocks compartilhados│   ├── hooks/

│   ├── framer-motion.tsx│   └── i18n/

│   └── localStorage.ts├── component/                  # 🎨 Testes de Componentes

││   ├── landing/

├── utils/                      # Utilitários de teste│   └── ui/

│   ├── test-utils.tsx         # Render com providers└── integration/                # 🔗 Testes de Integração

│   ├── mockData.ts```

│   └── helpers.ts

│---

├── unit/                       # Testes Unitários (37 tests)

│   ├── lib/utils.test.ts           (9 tests)### **Camada 1: Unit Tests** ✅ Completa (37 testes)

│   ├── hooks/use-mobile.test.ts    (10 tests)Testes isolados de funções, utilitários e hooks sem dependências externas.

│   └── i18n/LanguageContext.test.tsx (18 tests)

│**Características:**

├── component/                  # Testes de Componentes (91 tests)- ⚡ Rápidos (< 10ms cada)

│   ├── landing/- 🔒 Isolados (sem side effects)

│   │   ├── Navbar.test.tsx         (22 tests)- 🎯 Alta cobertura de código (100%)

│   │   ├── Hero.test.tsx           (39 tests)- 🧩 Mockam dependências externas

│   │   └── Footer.test.tsx         (30 tests)

│   └── ui/                         (futuro)**Arquivos testados:**

│- ✅ `src/test/unit/lib/utils.test.ts` - Função `cn()` (9 testes)

└── integration/                # Testes de Integração (futuro)- ✅ `src/test/unit/hooks/use-mobile.test.ts` - Hook responsive (10 testes)

```- ✅ `src/test/unit/i18n/LanguageContext.test.tsx` - Context i18n (18 testes)



---**Comando:**

```bash

## 🚀 Comandosnpm run test:unit  # Executa apenas testes unitários

```

### Executar Testes

```bash---

npm test                    # Todos os testes

npm run test:watch         # Watch mode### **Camada 2: Component Tests** ✅ Parcial (91 testes)

npm run test:ui            # Interface visualTestes de componentes React individuais com interações de usuário.

npm run test:coverage      # Com cobertura

```**Componentes testados:**

- ✅ `Navbar.tsx` - Navegação principal (22 testes)

### Por Tipo- ✅ `Hero.tsx` - Seção hero (39 testes)

```bash- ✅ `Footer.tsx` - Rodapé (30 testes)

npm run test:unit          # Apenas unitários (37 tests)

npm run test:component     # Apenas componentes (91 tests)**Próximos componentes:**

npm run test:integration   # Apenas integração (futuro)- 🚧 `NavLink.tsx` - Link de navegação

```- 🚧 `About.tsx`, `Services.tsx`, `TechStack.tsx`

- 🚧 Componentes UI (Button, Card, Badge)

### Criar Novo Teste

```bash**Comando:**

./scripts/create-test.sh component landing/About About```bash

./scripts/create-test.sh unit hooks/use-theme use-themenpm run test:component  # Executa apenas testes de componentes

``````



------



## 🎯 Camadas de Teste### **Camada 3: Integration Tests** 🚧 Futuro

Testes de fluxos completos e integração entre componentes.

### 1. Unit Tests ✅ (37 testes)

**O que testar:****Exemplos:**

- Funções puras (utils)- Navegação entre seções

- Hooks customizados- Fluxo de troca de idioma

- Contexts- Scroll suave

- Helpers

---

**Características:**

- ⚡ Rápidos (< 10ms)### **Camada 4: E2E Tests** 💭 Opcional

- 🔒 IsoladosTestes end-to-end com Playwright ou Cypress.

- 🎯 100% cobertura

---

**Exemplos:**

- `cn()` - merge de classes CSS## 📁 Estrutura de Arquivos

- `useIsMobile()` - detecção de breakpoint

- `LanguageContext` - i18n```

src/

### 2. Component Tests ✅ (91 testes)├── test/                           # 🎯 Todos os testes centralizados

**O que testar:**│   ├── setup.ts                    # Configuração global

- Renderização│   ├── README.md                   # Documentação de testes

- Interações do usuário│   │

- Props e estados│   ├── mocks/                      # Mocks globais

- Acessibilidade│   │   ├── framer-motion.tsx       # Mock do framer-motion

- Responsividade│   │   └── localStorage.ts         # Mock do localStorage

│   │

**Componentes testados:**│   ├── utils/                      # Utilitários de teste

- ✅ Navbar (22 tests)│   │   ├── test-utils.tsx          # Render customizado

- ✅ Hero (39 tests)│   │   ├── mockData.ts             # Mock data

- ✅ Footer (30 tests)│   │   └── helpers.ts              # Helper functions

│   │

**Próximos:**│   ├── unit/                       # ✅ Testes Unitários (37 testes)

- NavLink│   │   ├── lib/

- About, Services, TechStack│   │   │   └── utils.test.ts       # ✅ 9 testes

- UI components (Button, Card, Badge)│   │   ├── hooks/

│   │   │   └── use-mobile.test.ts  # ✅ 10 testes

### 3. Integration Tests 🚧 (futuro)│   │   └── i18n/

**O que testar:**│   │       └── LanguageContext.test.tsx  # ✅ 18 testes

- Fluxos completos│   │

- Navegação entre páginas│   ├── component/                  # ✅ Testes de Componentes (91 testes)

- Troca de idioma│   │   ├── landing/

- Scroll suave│   │   │   ├── Navbar.test.tsx     # ✅ 22 testes

│   │   │   ├── Hero.test.tsx       # ✅ 39 testes

### 4. E2E Tests 💭 (opcional)│   │   │   └── Footer.test.tsx     # ✅ 30 testes

**Ferramentas:** Playwright ou Cypress│   │   └── ui/                     # 🚧 Futuro

- Fluxos críticos de usuário│   │

- Testes cross-browser│   └── integration/                # 🔜 Testes de Integração

│

---├── lib/

│   └── utils.ts

## 🛠️ Utilitários de Teste│

├── hooks/

### Custom Render│   ├── use-mobile.tsx

```tsx│   └── use-toast.ts

import { render } from '@/test/utils/test-utils';│

├── i18n/

// Já inclui todos os providers:│   ├── LanguageContext.tsx

// - QueryClientProvider│   └── translations.ts

// - LanguageProvider  │

// - TooltipProvider└── components/

// - BrowserRouter    └── landing/

        ├── Navbar.tsx

render(<MyComponent />);        ├── Hero.tsx

```        └── Footer.tsx

```

### Mock Data

```tsx---

import { mockTranslations, mockNavLinks } from '@/test/utils/mockData';

```## 🚀 Scripts de Teste



### Helpers### **Executar todos os testes**

```tsx```bash

import { npm test                    # Todos os testes (128 testes)

  mockLocalStorage, ```

  mockMatchMedia,

  resizeWindow ### **Executar por tipo**

} from '@/test/utils/helpers';```bash

```npm run test:unit          # Apenas testes unitários (37 testes)

npm run test:component     # Apenas testes de componentes (91 testes)

---npm run test:integration   # Apenas testes de integração (futuro)

```

## ✅ Padrões de Teste

### **Modo watch (desenvolvimento)**

### Estrutura```bash

```tsxnpm run test:watch

describe('feature/Component', () => {```

  beforeEach(() => {

    localStorage.clear();### **Interface visual de testes**

  });```bash

npm run test:ui

  describe('Rendering', () => {```

    it('should render correctly', () => {

      // Arrange### **Relatório de cobertura**

      render(<Component />);```bash

      npm run test:coverage

      // Act & Assert```

      expect(screen.getByText('...')).toBeInTheDocument();

    });### **Criar novo teste**

  });```bash

./scripts/create-test.sh component landing/About About

  describe('Functionality', () => {./scripts/create-test.sh unit hooks/use-theme use-theme

    it('should handle user interaction', async () => {```

      render(<Component />);

      ### **Testes de arquivos modificados**

      fireEvent.click(screen.getByRole('button'));```bash

      npm run test:changed

      await waitFor(() => {```

        expect(...).toBe(...);

      });---

    });

  });## 📊 Resultados Atuais



  describe('Accessibility', () => {### **Estatísticas de Testes**

    it('should be accessible', () => {```

      const { container } = render(<Component />);✅ 128 testes passando

      ⏱️  Tempo médio: ~1.3s

      expect(screen.getByRole('...')).toBeInTheDocument();📦 6 arquivos de teste

      // Testes de ARIA, semântica, etc🎯 100% de sucesso

    });```

  });

});### **Breakdown por Tipo**

```- **Unit Tests**: 37 testes (lib, hooks, i18n)

- **Component Tests**: 91 testes (Navbar, Hero, Footer)

### Naming- **Integration Tests**: 0 testes (futuro)

- Arquivos: `ComponentName.test.tsx````

- Describes: `'feature/ComponentName'`

- Tests: `'should [comportamento esperado]'`### **Cobertura de Código (Camada 1)**

| Módulo | Linhas | Funções | Branches | Statements |

---|--------|--------|---------|----------|------------|

| **lib/utils.ts** | 100% | 100% | 100% | 100% |

## 📈 Coverage| **hooks/use-mobile** | 100% | 100% | 100% | 100% |

| **i18n/** | 100% | 100% | 100% | 100% |

### Thresholds

```json---

{

  "lines": 80,## 🔧 Configuração

  "functions": 80,

  "branches": 75,### **vitest.config.ts**

  "statements": 80```typescript

}export default defineConfig({

```  test: {

    environment: "jsdom",

### Visualizar    globals: true,

```bash    setupFiles: ["./src/test/setup.ts"],

npm run test:coverage    coverage: {

open coverage/index.html      provider: "v8",

```      reporter: ["text", "json", "html", "lcov"],

      thresholds: {

---        lines: 80,

        functions: 80,

## 🎨 Próximos Passos        branches: 75,

        statements: 80,

### Curto Prazo      },

- [ ] NavLink component tests    },

- [ ] UI components (Button, Card, Badge)  },

- [ ] Remaining landing components});

```

### Médio Prazo

- [ ] Integration tests---

- [ ] E2E setup

## 📚 Ferramentas Utilizadas

### Longo Prazo

- [ ] Visual regression tests- **Vitest** - Framework de testes

- [ ] Performance tests- **Testing Library** - Testes de componentes React

- [ ] CI/CD integration- **@vitest/coverage-v8** - Relatório de cobertura

- **jsdom** - Ambiente DOM para testes

---

---

## 📚 Referências

## 🎯 Próximos Passos

- [Testing Library](https://testing-library.com/)

- [Vitest](https://vitest.dev/)1. ✅ ~~Implementar Camada 1 (Unit Tests)~~

- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)2. 🚧 Implementar Camada 2 (Component Tests)

   - Navbar

---   - Hero

   - Footer

**Documentação detalhada:** `src/test/README.md`3. 🔜 Implementar Camada 3 (Integration Tests)

   - App.tsx
   - Index.tsx
4. 💭 Avaliar necessidade de E2E

---

## 💡 Melhores Práticas

### **1. Nomenclatura de Arquivos**
- `ComponentName.tsx` → Código fonte
- `ComponentName.test.tsx` → Testes

### **2. Estrutura de Testes**
```typescript
describe('NomeDoModulo', () => {
  describe('Categoria de Testes', () => {
    it('should fazer algo específico', () => {
      // Arrange, Act, Assert
    });
  });
});
```

### **3. AAA Pattern**
```typescript
it('should toggle language', () => {
  // Arrange - Configurar
  const { result } = renderHook(() => useLanguage());
  
  // Act - Executar ação
  act(() => result.current.toggleLang());
  
  // Assert - Verificar resultado
  expect(result.current.lang).toBe('en');
});
```

### **4. Isolamento de Testes**
- Use `beforeEach` para setup
- Use `afterEach` para cleanup
- Limpe mocks entre testes
- Evite dependências entre testes

### **5. Performance**
- Testes unitários < 10ms
- Mock dependências pesadas (framer-motion)
- Use `test-utils.tsx` para providers

---

## 🐛 Troubleshooting

### **Erro: "Cannot find module"**
```bash
# Verificar alias @ no tsconfig
npm run test -- --reporter=verbose
```

### **Testes lentos**
```bash
# Analisar performance
npm run test:ui
```

### **Coverage não atinge threshold**
```bash
# Ver relatório detalhado
npm run test:coverage
# Abrir: coverage/index.html
```

---

## 📖 Referências

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Última atualização:** 10 de maio de 2026  
**Branch:** `test/pipeline-test`  
**Status:** Camada 1 completa ✅
