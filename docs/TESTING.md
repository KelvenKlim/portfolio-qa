# 🧪 Estrutura de Testes - Portfolio QA

## 📋 Sumário

Este documento descreve a arquitetura de testes implementada no projeto, baseada em uma estrutura de camadas organizada por tipo e feature, garantindo qualidade, manutenibilidade e cobertura de código.

---

## 📁 Estrutura de Diretórios

```
src/test/
├── setup.ts
├── mocks/
│   ├── framer-motion.tsx
│   └── localStorage.ts
├── utils/
│   ├── test-utils.tsx
│   ├── mockData.ts
│   └── helpers.ts
├── unit/ (37 tests)
│   ├── lib/utils.test.ts (9)
│   ├── hooks/use-mobile.test.ts (10)
│   └── i18n/LanguageContext.test.tsx (18)
└── component/ (320 tests)
    ├── landing/
    │   ├── Navbar.test.tsx (22)
    │   ├── Hero.test.tsx (39)
    │   ├── Footer.test.tsx (30)
    │   ├── NavLink.test.tsx (31)
    │   ├── About.test.tsx (55)
    │   ├── Services.test.tsx (73)
    │   └── CTA.test.tsx (70)
    └── ui/ (futuro)
```

---

## 🏗️ Camadas de Testes

### Camada 1: Unit Tests ✅

- ⚡ Rápidos (< 10ms)
- 🔒 Isolados
- 🎯 100% cobertura


### Camada 2: Component Tests ✅

- 🎨 Renderização
- 🌍 Bilíngue PT/EN
- ♿ Acessibilidade


### Camada 3: Integration Tests 📅

- 🔲 Landing page flow
- 🔲 Troca de idioma
- 🔲 Navegação

---

## 🚀 Comandos

```bash
npm test                # Todos
npm run test:watch      # Watch
npm run test:coverage   # Coverage
npm run test:unit       # Unitários
npm run test:component  # Componentes
npm test -- About       # Específico
```

---

## 🎯 Padrões

### Teste Bilíngue

```typescript
// ✅ Usar regex PT/EN
expect(screen.getByText(/Connect.*LinkedIn|Conectar.*LinkedIn/i)).toBeInTheDocument();
```

### Queries

1. getByRole (preferível)
2. getByLabelText
3. getByText
4. getByTestId (último recurso)
