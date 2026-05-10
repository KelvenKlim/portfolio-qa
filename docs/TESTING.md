# 🧪 Estrutura de Testes - Portfolio QA

## 📋 Sumário

Este documento descreve a arquitetura de testes implementada no projeto, baseada em uma estrutura de camadas que garante qualidade, manutenibilidade e cobertura de código.

---

## 🏗️ Arquitetura de Testes

### **Camada 1: Unit Tests** ✅ Implementada
Testes isolados de funções, utilitários e hooks sem dependências externas.

**Características:**
- ⚡ Rápidos (< 10ms cada)
- 🔒 Isolados (sem side effects)
- 🎯 Alta cobertura de código
- 🧩 Mockam dependências externas

**Arquivos testados:**
- ✅ `src/lib/utils.ts` - Função `cn()` para merge de classes
- ✅ `src/hooks/use-mobile.tsx` - Hook de detecção de dispositivo móvel
- ✅ `src/i18n/LanguageContext.tsx` - Contexto de internacionalização
- ✅ `src/i18n/translations.ts` - Traduções PT/EN

**Cobertura atual:**
- **lib/**: 100% (9 testes)
- **hooks/use-mobile**: 100% (10 testes)
- **i18n/**: 100% (18 testes)

---

### **Camada 2: Component Tests** 🚧 Próxima etapa
Testes de componentes React individuais.

**Componentes prioritários:**
- `Navbar.tsx` - Navegação principal
- `Hero.tsx` - Seção hero
- `Footer.tsx` - Rodapé
- Componentes UI (Button, Card, etc.)

---

### **Camada 3: Integration Tests** 🚧 Futuro
Testes de fluxos completos e integração entre componentes.

**Exemplos:**
- Navegação entre seções
- Fluxo de troca de idioma
- Scroll suave

---

### **Camada 4: E2E Tests** 💭 Opcional
Testes end-to-end com Playwright ou Cypress.

---

## 📁 Estrutura de Arquivos

```
src/
├── test/
│   ├── setup.ts                    # Configuração global de testes
│   ├── example.test.ts             # Teste de exemplo
│   │
│   ├── utils/                      # 🆕 Utilitários de teste
│   │   ├── test-utils.tsx          # Render customizado com providers
│   │   ├── mockData.ts             # Dados mockados reutilizáveis
│   │   └── helpers.ts              # Funções auxiliares
│   │
│   ├── mocks/                      # 🆕 Mocks globais
│   │   ├── framer-motion.tsx       # Mock do framer-motion
│   │   └── localStorage.ts         # Mock do localStorage
│   │
│   └── fixtures/                   # 🔜 Fixtures de teste
│
├── lib/
│   ├── utils.ts
│   └── utils.test.ts               # ✅ Teste unitário
│
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-mobile.test.ts          # ✅ Teste de hook
│   └── use-toast.ts
│
├── i18n/
│   ├── LanguageContext.tsx
│   ├── LanguageContext.test.tsx    # ✅ Teste de contexto
│   └── translations.ts
│
└── components/                      # 🔜 Próxima camada
    └── landing/
        ├── Navbar.tsx
        └── Navbar.test.tsx         # 🚧 Futuro
```

---

## 🚀 Scripts de Teste

### **Executar todos os testes**
```bash
npm test
```

### **Modo watch (desenvolvimento)**
```bash
npm run test:watch
```

### **Interface visual de testes**
```bash
npm run test:ui
```

### **Relatório de cobertura**
```bash
npm run test:coverage
```

### **Testes por camada**
```bash
# Apenas testes unitários (lib, hooks, i18n)
npm run test:unit

# Apenas componentes
npm run test:components

# Apenas testes de integração
npm run test:integration
```

### **Testes de arquivos modificados**
```bash
npm run test:changed
```

---

## 📊 Resultados Atuais

### **Estatísticas de Testes**
```
✅ 38 testes passando
⏱️  Tempo médio: < 1s
📦 4 arquivos de teste
```

### **Cobertura de Código (Camada 1)**
| Módulo | Linhas | Funções | Branches | Statements |
|--------|--------|---------|----------|------------|
| **lib/utils.ts** | 100% | 100% | 100% | 100% |
| **hooks/use-mobile** | 100% | 100% | 100% | 100% |
| **i18n/** | 100% | 100% | 100% | 100% |

---

## 🔧 Configuração

### **vitest.config.ts**
```typescript
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
});
```

---

## 📚 Ferramentas Utilizadas

- **Vitest** - Framework de testes
- **Testing Library** - Testes de componentes React
- **@vitest/coverage-v8** - Relatório de cobertura
- **jsdom** - Ambiente DOM para testes

---

## 🎯 Próximos Passos

1. ✅ ~~Implementar Camada 1 (Unit Tests)~~
2. 🚧 Implementar Camada 2 (Component Tests)
   - Navbar
   - Hero
   - Footer
3. 🔜 Implementar Camada 3 (Integration Tests)
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
