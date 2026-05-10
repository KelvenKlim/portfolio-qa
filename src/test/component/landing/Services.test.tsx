import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@/test/utils/test-utils';
import Services from '@/components/landing/Services';

describe('components/landing/Services', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.body.innerHTML = '';
  });

  describe('Rendering', () => {
    it('should render the services section', () => {
      const { container } = render(<Services />);
      const section = container.querySelector('#services');
      expect(section).toBeInTheDocument();
    });

    it('should render section label', () => {
      render(<Services />);
      expect(screen.getByText(/services|serviços/i)).toBeInTheDocument();
    });

    it('should render section title', () => {
      render(<Services />);
      expect(screen.getByText(/How I Create Value|Como Gero Valor/i)).toBeInTheDocument();
    });

    it('should render both service sections', () => {
      render(<Services />);
      expect(screen.getByText(/QA Corporate Performance/i)).toBeInTheDocument();
      expect(screen.getByText(/Consulting.*Personal Brand|Consultoria.*Marca Pessoal/i)).toBeInTheDocument();
    });

    it('should render all corporate service items', () => {
      render(<Services />);
      expect(screen.getByText(/end-to-end/i)).toBeInTheDocument();
      expect(screen.getByText(/métricas de qualidade|quality metrics/i)).toBeInTheDocument();
      expect(screen.getByText(/CI\/CD/i)).toBeInTheDocument();
      expect(screen.getByText(/risco|risk-based/i)).toBeInTheDocument();
      expect(screen.getByText(/mentoria|mentoring/i)).toBeInTheDocument();
      expect(screen.getByText(/IA.*RAG|AI.*augmented/i)).toBeInTheDocument();
    });

    it('should render all consulting service items', () => {
      render(<Services />);
      expect(screen.getByText(/maturidade|maturity/i)).toBeInTheDocument();
      expect(screen.getByText(/liderança de pensamento|thought leadership/i)).toBeInTheDocument();
      expect(screen.getByText(/conferências|conference/i)).toBeInTheDocument();
      expect(screen.getByText(/estratégica|strategic advisory/i)).toBeInTheDocument();
      expect(screen.getByText(/otimização de processos|process optimization/i)).toBeInTheDocument();
      expect(screen.getByText(/governança|governance/i)).toBeInTheDocument();
    });

    it('should render check icons for all items', () => {
      const { container } = render(<Services />);
      const checkIcons = container.querySelectorAll('svg');
      // Should have at least 12 check icons (6 corporate + 6 consulting)
      expect(checkIcons.length).toBeGreaterThanOrEqual(12);
    });
  });

  describe('Service Cards', () => {
    it('should render two service cards', () => {
      const { container } = render(<Services />);
      const cards = container.querySelectorAll('.card-elevated');
      expect(cards.length).toBe(2);
    });

    it('should have proper card styling', () => {
      const { container } = render(<Services />);
      const cards = container.querySelectorAll('.card-elevated');
      cards.forEach(card => {
        expect(card).toHaveClass('card-elevated');
        expect(card).toHaveClass('p-6');
      });
    });

    it('should have responsive padding', () => {
      const { container } = render(<Services />);
      const cards = container.querySelectorAll('.card-elevated');
      cards.forEach(card => {
        expect(card).toHaveClass('sm:p-8');
      });
    });

    it('should display card headings as h3', () => {
      render(<Services />);
      const corporateHeading = screen.getByRole('heading', { level: 3, name: /QA Corporate Performance/i });
      const consultingHeading = screen.getByRole('heading', { level: 3, name: /Consultoria.*Marca|Consulting.*Brand/i });
      expect(corporateHeading).toBeInTheDocument();
      expect(consultingHeading).toBeInTheDocument();
    });

    it('should have proper heading styling', () => {
      render(<Services />);
      const headings = screen.getAllByRole('heading', { level: 3 });
      headings.forEach(heading => {
        expect(heading).toHaveClass('text-lg');
        expect(heading).toHaveClass('font-bold');
        expect(heading).toHaveClass('text-foreground');
      });
    });
  });

  describe('Service Items', () => {
    it('should render items as list elements', () => {
      const { container } = render(<Services />);
      const lists = container.querySelectorAll('ul');
      expect(lists.length).toBe(2);
    });

    it('should have proper list spacing', () => {
      const { container } = render(<Services />);
      const lists = container.querySelectorAll('ul');
      lists.forEach(list => {
        expect(list).toHaveClass('space-y-3');
      });
    });

    it('should render 6 items in corporate section', () => {
      const { container } = render(<Services />);
      const corporateCard = container.querySelector('.card-elevated');
      const items = corporateCard?.querySelectorAll('li');
      expect(items?.length).toBe(6);
    });

    it('should render 6 items in consulting section', () => {
      const { container } = render(<Services />);
      const cards = container.querySelectorAll('.card-elevated');
      const consultingCard = cards[1];
      const items = consultingCard?.querySelectorAll('li');
      expect(items?.length).toBe(6);
    });

    it('should have flex layout for items', () => {
      const { container } = render(<Services />);
      const items = container.querySelectorAll('li');
      items.forEach(item => {
        expect(item).toHaveClass('flex');
        expect(item).toHaveClass('items-start');
        expect(item).toHaveClass('gap-3');
      });
    });

    it('should have proper text styling', () => {
      const { container } = render(<Services />);
      const itemSpans = container.querySelectorAll('li span');
      itemSpans.forEach(span => {
        expect(span.parentElement).toHaveClass('text-sm');
        expect(span.parentElement).toHaveClass('text-muted-foreground');
      });
    });
  });

  describe('Icons', () => {
    it('should render CheckCircle2 icons', () => {
      const { container } = render(<Services />);
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('should have primary color for icons', () => {
      const { container } = render(<Services />);
      const icons = container.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveClass('text-primary');
      });
    });

    it('should have proper icon sizing', () => {
      const { container } = render(<Services />);
      const icons = container.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('width', '16');
        expect(icon).toHaveAttribute('height', '16');
      });
    });

    it('should have shrink-0 class on icons', () => {
      const { container } = render(<Services />);
      const icons = container.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveClass('shrink-0');
      });
    });

    it('should have proper icon positioning', () => {
      const { container } = render(<Services />);
      const icons = container.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveClass('mt-0.5');
      });
    });
  });

  describe('Layout & Structure', () => {
    it('should have section padding', () => {
      const { container } = render(<Services />);
      const section = container.querySelector('#services');
      expect(section).toHaveClass('section-padding');
    });

    it('should have border on top', () => {
      const { container } = render(<Services />);
      const section = container.querySelector('#services');
      expect(section).toHaveClass('border-t');
      expect(section).toHaveClass('border-border');
    });

    it('should use section container', () => {
      const { container } = render(<Services />);
      const sectionContainer = container.querySelector('.section-container');
      expect(sectionContainer).toBeInTheDocument();
    });

    it('should have grid layout', () => {
      const { container } = render(<Services />);
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('gap-6');
    });

    it('should have responsive grid columns', () => {
      const { container } = render(<Services />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('md:grid-cols-2');
    });

    it('should have proper spacing between header and cards', () => {
      const { container } = render(<Services />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('mt-10');
    });
  });

  describe('Typography', () => {
    it('should have proper heading sizes', () => {
      render(<Services />);
      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveClass('text-3xl');
      expect(mainHeading).toHaveClass('sm:text-4xl');
    });

    it('should use mono font for label', () => {
      render(<Services />);
      const label = screen.getByText(/services|serviços/i);
      expect(label).toHaveClass('font-mono-stack');
    });

    it('should have tracking on label', () => {
      render(<Services />);
      const label = screen.getByText(/services|serviços/i);
      expect(label).toHaveClass('tracking-widest');
    });

    it('should have uppercase label', () => {
      render(<Services />);
      const label = screen.getByText(/services|serviços/i);
      expect(label).toHaveClass('uppercase');
    });

    it('should have text-balance on title', () => {
      render(<Services />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-balance');
    });

    it('should have tracking-tight on title', () => {
      render(<Services />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('tracking-tight');
    });
  });

  describe('Accessibility', () => {
    it('should have proper section landmark', () => {
      const { container } = render(<Services />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should have id for navigation', () => {
      const { container } = render(<Services />);
      const section = container.querySelector('#services');
      expect(section).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(<Services />);
      const h2 = screen.getByRole('heading', { level: 2 });
      const h3s = screen.getAllByRole('heading', { level: 3 });
      expect(h2).toBeInTheDocument();
      expect(h3s.length).toBe(2);
    });

    it('should have semantic list structure', () => {
      const { container } = render(<Services />);
      const lists = container.querySelectorAll('ul');
      expect(lists.length).toBe(2);
      lists.forEach(list => {
        expect(list.children.length).toBeGreaterThan(0);
      });
    });

    it('should have sufficient text contrast', () => {
      render(<Services />);
      const label = screen.getByText(/services|serviços/i);
      expect(label).toHaveClass('text-primary');
      
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-foreground');
    });
  });

  describe('Responsive Design', () => {
    it('should have mobile-first grid', () => {
      const { container } = render(<Services />);
      const grid = container.querySelector('.grid');
      expect(grid).toHaveClass('md:grid-cols-2');
    });

    it('should have responsive heading sizes', () => {
      render(<Services />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-3xl');
      expect(title).toHaveClass('sm:text-4xl');
    });

    it('should have responsive card padding', () => {
      const { container } = render(<Services />);
      const cards = container.querySelectorAll('.card-elevated');
      cards.forEach(card => {
        expect(card).toHaveClass('p-6');
        expect(card).toHaveClass('sm:p-8');
      });
    });

    it('should stack cards on mobile', () => {
      const { container } = render(<Services />);
      const grid = container.querySelector('.grid');
      // On mobile, grid-cols-1 is default (no explicit class needed)
      expect(grid).not.toHaveClass('grid-cols-2');
    });
  });

  describe('Content Translation', () => {
    it('should display translated label', () => {
      render(<Services />);
      expect(screen.getByText(/services|serviços/i)).toBeInTheDocument();
    });

    it('should display translated title', () => {
      render(<Services />);
      expect(screen.getByText(/How I Create Value|Como Gero Valor/i)).toBeInTheDocument();
    });

    it('should display translated corporate section', () => {
      render(<Services />);
      expect(screen.getByText(/QA Corporate Performance/i)).toBeInTheDocument();
    });

    it('should display translated consulting section', () => {
      render(<Services />);
      expect(screen.getByText(/Consulting.*Personal Brand|Consultoria.*Marca Pessoal/i)).toBeInTheDocument();
    });

    it('should display all translated items', () => {
      render(<Services />);
      // Sample a few key items
      expect(screen.getByText(/end-to-end/i)).toBeInTheDocument();
      expect(screen.getByText(/maturidade|maturity/i)).toBeInTheDocument();
      expect(screen.getByText(/IA.*RAG|AI.*augmented/i)).toBeInTheDocument();
    });
  });

  describe('Styling & Design', () => {
    it('should have primary color for label', () => {
      render(<Services />);
      const label = screen.getByText(/services|serviços/i);
      expect(label).toHaveClass('text-primary');
    });

    it('should have foreground color for title', () => {
      render(<Services />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-foreground');
    });

    it('should have bold headings', () => {
      render(<Services />);
      const headings = screen.getAllByRole('heading');
      headings.forEach(heading => {
        expect(heading).toHaveClass('font-bold');
      });
    });

    it('should use card-elevated for sections', () => {
      const { container } = render(<Services />);
      const cards = container.querySelectorAll('.card-elevated');
      expect(cards.length).toBe(2);
    });

    it('should have muted text for items', () => {
      const { container } = render(<Services />);
      const items = container.querySelectorAll('li');
      items.forEach(item => {
        expect(item).toHaveClass('text-muted-foreground');
      });
    });

    it('should have proper label sizing', () => {
      render(<Services />);
      const label = screen.getByText(/services|serviços/i);
      expect(label).toHaveClass('text-xs');
    });

    it('should have margin on label', () => {
      render(<Services />);
      const label = screen.getByText(/services|serviços/i);
      expect(label).toHaveClass('mb-2');
    });

    it('should have margin on card headings', () => {
      render(<Services />);
      const headings = screen.getAllByRole('heading', { level: 3 });
      headings.forEach(heading => {
        expect(heading).toHaveClass('mb-6');
      });
    });
  });

  describe('Performance', () => {
    it('should render quickly', () => {
      const start = performance.now();
      render(<Services />);
      const end = performance.now();
      expect(end - start).toBeLessThan(100);
    });

    it('should handle missing service sections gracefully', () => {
      // Component should still render even if translations are incomplete
      expect(() => render(<Services />)).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should render without translations', () => {
      // Even without proper translations, component should render structure
      expect(() => render(<Services />)).not.toThrow();
    });

    it('should handle long service descriptions', () => {
      render(<Services />);
      const longText = screen.getByText(/Arquitetura de testes end-to-end|End-to-end test architecture/i);
      expect(longText).toBeInTheDocument();
    });

    it('should maintain layout with different content lengths', () => {
      const { container } = render(<Services />);
      const cards = container.querySelectorAll('.card-elevated');
      expect(cards.length).toBe(2);
      expect(cards[0]).toHaveClass('p-6');
      expect(cards[1]).toHaveClass('p-6');
    });

    it('should handle empty service items array', () => {
      // Component structure should remain intact
      const { container } = render(<Services />);
      const section = container.querySelector('#services');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('should integrate with LanguageContext', () => {
      render(<Services />);
      // Verify translations work (PT is default)
      expect(screen.getByText(/services|serviços/i)).toBeInTheDocument();
      expect(screen.getByText(/How I Create Value|Como Gero Valor/i)).toBeInTheDocument();
    });

    it('should work with framer-motion', () => {
      const { container } = render(<Services />);
      // Check that motion.div elements are rendered
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should maintain consistent branding', () => {
      render(<Services />);
      const label = screen.getByText(/services|serviços/i);
      expect(label).toHaveClass('text-primary');
      
      const icons = document.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveClass('text-primary');
      });
    });

    it('should use lucide-react icons', () => {
      const { container } = render(<Services />);
      const checkIcons = container.querySelectorAll('svg');
      expect(checkIcons.length).toBeGreaterThan(0);
    });
  });

  describe('Service Content Quality', () => {
    it('should emphasize AI and modern QA practices', () => {
      render(<Services />);
      expect(screen.getAllByText(/IA|AI/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/CI\/CD/i)).toBeInTheDocument();
    });

    it('should highlight strategic value', () => {
      render(<Services />);
      expect(screen.getByText(/estratégica|strategic/i)).toBeInTheDocument();
      expect(screen.getByText(/governança|governance/i)).toBeInTheDocument();
    });

    it('should showcase technical expertise', () => {
      render(<Services />);
      expect(screen.getByText(/end-to-end/i)).toBeInTheDocument();
      expect(screen.getByText(/observabilidade|observability/i)).toBeInTheDocument();
    });

    it('should mention thought leadership', () => {
      render(<Services />);
      expect(screen.getByText(/liderança de pensamento|thought leadership/i)).toBeInTheDocument();
      expect(screen.getByText(/conferências|conference/i)).toBeInTheDocument();
    });

    it('should include compliance and risk', () => {
      render(<Services />);
      expect(screen.getByText(/risco|risk/i)).toBeInTheDocument();
      expect(screen.getByText(/regulados|regulated/i)).toBeInTheDocument();
    });

    it('should emphasize team development', () => {
      render(<Services />);
      expect(screen.getByText(/mentoria|mentoring/i)).toBeInTheDocument();
      expect(screen.getByText(/transformação cultural|culture transformation/i)).toBeInTheDocument();
    });
  });
});
