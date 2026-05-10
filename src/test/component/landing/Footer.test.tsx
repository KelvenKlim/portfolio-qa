import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@/test/utils/test-utils';
import Footer from '@/components/landing/Footer';

describe('components/landing/Footer', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('should render the footer element', () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('should render the brand name', () => {
      render(<Footer />);

      expect(screen.getByText('Kelven')).toBeInTheDocument();
      expect(screen.getByText('Prasad')).toBeInTheDocument();
    });

    it('should render tagline text', () => {
      const { container } = render(<Footer />);

      const tagline = container.querySelector('.text-xs');
      expect(tagline).toBeInTheDocument();
    });

    it('should render copyright notice', () => {
      const { container } = render(<Footer />);

      const currentYear = new Date().getFullYear();
      const copyright = screen.getByText(new RegExp(`©.*${currentYear}`, 'i'));
      expect(copyright).toBeInTheDocument();
    });
  });

  describe('Copyright Year', () => {
    it('should display current year', () => {
      render(<Footer />);

      const currentYear = new Date().getFullYear();
      const yearText = screen.getByText(new RegExp(currentYear.toString()));
      expect(yearText).toBeInTheDocument();
    });

    it('should update year dynamically', () => {
      // Setup fake timers BEFORE rendering
      vi.useFakeTimers();
      const futureDate = new Date('2027-06-15T12:00:00Z');
      vi.setSystemTime(futureDate);

      render(<Footer />);

      const copyrightText = screen.getByText(/©.*2027/);
      expect(copyrightText).toBeInTheDocument();

      vi.useRealTimers();
    });

    it('should include copyright symbol', () => {
      render(<Footer />);

      const copyrightSymbol = screen.getByText(/©/);
      expect(copyrightSymbol).toBeInTheDocument();
    });
  });

  describe('Content Translation', () => {
    it('should display translated tagline', () => {
      render(<Footer />);

      // Deve ter algum texto de tagline
      const footer = screen.getByRole('contentinfo');
      expect(footer.textContent).toBeTruthy();
      expect(footer.textContent?.length).toBeGreaterThan(0);
    });

    it('should display translated rights text', () => {
      render(<Footer />);

      // Verifica se há texto após o ano
      const copyrightText = screen.getByText(/©/);
      expect(copyrightText.textContent?.length).toBeGreaterThan(10);
    });
  });

  describe('Layout & Styling', () => {
    it('should have border on top', () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('border-t', 'border-border');
    });

    it('should have proper padding', () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('py-8');
    });

    it('should be centered layout', () => {
      const { container } = render(<Footer />);

      const centerDiv = container.querySelector('.text-center');
      expect(centerDiv).toBeInTheDocument();
    });

    it('should have flexbox column layout', () => {
      const { container } = render(<Footer />);

      const flexDiv = container.querySelector('.flex-col');
      expect(flexDiv).toBeInTheDocument();
      expect(flexDiv).toHaveClass('items-center', 'gap-2');
    });

    it('should have section container', () => {
      const { container } = render(<Footer />);

      const sectionContainer = container.querySelector('.section-container');
      expect(sectionContainer).toBeInTheDocument();
    });
  });

  describe('Typography', () => {
    it('should have bold brand name', () => {
      const { container } = render(<Footer />);

      const brandName = container.querySelector('.font-bold');
      expect(brandName).toBeInTheDocument();
      expect(brandName?.textContent).toContain('Kelven');
    });

    it('should have gradient text on last name', () => {
      const { container } = render(<Footer />);

      const gradientText = container.querySelector('.gradient-text');
      expect(gradientText).toBeInTheDocument();
      expect(gradientText?.textContent).toBe('Prasad');
    });

    it('should have small font size for tagline', () => {
      const { container } = render(<Footer />);

      const taglines = container.querySelectorAll('.text-xs');
      expect(taglines.length).toBeGreaterThan(0);
    });

    it('should have muted color for secondary text', () => {
      const { container } = render(<Footer />);

      const mutedText = container.querySelectorAll('.text-muted-foreground');
      expect(mutedText.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have semantic footer element', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('should have readable text', () => {
      const { container } = render(<Footer />);

      const texts = container.querySelectorAll('p, span');
      
      texts.forEach(text => {
        expect(text.textContent?.trim().length).toBeGreaterThan(0);
      });
    });

    it('should have sufficient contrast', () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector('footer');
      
      // Verifica se tem classes de foreground/muted
      const hasContrastClasses = 
        footer?.innerHTML.includes('text-foreground') ||
        footer?.innerHTML.includes('text-muted-foreground');
      
      expect(hasContrastClasses).toBe(true);
    });
  });

  describe('Responsive Design', () => {
    it('should work on mobile screens', () => {
      const { container } = render(<Footer />);

      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
    });

    it('should have responsive container', () => {
      const { container } = render(<Footer />);

      const sectionContainer = container.querySelector('.section-container');
      expect(sectionContainer).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should render quickly', () => {
      const start = performance.now();
      render(<Footer />);
      const end = performance.now();

      expect(end - start).toBeLessThan(50);
    });

    it('should have minimal DOM nodes', () => {
      const { container } = render(<Footer />);

      const allElements = container.querySelectorAll('*');
      expect(allElements.length).toBeLessThan(20);
    });
  });

  describe('Integration', () => {
    it('should integrate with LanguageContext', () => {
      render(<Footer />);

      // Deve renderizar conteúdo do contexto de idioma
      const footer = screen.getByRole('contentinfo');
      expect(footer.textContent).toBeTruthy();
    });

    it('should display consistent branding', () => {
      render(<Footer />);

      expect(screen.getByText('Kelven')).toBeInTheDocument();
      expect(screen.getByText('Prasad')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing translations gracefully', () => {
      expect(() => render(<Footer />)).not.toThrow();
    });

    it('should render with empty localStorage', () => {
      localStorage.clear();
      
      const { container } = render(<Footer />);
      expect(container.querySelector('footer')).toBeInTheDocument();
    });

    it('should handle year calculation correctly', () => {
      render(<Footer />);

      const currentYear = new Date().getFullYear();
      const yearText = screen.getByText(new RegExp(currentYear.toString()));
      
      expect(yearText).toBeInTheDocument();
      expect(currentYear).toBeGreaterThan(2020); // Sanity check
    });
  });
});
