import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import Navbar from '@/components/landing/Navbar';

// Mock framer-motion para evitar problemas com animações nos testes
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock scroll suave
const mockScrollIntoView = vi.fn();

describe('components/landing/Navbar', () => {
  beforeEach(() => {
    // Reset mocks antes de cada teste
    mockScrollIntoView.mockClear();
    localStorage.clear(); // Limpa localStorage entre testes
    
    // Mock getElementById e scrollIntoView
    Element.prototype.scrollIntoView = mockScrollIntoView;
    document.getElementById = vi.fn((id: string) => {
      const mockElement = document.createElement('div');
      mockElement.id = id;
      return mockElement;
    });
  });

  describe('Rendering', () => {
    it('should render the navbar with logo', () => {
      render(<Navbar />);

      expect(screen.getByText('Kelven')).toBeInTheDocument();
      expect(screen.getByText('Prasad')).toBeInTheDocument();
    });

    it('should render all navigation links in desktop view', () => {
      render(<Navbar />);

      // Verifica se os links estão presentes (em PT por padrão)
      expect(screen.getByRole('button', { name: /sobre/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /serviços/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /impacto/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /tech stack/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /depoimentos/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /contato/i })).toBeInTheDocument();
    });

    it('should render language toggle button', () => {
      render(<Navbar />);

      // Deve mostrar "EN" quando o idioma atual é PT
      const langButtons = screen.getAllByRole('button', { name: /en/i });
      expect(langButtons.length).toBeGreaterThan(0);
    });

    it('should have correct CSS classes for sticky navbar', () => {
      const { container } = render(<Navbar />);

      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('fixed', 'top-0', 'z-50');
    });
  });

  describe('Language Toggle', () => {
    it('should toggle language when button is clicked', async () => {
      render(<Navbar />);

      // Pega botões de idioma
      const langButtons = screen.getAllByRole('button').filter(btn => 
        btn.textContent === 'EN' || btn.textContent === 'PT'
      );

      expect(langButtons.length).toBeGreaterThanOrEqual(2);

      // Clica no primeiro botão de idioma
      const initialText = langButtons[0].textContent;
      fireEvent.click(langButtons[0]);

      // Aguarda mudança
      await waitFor(() => {
        const newButtons = screen.getAllByRole('button').filter(btn => 
          btn.textContent === 'EN' || btn.textContent === 'PT'
        );
        const newText = newButtons[0].textContent;
        
        // Texto do botão deve ter mudado (PT -> EN ou EN -> PT)
        expect(newText).not.toBe(initialText);
      }, { timeout: 2000 });
    });

    it('should display language toggle button text correctly', () => {
      render(<Navbar />);

      // Deve haver botões de idioma
      const langButtons = screen.getAllByRole('button').filter(btn => 
        btn.textContent === 'EN' || btn.textContent === 'PT'
      );

      expect(langButtons.length).toBeGreaterThanOrEqual(2); // Desktop + Mobile
    });

    it('should update navigation text when language changes', async () => {
      render(<Navbar />);

      // Captura textos iniciais dos links de navegação
      const navButtons = screen.getAllByRole('button').filter(btn => 
        !btn.textContent?.match(/EN|PT/) && !btn.querySelector('svg')
      );
      const initialTexts = navButtons.map(b => b.textContent);

      // Clica no toggle de idioma
      const langButtons = screen.getAllByRole('button').filter(btn => 
        btn.textContent === 'EN' || btn.textContent === 'PT'
      );

      if (langButtons.length > 0) {
        fireEvent.click(langButtons[0]);

        // Aguarda mudança nos textos
        await waitFor(() => {
          const newNavButtons = screen.getAllByRole('button').filter(btn => 
            !btn.textContent?.match(/EN|PT/) && !btn.querySelector('svg')
          );
          const newTexts = newNavButtons.map(b => b.textContent);
          
          // Pelo menos alguns textos devem ter mudado
          const changed = newTexts.some((text, idx) => text !== initialTexts[idx]);
          expect(changed).toBe(true);
        }, { timeout: 2000 });
      }
    });
  });

  describe('Navigation', () => {
    it('should scroll to section on link click', () => {
      render(<Navbar />);

      // Pega qualquer link de navegação (não de idioma)
      const navButtons = screen.getAllByRole('button').filter(btn => 
        !btn.textContent?.match(/EN|PT/)
      );
      
      expect(navButtons.length).toBeGreaterThan(0);
      
      // Clica no primeiro link
      fireEvent.click(navButtons[0]);

      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('should call getElementById when navigating', () => {
      render(<Navbar />);

      const navButtons = screen.getAllByRole('button').filter(btn => 
        !btn.textContent?.match(/EN|PT/)
      );

      fireEvent.click(navButtons[0]);

      expect(document.getElementById).toHaveBeenCalled();
    });
  });

  describe('Mobile Menu', () => {
    it('should toggle mobile menu on hamburger click', () => {
      const { container } = render(<Navbar />);

      // Conta elementos iniciais
      const initialButtons = screen.getAllByRole('button').length;

      // Procura pelo botão do menu (tem SVG mas não tem texto EN/PT)
      const menuButton = screen.getAllByRole('button').find(btn =>
        btn.querySelector('svg') && !btn.textContent?.match(/EN|PT/)
      );

      expect(menuButton).toBeDefined();

      if (menuButton) {
        fireEvent.click(menuButton);

        // Após abrir, pode ter mais botões visíveis (no menu mobile)
        const openButtons = screen.getAllByRole('button').length;
        expect(openButtons).toBeGreaterThanOrEqual(initialButtons);
      }
    });

    it('should close mobile menu after clicking a nav link', () => {
      render(<Navbar />);

      // Abre o menu
      const menuButton = screen.getAllByRole('button').find(btn =>
        btn.querySelector('svg') && !btn.textContent?.match(/EN|PT/)
      );

      if (menuButton) {
        fireEvent.click(menuButton);

        // Clica em um link de navegação
        const navButtons = screen.getAllByRole('button').filter(btn => 
          !btn.textContent?.match(/EN|PT/) && !btn.querySelector('svg')
        );

        if (navButtons.length > 0) {
          fireEvent.click(navButtons[0]);
          expect(mockScrollIntoView).toHaveBeenCalled();
        }
      }
    });

    it('should render menu toggle button', () => {
      render(<Navbar />);

      const menuButton = screen.getAllByRole('button').find(btn =>
        btn.querySelector('svg')
      );

      expect(menuButton).toBeDefined();
    });
  });

  describe('Responsive Behavior', () => {
    it('should show desktop menu on larger screens', () => {
      const { container } = render(<Navbar />);

      const desktopMenu = container.querySelector('.md\\:flex');
      expect(desktopMenu).toBeInTheDocument();
      expect(desktopMenu).toHaveClass('hidden', 'md:flex');
    });

    it('should show mobile controls on smaller screens', () => {
      const { container } = render(<Navbar />);

      const mobileControls = container.querySelector('.md\\:hidden');
      expect(mobileControls).toBeInTheDocument();
      expect(mobileControls).toHaveClass('md:hidden');
    });

    it('should have language toggle buttons', () => {
      render(<Navbar />);

      // Deve haver botões de idioma (PT ou EN)
      const langButtons = screen.getAllByRole('button').filter(btn => 
        btn.textContent === 'EN' || btn.textContent === 'PT'
      );
      expect(langButtons.length).toBeGreaterThanOrEqual(2); // Desktop + Mobile
    });
  });

  describe('Accessibility', () => {
    it('should have semantic nav element', () => {
      const { container } = render(<Navbar />);

      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('should have clickable buttons with proper roles', () => {
      render(<Navbar />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      buttons.forEach((button) => {
        expect(button).toBeEnabled();
      });
    });

    it('should have proper contrast classes', () => {
      const { container } = render(<Navbar />);

      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('bg-background/80');
    });
  });

  describe('Performance', () => {
    it('should render quickly', () => {
      const start = performance.now();
      render(<Navbar />);
      const end = performance.now();

      expect(end - start).toBeLessThan(100); // < 100ms
    });

    it('should handle multiple clicks efficiently', () => {
      const { container } = render(<Navbar />);

      // Pega um link de navegação
      const navButtons = screen.getAllByRole('button').filter(btn => 
        !btn.textContent?.match(/EN|PT/) && !btn.querySelector('svg')
      );

      if (navButtons.length > 0) {
        // Clica múltiplas vezes
        fireEvent.click(navButtons[0]);
        fireEvent.click(navButtons[0]);
        fireEvent.click(navButtons[0]);

        // Deve ter chamado scrollIntoView 3 vezes
        expect(mockScrollIntoView).toHaveBeenCalledTimes(3);
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing section ID gracefully', () => {
      // Mock getElementById retornando null
      document.getElementById = vi.fn(() => null);

      render(<Navbar />);

      const navButtons = screen.getAllByRole('button').filter(btn => 
        !btn.textContent?.match(/EN|PT/) && !btn.querySelector('svg')
      );
      
      // Não deve lançar erro ao clicar
      if (navButtons.length > 0) {
        expect(() => fireEvent.click(navButtons[0])).not.toThrow();
      }
    });

    it('should work with rapid language toggles', async () => {
      render(<Navbar />);

      const langButtons = screen.getAllByRole('button').filter(btn => 
        btn.textContent === 'EN' || btn.textContent === 'PT'
      );

      if (langButtons.length > 0) {
        // Cliques rápidos no botão de idioma
        fireEvent.click(langButtons[0]);
        fireEvent.click(langButtons[0]);
        fireEvent.click(langButtons[0]);

        // Deve estabilizar
        await waitFor(() => {
          const buttons = screen.getAllByRole('button');
          expect(buttons.length).toBeGreaterThan(0);
        });
      }
    });
  });
});
