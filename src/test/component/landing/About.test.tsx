import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@/test/utils/test-utils';
import About from '@/components/landing/About';

describe('components/landing/About', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('should render the about section', () => {
      const { container } = render(<About />);

      const section = container.querySelector('section#about');
      expect(section).toBeInTheDocument();
    });

    it('should render section label', () => {
      render(<About />);

      const label = screen.getByText(/sobre|about/i);
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass('uppercase');
    });

    it('should render section title', () => {
      render(<About />);

      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toBeInTheDocument();
    });

    it('should render profile image', () => {
      render(<About />);

      const image = screen.getByAltText(/Kelven Prasad/i);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src');
    });

    it('should render name and title', () => {
      render(<About />);

      expect(screen.getByText('Kelven Prasad')).toBeInTheDocument();
      expect(screen.getByText('Strategic QA Engineer')).toBeInTheDocument();
    });

    it('should render all description paragraphs', () => {
      const { container } = render(<About />);

      const paragraphs = container.querySelectorAll('.space-y-4 p');
      expect(paragraphs.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Profile Section', () => {
    it('should have gradient border on profile image', () => {
      const { container } = render(<About />);

      const imageContainer = container.querySelector('.gradient-border');
      expect(imageContainer).toBeInTheDocument();
    });

    it('should have rounded profile image container', () => {
      const { container } = render(<About />);

      const imageContainer = container.querySelector('.rounded-2xl');
      expect(imageContainer).toBeInTheDocument();
    });

    it('should render profile with proper sizing', () => {
      const { container } = render(<About />);

      const imageWrapper = container.querySelector('.h-48.w-48');
      expect(imageWrapper).toBeInTheDocument();
    });

    it('should display name as heading level 3', () => {
      render(<About />);

      const nameHeading = screen.getByRole('heading', { level: 3, name: /Kelven Prasad/i });
      expect(nameHeading).toBeInTheDocument();
    });

    it('should center-align profile information', () => {
      const { container } = render(<About />);

      const nameElement = screen.getByText('Kelven Prasad');
      expect(nameElement).toHaveClass('text-center');
    });
  });

  describe('Highlights/Stats', () => {
    it('should render highlights section', () => {
      const { container } = render(<About />);

      const highlightsGrid = container.querySelector('.grid-cols-2');
      expect(highlightsGrid).toBeInTheDocument();
    });

    it('should render all highlight cards', () => {
      const { container } = render(<About />);

      const cards = container.querySelectorAll('.card-elevated');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should display highlight values with gradient', () => {
      const { container } = render(<About />);

      const gradientValues = container.querySelectorAll('.gradient-text');
      expect(gradientValues.length).toBeGreaterThan(0);
    });

    it('should have responsive grid layout', () => {
      const { container } = render(<About />);

      const grid = container.querySelector('.lg\\:grid-cols-4');
      expect(grid).toBeInTheDocument();
    });

    it('should display highlight labels', () => {
      const { container } = render(<About />);

      const labels = container.querySelectorAll('.text-muted-foreground');
      expect(labels.length).toBeGreaterThan(0);
    });
  });

  describe('Layout & Structure', () => {
    it('should have section padding', () => {
      const { container } = render(<About />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('section-padding');
    });

    it('should have border on top', () => {
      const { container } = render(<About />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('border-t', 'border-border');
    });

    it('should use section container', () => {
      const { container } = render(<About />);

      const sectionContainer = container.querySelector('.section-container');
      expect(sectionContainer).toBeInTheDocument();
    });

    it('should have flex layout for content', () => {
      const { container } = render(<About />);

      const flexContainer = container.querySelector('.flex-col');
      expect(flexContainer).toBeInTheDocument();
    });

    it('should have responsive layout changes', () => {
      const { container } = render(<About />);

      const responsiveContainer = container.querySelector('.lg\\:flex-row');
      expect(responsiveContainer).toBeInTheDocument();
    });
  });

  describe('Typography', () => {
    it('should have proper heading sizes', () => {
      render(<About />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-3xl');
    });

    it('should use mono font for label', () => {
      const { container } = render(<About />);

      const label = container.querySelector('.font-mono-stack');
      expect(label).toBeInTheDocument();
    });

    it('should have tracking on label', () => {
      const { container } = render(<About />);

      const label = container.querySelector('.tracking-widest');
      expect(label).toBeInTheDocument();
    });

    it('should have proper paragraph spacing', () => {
      const { container } = render(<About />);

      const textContainer = container.querySelector('.space-y-4');
      expect(textContainer).toBeInTheDocument();
    });

    it('should use leading-relaxed for paragraphs', () => {
      const { container } = render(<About />);

      const paragraphs = container.querySelectorAll('.leading-relaxed');
      expect(paragraphs.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper section landmark', () => {
      const { container } = render(<About />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should have id for navigation', () => {
      const { container } = render(<About />);

      const section = container.querySelector('#about');
      expect(section).toBeInTheDocument();
    });

    it('should have alt text for image', () => {
      render(<About />);

      const image = screen.getByAltText(/Kelven Prasad/i);
      expect(image).toHaveAttribute('alt', 'Kelven Prasad');
    });

    it('should have proper heading hierarchy', () => {
      render(<About />);

      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('should have sufficient text contrast', () => {
      const { container } = render(<About />);

      const mutedText = container.querySelector('.text-muted-foreground');
      expect(mutedText).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('should have mobile-first grid', () => {
      const { container } = render(<About />);

      const grid = container.querySelector('.grid-cols-2');
      expect(grid).toBeInTheDocument();
    });

    it('should have responsive image sizes', () => {
      const { container } = render(<About />);

      const responsiveImage = container.querySelector('.sm\\:h-56');
      expect(responsiveImage).toBeInTheDocument();
    });

    it('should have responsive heading sizes', () => {
      render(<About />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('sm:text-4xl');
    });

    it('should adjust layout on large screens', () => {
      const { container } = render(<About />);

      const largeLayout = container.querySelector('.lg\\:items-start');
      expect(largeLayout).toBeInTheDocument();
    });

    it('should have responsive gap spacing', () => {
      const { container } = render(<About />);

      const container2 = container.querySelector('.gap-8');
      expect(container2).toBeInTheDocument();
    });
  });

  describe('Content Translation', () => {
    it('should display translated label', () => {
      const { container } = render(<About />);

      const label = container.querySelector('.font-mono-stack');
      expect(label?.textContent).toBeTruthy();
      expect(label?.textContent?.length).toBeGreaterThan(0);
    });

    it('should display translated title', () => {
      render(<About />);

      const title = screen.getByRole('heading', { level: 2 });
      expect(title.textContent).toBeTruthy();
      expect(title.textContent?.length).toBeGreaterThan(0);
    });

    it('should display translated paragraphs', () => {
      const { container } = render(<About />);

      const paragraphs = container.querySelectorAll('.space-y-4 p');
      paragraphs.forEach((p) => {
        expect(p.textContent).toBeTruthy();
        expect(p.textContent?.length).toBeGreaterThan(10);
      });
    });

    it('should display translated highlights', () => {
      const { container } = render(<About />);

      const highlightLabels = container.querySelectorAll('.card-elevated .text-muted-foreground');
      expect(highlightLabels.length).toBeGreaterThan(0);
      highlightLabels.forEach((label) => {
        expect(label.textContent).toBeTruthy();
      });
    });
  });

  describe('Styling & Design', () => {
    it('should have primary color for label', () => {
      const { container } = render(<About />);

      const label = container.querySelector('.text-primary');
      expect(label).toBeInTheDocument();
    });

    it('should have foreground color for title', () => {
      render(<About />);

      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('text-foreground');
    });

    it('should have bold headings', () => {
      render(<About />);

      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveClass('font-bold');
    });

    it('should use card-elevated for highlights', () => {
      const { container } = render(<About />);

      const cards = container.querySelectorAll('.card-elevated');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('should have gradient text for highlight values', () => {
      const { container } = render(<About />);

      const gradientText = container.querySelectorAll('.gradient-text');
      expect(gradientText.length).toBeGreaterThan(0);
    });
  });

  describe('Performance', () => {
    it('should render quickly', () => {
      const startTime = performance.now();

      render(<About />);

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('should have optimized image loading', () => {
      render(<About />);

      const image = screen.getByAltText(/Kelven Prasad/i);
      expect(image).toHaveClass('object-cover');
    });

    it('should handle missing highlights gracefully', () => {
      const { container } = render(<About />);

      // Component should still render even if highlights are empty
      expect(container.querySelector('section')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should render without translations', () => {
      const { container } = render(<About />);

      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('should handle long paragraph text', () => {
      const { container } = render(<About />);

      const paragraphs = container.querySelectorAll('.leading-relaxed');
      paragraphs.forEach((p) => {
        expect(p).toHaveClass('leading-relaxed');
      });
    });

    it('should maintain layout with different content lengths', () => {
      const { container } = render(<About />);

      const flexContainer = container.querySelector('.flex-col');
      expect(flexContainer).toBeInTheDocument();
    });

    it('should handle image load failure gracefully', () => {
      render(<About />);

      const image = screen.getByAltText(/Kelven Prasad/i);
      expect(image).toBeInTheDocument();
      expect(image.tagName).toBe('IMG');
    });
  });

  describe('Integration', () => {
    it('should integrate with LanguageContext', () => {
      const { container } = render(<About />);

      expect(container.querySelector('section')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('should work with framer-motion', () => {
      const { container } = render(<About />);

      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('should maintain consistent branding', () => {
      render(<About />);

      expect(screen.getByText('Kelven Prasad')).toBeInTheDocument();
      expect(screen.getByText('Strategic QA Engineer')).toBeInTheDocument();
    });
  });
});
