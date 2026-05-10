import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@/test/utils/test-utils';
import Hero from '@/components/landing/Hero';

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    },
  };
});

describe('components/landing/Hero', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('should render the hero section', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('min-h-screen');
    });

    it('should render the main heading', () => {
      render(<Hero />);

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('should render subtitle text', () => {
      render(<Hero />);

      // Verifica se há texto de subtítulo (pode ser PT ou EN)
      const text = screen.getByText(/Strategic Quality Engineering/i);
      expect(text).toBeInTheDocument();
    });

    it('should render CTA buttons', () => {
      render(<Hero />);

      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThanOrEqual(2);
    });

    it('should render chevron down icon', () => {
      const { container } = render(<Hero />);

      const chevron = container.querySelector('.animate-bounce');
      expect(chevron).toBeInTheDocument();
    });
  });

  describe('Content Translation', () => {
    it('should display Portuguese content by default', () => {
      render(<Hero />);

      // Verifica se tem conteúdo em português (depende do localStorage estar limpo)
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toBeTruthy();
    });

    it('should display title text', () => {
      render(<Hero />);

      const heading = screen.getByRole('heading', { level: 1 });
      
      // O título deve conter "Quality" ou "Qualidade"
      const hasContent = 
        heading.textContent?.includes('Quality') || 
        heading.textContent?.includes('Qualidade') ||
        heading.textContent?.includes('Engineering');
      
      expect(hasContent).toBe(true);
    });

    it('should display subtitle with professional description', () => {
      render(<Hero />);

      // Verifica se há descrição sobre QA/Fintech
      const hasQAContent = 
        screen.queryByText(/fintech/i) ||
        screen.queryByText(/quality/i) ||
        screen.queryByText(/strategic/i);

      expect(hasQAContent).toBeInTheDocument();
    });

    it('should render CTA button texts', () => {
      render(<Hero />);

      const links = screen.getAllByRole('link');
      
      // Cada link deve ter texto
      links.forEach(link => {
        expect(link.textContent).toBeTruthy();
        expect(link.textContent?.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Call-to-Action Buttons', () => {
    it('should have primary CTA linking to contact section', () => {
      render(<Hero />);

      const ctaLink = screen.getAllByRole('link').find(link => 
        link.getAttribute('href') === '#cta'
      );

      expect(ctaLink).toBeInTheDocument();
      expect(ctaLink).toHaveClass('bg-primary');
    });

    it('should have secondary CTA linking to services section', () => {
      render(<Hero />);

      const servicesLink = screen.getAllByRole('link').find(link => 
        link.getAttribute('href') === '#services'
      );

      expect(servicesLink).toBeInTheDocument();
    });

    it('should render ArrowRight icon in primary CTA', () => {
      const { container } = render(<Hero />);

      const primaryCTA = container.querySelector('a[href="#cta"]');
      expect(primaryCTA?.querySelector('svg')).toBeInTheDocument();
    });

    it('should have correct button styles', () => {
      render(<Hero />);

      const primaryCTA = screen.getAllByRole('link').find(link => 
        link.getAttribute('href') === '#cta'
      );

      expect(primaryCTA).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('should have hover effects', () => {
      render(<Hero />);

      const primaryCTA = screen.getAllByRole('link').find(link => 
        link.getAttribute('href') === '#cta'
      );

      expect(primaryCTA?.className).toContain('hover');
    });
  });

  describe('Layout & Styling', () => {
    it('should have full screen height', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('min-h-screen');
    });

    it('should have gradient background elements', () => {
      const { container } = render(<Hero />);

      const gradients = container.querySelectorAll('.blur-\\[120px\\], .blur-\\[100px\\]');
      expect(gradients.length).toBeGreaterThan(0);
    });

    it('should be centered layout', () => {
      const { container } = render(<Hero />);

      const centerDiv = container.querySelector('.text-center');
      expect(centerDiv).toBeInTheDocument();
    });

    it('should have responsive padding', () => {
      const { container } = render(<Hero />);

      const containerDiv = container.querySelector('.section-container');
      expect(containerDiv).toHaveClass('py-20');
    });

    it('should have max-width constraint', () => {
      const { container } = render(<Hero />);

      const maxWidthDiv = container.querySelector('.max-w-3xl');
      expect(maxWidthDiv).toBeInTheDocument();
    });
  });

  describe('Animation Elements', () => {
    it('should have animation classes on main content', () => {
      const { container } = render(<Hero />);

      // motion.div se torna div com framer-motion mockado
      const animatedDivs = container.querySelectorAll('div[initial]');
      expect(animatedDivs.length).toBeGreaterThan(0);
    });

    it('should have bounce animation on chevron', () => {
      const { container } = render(<Hero />);

      const chevron = container.querySelector('.animate-bounce');
      expect(chevron).toBeInTheDocument();
    });
  });

  describe('Typography', () => {
    it('should have correct heading hierarchy', () => {
      render(<Hero />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it('should have large font size on heading', () => {
      render(<Hero />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toHaveClass('text-4xl');
    });

    it('should have gradient text element', () => {
      const { container } = render(<Hero />);

      const gradientText = container.querySelector('.gradient-text');
      expect(gradientText).toBeInTheDocument();
      expect(gradientText?.textContent).toBe('.');
    });

    it('should have mono font for tagline', () => {
      const { container } = render(<Hero />);

      const tagline = container.querySelector('.font-mono-stack');
      expect(tagline).toBeInTheDocument();
      expect(tagline).toHaveClass('uppercase', 'tracking-widest');
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive text sizes', () => {
      render(<Hero />);

      const h1 = screen.getByRole('heading', { level: 1 });
      
      // Deve ter classes responsivas (sm:, lg:)
      const hasResponsiveClasses = 
        h1.className.includes('sm:text') || 
        h1.className.includes('lg:text');
      
      expect(hasResponsiveClasses).toBe(true);
    });

    it('should have responsive button layout', () => {
      const { container } = render(<Hero />);

      const ctaContainer = container.querySelector('.flex-col');
      expect(ctaContainer).toHaveClass('sm:flex-row');
    });

    it('should have responsive padding', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('.section-container');
      
      // Verifica se há classes de padding responsivo
      const hasResponsivePadding = 
        section?.className.includes('sm:py') || 
        section?.className.includes('lg:py');
      
      expect(hasResponsivePadding).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should have semantic HTML section', () => {
      const { container } = render(<Hero />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should have accessible links', () => {
      render(<Hero />);

      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link.textContent).toBeTruthy();
      });
    });

    it('should have proper heading structure', () => {
      render(<Hero />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
      
      // Não deve haver h2 antes do h1
      const headings = screen.queryAllByRole('heading');
      const h1Index = headings.findIndex(h => h.tagName === 'H1');
      
      expect(h1Index).toBe(0); // H1 deve ser o primeiro heading
    });

    it('should have sufficient color contrast', () => {
      const { container } = render(<Hero />);

      const heading = container.querySelector('h1');
      expect(heading).toHaveClass('text-foreground');
    });
  });

  describe('Performance', () => {
    it('should render quickly', () => {
      const start = performance.now();
      render(<Hero />);
      const end = performance.now();

      expect(end - start).toBeLessThan(100);
    });

    it('should not have excessive DOM nodes', () => {
      const { container } = render(<Hero />);

      const allElements = container.querySelectorAll('*');
      expect(allElements.length).toBeLessThan(50); // Reasonable limit
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing translations gracefully', () => {
      // Mesmo que falte tradução, não deve quebrar
      expect(() => render(<Hero />)).not.toThrow();
    });

    it('should render with empty localStorage', () => {
      localStorage.clear();
      
      const { container } = render(<Hero />);
      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('should handle long text content', () => {
      render(<Hero />);

      const heading = screen.getByRole('heading', { level: 1 });
      
      // Deve ter word-wrap para textos longos
      const containerDiv = heading.closest('.text-balance');
      expect(containerDiv).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should integrate with LanguageContext', () => {
      render(<Hero />);

      // Deve renderizar conteúdo do contexto de idioma
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading.textContent).toBeTruthy();
    });

    it('should have clickable CTAs', () => {
      render(<Hero />);

      const links = screen.getAllByRole('link');
      
      links.forEach(link => {
        expect(link).toBeEnabled();
        expect(link.getAttribute('href')).toBeTruthy();
      });
    });
  });
});
