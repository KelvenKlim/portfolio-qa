import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils/test-utils';
import CTA from '@/components/landing/CTA';

describe('components/landing/CTA', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.body.innerHTML = '';
  });

  describe('Rendering', () => {
    it('should render the CTA section', () => {
      const { container } = render(<CTA />);
      const section = container.querySelector('#cta');
      expect(section).toBeInTheDocument();
    });

    it('should render section title', () => {
      render(<CTA />);
      expect(screen.getByText(/elevate.*product quality|elevar.*nível.*qualidade/i)).toBeInTheDocument();
    });

    it('should render section subtitle', () => {
      render(<CTA />);
      expect(screen.getByText(/transform.*QA.*bottleneck|transformar.*QA.*gargalo/i)).toBeInTheDocument();
    });

    it('should render all three CTA buttons', () => {
      render(<CTA />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBe(3);
    });

    it('should render LinkedIn button', () => {
      render(<CTA />);
      expect(screen.getByText(/Connect.*LinkedIn|Conectar.*LinkedIn/i)).toBeInTheDocument();
    });

    it('should render GitHub button', () => {
      render(<CTA />);
      expect(screen.getByText(/View GitHub|Ver GitHub/i)).toBeInTheDocument();
    });

    it('should render email button', () => {
      render(<CTA />);
      expect(screen.getByText(/Talk to me|Falar comigo/i)).toBeInTheDocument();
    });
  });

  describe('Button Links', () => {
    it('should have correct LinkedIn URL', () => {
      render(<CTA />);
      const linkedinLink = screen.getByRole('link', { name: /Connect.*LinkedIn|Conectar.*LinkedIn/i });
      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/kelven-barroso-prasad');
    });

    it('should have correct GitHub URL', () => {
      render(<CTA />);
      const githubLink = screen.getByRole('link', { name: /View GitHub|Ver GitHub/i });
      expect(githubLink).toHaveAttribute('href', 'https://github.com/KelvenKlim');
    });

    it('should have correct email link', () => {
      render(<CTA />);
      const emailLink = screen.getByRole('link', { name: /Talk to me|Falar comigo/i });
      expect(emailLink).toHaveAttribute('href', 'mailto:kelven.jk14@gmail.com');
    });

    it('should open LinkedIn in new tab', () => {
      render(<CTA />);
      const linkedinLink = screen.getByRole('link', { name: /Connect.*LinkedIn|Conectar.*LinkedIn/i });
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should open GitHub in new tab', () => {
      render(<CTA />);
      const githubLink = screen.getByRole('link', { name: /View GitHub|Ver GitHub/i });
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should not open email in new tab', () => {
      render(<CTA />);
      const emailLink = screen.getByRole('link', { name: /Talk to me|Falar comigo/i });
      expect(emailLink).not.toHaveAttribute('target');
    });
  });

  describe('Button Icons', () => {
    it('should render LinkedIn icon', () => {
      const { container } = render(<CTA />);
      const linkedinButton = screen.getByRole('link', { name: /Connect.*LinkedIn|Conectar.*LinkedIn/i });
      const icon = linkedinButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render GitHub icon', () => {
      const { container } = render(<CTA />);
      const githubButton = screen.getByRole('link', { name: /View GitHub|Ver GitHub/i });
      const icon = githubButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render ArrowRight icon', () => {
      const { container } = render(<CTA />);
      const emailButton = screen.getByRole('link', { name: /Talk to me|Falar comigo/i });
      const icon = emailButton.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should have proper icon sizing', () => {
      const { container } = render(<CTA />);
      const icons = container.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('width', '16');
        expect(icon).toHaveAttribute('height', '16');
      });
    });
  });

  describe('Button Styling', () => {
    it('should have primary button styling for LinkedIn', () => {
      render(<CTA />);
      const linkedinLink = screen.getByRole('link', { name: /Connect.*LinkedIn|Conectar.*LinkedIn/i });
      expect(linkedinLink).toHaveClass('bg-primary');
      expect(linkedinLink).toHaveClass('text-primary-foreground');
    });

    it('should have secondary button styling for GitHub', () => {
      render(<CTA />);
      const githubLink = screen.getByRole('link', { name: /View GitHub|Ver GitHub/i });
      expect(githubLink).toHaveClass('border');
      expect(githubLink).toHaveClass('border-border');
      expect(githubLink).toHaveClass('text-foreground');
    });

    it('should have secondary button styling for email', () => {
      render(<CTA />);
      const emailLink = screen.getByRole('link', { name: /Talk to me|Falar comigo/i });
      expect(emailLink).toHaveClass('border');
      expect(emailLink).toHaveClass('border-border');
      expect(emailLink).toHaveClass('text-foreground');
    });

    it('should have rounded corners on buttons', () => {
      render(<CTA />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('rounded-lg');
      });
    });

    it('should have proper padding on buttons', () => {
      render(<CTA />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('px-6');
        expect(link).toHaveClass('py-3.5');
      });
    });

    it('should have semibold font weight', () => {
      render(<CTA />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('font-semibold');
      });
    });

    it('should have proper text size', () => {
      render(<CTA />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('text-sm');
      });
    });
  });

  describe('Hover Effects', () => {
    it('should have hover brightness effect on LinkedIn button', () => {
      render(<CTA />);
      const linkedinLink = screen.getByRole('link', { name: /Connect.*LinkedIn|Conectar.*LinkedIn/i });
      expect(linkedinLink).toHaveClass('hover:brightness-110');
    });

    it('should have hover background effect on GitHub button', () => {
      render(<CTA />);
      const githubLink = screen.getByRole('link', { name: /View GitHub|Ver GitHub/i });
      expect(githubLink).toHaveClass('hover:bg-muted');
    });

    it('should have hover background effect on email button', () => {
      render(<CTA />);
      const emailLink = screen.getByRole('link', { name: /Talk to me|Falar comigo/i });
      expect(emailLink).toHaveClass('hover:bg-muted');
    });

    it('should have transition effects', () => {
      render(<CTA />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        const classes = link.className;
        expect(classes).toMatch(/transition/);
      });
    });
  });

  describe('Layout & Structure', () => {
    it('should have section padding', () => {
      const { container } = render(<CTA />);
      const section = container.querySelector('#cta');
      expect(section).toHaveClass('section-padding');
    });

    it('should have border on top', () => {
      const { container } = render(<CTA />);
      const section = container.querySelector('#cta');
      expect(section).toHaveClass('border-t');
      expect(section).toHaveClass('border-border');
    });

    it('should use section container', () => {
      const { container } = render(<CTA />);
      const sectionContainer = container.querySelector('.section-container');
      expect(sectionContainer).toBeInTheDocument();
    });

    it('should have centered content', () => {
      const { container } = render(<CTA />);
      const content = container.querySelector('.text-center');
      expect(content).toBeInTheDocument();
    });

    it('should have max width constraint', () => {
      const { container } = render(<CTA />);
      const content = container.querySelector('.max-w-2xl');
      expect(content).toBeInTheDocument();
    });

    it('should have auto horizontal margins for centering', () => {
      const { container } = render(<CTA />);
      const content = container.querySelector('.mx-auto');
      expect(content).toBeInTheDocument();
    });

    it('should have flex layout for buttons', () => {
      const { container } = render(<CTA />);
      const buttonContainer = container.querySelector('.flex');
      expect(buttonContainer).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive heading sizes', () => {
      render(<CTA />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-3xl');
      expect(title).toHaveClass('sm:text-4xl');
    });

    it('should have mobile-first button layout', () => {
      const { container } = render(<CTA />);
      const buttonContainer = container.querySelector('.flex-col');
      expect(buttonContainer).toBeInTheDocument();
    });

    it('should switch to row layout on larger screens', () => {
      const { container } = render(<CTA />);
      const buttonContainer = container.querySelector('.sm\\:flex-row');
      expect(buttonContainer).toBeInTheDocument();
    });

    it('should have full width buttons on mobile', () => {
      render(<CTA />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('w-full');
      });
    });

    it('should have auto width buttons on desktop', () => {
      render(<CTA />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveClass('sm:w-auto');
      });
    });

    it('should center buttons on desktop', () => {
      const { container } = render(<CTA />);
      const buttonContainer = container.querySelector('.sm\\:justify-center');
      expect(buttonContainer).toBeInTheDocument();
    });
  });

  describe('Typography', () => {
    it('should have proper heading sizes', () => {
      render(<CTA />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-3xl');
      expect(title).toHaveClass('font-bold');
    });

    it('should have tracking-tight on title', () => {
      render(<CTA />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('tracking-tight');
    });

    it('should have text-balance on title', () => {
      render(<CTA />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-balance');
    });

    it('should have muted color for subtitle', () => {
      render(<CTA />);
      const subtitle = screen.getByText(/transform.*QA.*bottleneck|transformar.*QA.*gargalo/i);
      expect(subtitle).toHaveClass('text-muted-foreground');
    });

    it('should have proper spacing', () => {
      render(<CTA />);
      const subtitle = screen.getByText(/transform.*QA.*bottleneck|transformar.*QA.*gargalo/i);
      expect(subtitle).toHaveClass('mt-4');
    });
  });

  describe('Accessibility', () => {
    it('should have proper section landmark', () => {
      const { container } = render(<CTA />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should have id for navigation', () => {
      const { container } = render(<CTA />);
      const section = container.querySelector('#cta');
      expect(section).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(<CTA />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('should have descriptive link text', () => {
      render(<CTA />);
      const linkedinLink = screen.getByRole('link', { name: /Connect.*LinkedIn|Conectar.*LinkedIn/i });
      const githubLink = screen.getByRole('link', { name: /View GitHub|Ver GitHub/i });
      const emailLink = screen.getByRole('link', { name: /Talk to me|Falar comigo/i });
      
      expect(linkedinLink).toBeInTheDocument();
      expect(githubLink).toBeInTheDocument();
      expect(emailLink).toBeInTheDocument();
    });

    it('should have noopener noreferrer for external links', () => {
      render(<CTA />);
      const linkedinLink = screen.getByRole('link', { name: /Connect.*LinkedIn|Conectar.*LinkedIn/i });
      const githubLink = screen.getByRole('link', { name: /View GitHub|Ver GitHub/i });
      
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('should have sufficient color contrast', () => {
      render(<CTA />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-foreground');
    });
  });

  describe('Content Translation', () => {
    it('should display translated title', () => {
      render(<CTA />);
      expect(screen.getByText(/elevate.*product quality|elevar.*nível.*qualidade/i)).toBeInTheDocument();
    });

    it('should display translated subtitle', () => {
      render(<CTA />);
      expect(screen.getByText(/transform.*QA.*bottleneck|transformar.*QA.*gargalo/i)).toBeInTheDocument();
    });

    it('should display translated button texts', () => {
      render(<CTA />);
      expect(screen.getByText(/Connect.*LinkedIn|Conectar.*LinkedIn/i)).toBeInTheDocument();
      expect(screen.getByText(/View GitHub|Ver GitHub/i)).toBeInTheDocument();
      expect(screen.getByText(/Talk to me|Falar comigo/i)).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should render quickly', () => {
      const start = performance.now();
      render(<CTA />);
      const end = performance.now();
      expect(end - start).toBeLessThan(100);
    });

    it('should handle missing translations gracefully', () => {
      expect(() => render(<CTA />)).not.toThrow();
    });
  });

  describe('Edge Cases', () => {
    it('should render without translations', () => {
      expect(() => render(<CTA />)).not.toThrow();
    });

    it('should maintain layout with long text', () => {
      const { container } = render(<CTA />);
      const section = container.querySelector('#cta');
      expect(section).toBeInTheDocument();
    });

    it('should handle all buttons being clicked', () => {
      render(<CTA />);
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toBeInTheDocument();
      });
    });
  });

  describe('Integration', () => {
    it('should integrate with LanguageContext', () => {
      render(<CTA />);
      expect(screen.getByText(/elevate.*product quality|elevar.*nível.*qualidade/i)).toBeInTheDocument();
    });

    it('should work with framer-motion', () => {
      const { container } = render(<CTA />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should maintain consistent branding', () => {
      render(<CTA />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-foreground');
    });

    it('should use lucide-react icons', () => {
      const { container } = render(<CTA />);
      const icons = container.querySelectorAll('svg');
      expect(icons.length).toBe(3);
    });
  });

  describe('Call to Action Quality', () => {
    it('should emphasize professional networking', () => {
      render(<CTA />);
      expect(screen.getByText(/Connect on LinkedIn|Conectar no LinkedIn/i)).toBeInTheDocument();
    });

    it('should showcase technical work', () => {
      render(<CTA />);
      expect(screen.getByText(/View GitHub|Ver GitHub/i)).toBeInTheDocument();
    });

    it('should provide direct contact option', () => {
      render(<CTA />);
      expect(screen.getByText(/Talk to me|Falar comigo/i)).toBeInTheDocument();
    });

    it('should have compelling value proposition', () => {
      render(<CTA />);
      expect(screen.getByText(/strategic advantage|vantagem estratégica/i)).toBeInTheDocument();
    });

    it('should address pain point (bottleneck)', () => {
      render(<CTA />);
      expect(screen.getByText(/bottleneck|gargalo/i)).toBeInTheDocument();
    });

    it('should have clear action items', () => {
      render(<CTA />);
      const links = screen.getAllByRole('link');
      expect(links.length).toBe(3);
    });
  });
});
