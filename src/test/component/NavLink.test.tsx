import { describe, it, expect, beforeEach } from 'vitest';
import { render as rtlRender, screen } from '@testing-library/react';
import type { ReactElement } from 'react';
import { NavLink } from '@/components/NavLink';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

// Custom render for NavLink tests (without BrowserRouter from test-utils)
const render = (ui: ReactElement, options = {}) => {
  return rtlRender(ui, options);
};

describe('components/NavLink', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('Rendering', () => {
    it('should render a link element', () => {
      render(
        <MemoryRouter>
          <NavLink to="/about">About</NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link', { name: /about/i });
      expect(link).toBeInTheDocument();
    });

    it('should render with children', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test">Test Link</NavLink>
        </MemoryRouter>
      );

      expect(screen.getByText('Test Link')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test" className="custom-class">
            Link
          </NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('custom-class');
    });

    it('should apply href attribute correctly', () => {
      render(
        <MemoryRouter>
          <NavLink to="/about">About</NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/about');
    });
  });

  describe('Active State', () => {
    it('should apply activeClassName when route is active', () => {
      render(
        <MemoryRouter initialEntries={['/about']}>
          <Routes>
            <Route
              path="/about"
              element={
                <NavLink to="/about" activeClassName="active">
                  About
                </NavLink>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('active');
    });

    it('should not apply activeClassName when route is not active', () => {
      render(
        <MemoryRouter initialEntries={['/home']}>
          <Routes>
            <Route
              path="*"
              element={
                <NavLink to="/about" activeClassName="active">
                  About
                </NavLink>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).not.toHaveClass('active');
    });

    it('should combine className and activeClassName when active', () => {
      render(
        <MemoryRouter initialEntries={['/contact']}>
          <Routes>
            <Route
              path="/contact"
              element={
                <NavLink
                  to="/contact"
                  className="nav-link"
                  activeClassName="nav-link-active"
                >
                  Contact
                </NavLink>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('nav-link');
      expect(link).toHaveClass('nav-link-active');
    });

    it('should handle multiple active links correctly', () => {
      render(
        <MemoryRouter initialEntries={['/services']}>
          <Routes>
            <Route
              path="/services"
              element={
                <>
                  <NavLink to="/services" activeClassName="active">
                    Services
                  </NavLink>
                  <NavLink to="/about" activeClassName="active">
                    About
                  </NavLink>
                </>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      const servicesLink = screen.getByRole('link', { name: /services/i });
      const aboutLink = screen.getByRole('link', { name: /about/i });

      expect(servicesLink).toHaveClass('active');
      expect(aboutLink).not.toHaveClass('active');
    });
  });

  describe('Pending State', () => {
    it('should apply pendingClassName when provided', () => {
      // Note: isPending is harder to test without navigation simulation
      // This test verifies the prop is accepted
      const { container } = render(
        <MemoryRouter>
          <NavLink to="/test" pendingClassName="pending">
            Test
          </NavLink>
        </MemoryRouter>
      );

      expect(container.querySelector('a')).toBeInTheDocument();
    });

    it('should combine all classNames when pending', () => {
      render(
        <MemoryRouter>
          <NavLink
            to="/test"
            className="base"
            activeClassName="active"
            pendingClassName="pending"
          >
            Link
          </NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('base');
    });
  });

  describe('Props Forwarding', () => {
    it('should forward standard anchor props', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test" title="Test Title" aria-label="Test Label">
            Link
          </NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('title', 'Test Title');
      expect(link).toHaveAttribute('aria-label', 'Test Label');
    });

    it('should forward data attributes', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test" data-testid="custom-link" data-tracking="click">
            Link
          </NavLink>
        </MemoryRouter>
      );

      const link = screen.getByTestId('custom-link');
      expect(link).toHaveAttribute('data-tracking', 'click');
    });

    it('should support ref forwarding', () => {
      let linkRef: HTMLAnchorElement | null = null;

      const TestComponent = () => {
        return (
          <MemoryRouter>
            <NavLink
              to="/test"
              ref={(el) => {
                linkRef = el;
              }}
            >
              Link
            </NavLink>
          </MemoryRouter>
        );
      };

      render(<TestComponent />);

      expect(linkRef).toBeInstanceOf(HTMLAnchorElement);
    });
  });

  describe('Routing Behavior', () => {
    it('should navigate to absolute paths', () => {
      render(
        <MemoryRouter>
          <NavLink to="/absolute/path">Absolute</NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/absolute/path');
    });

    it('should handle hash links', () => {
      render(
        <MemoryRouter>
          <NavLink to="#section">Section</NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      // React Router adds / before the hash
      expect(link).toHaveAttribute('href', '/#section');
    });

    it('should handle query parameters', () => {
      render(
        <MemoryRouter>
          <NavLink to="/search?q=test">Search</NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/search?q=test');
    });

    it('should work with location objects', () => {
      render(
        <MemoryRouter>
          <NavLink to={{ pathname: '/test', search: '?id=1' }}>
            Location Object
          </NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/test?id=1');
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test">Keyboard Link</NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href');
      // Links are natively keyboard accessible
    });

    it('should have proper role', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test">Link</NavLink>
        </MemoryRouter>
      );

      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('should support aria-current on active links', () => {
      render(
        <MemoryRouter initialEntries={['/current']}>
          <Routes>
            <Route
              path="/current"
              element={
                <NavLink to="/current" aria-current="page">
                  Current Page
                </NavLink>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('aria-current', 'page');
    });

    it('should support custom aria-label', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test" aria-label="Custom navigation label">
            Nav
          </NavLink>
        </MemoryRouter>
      );

      const link = screen.getByLabelText('Custom navigation label');
      expect(link).toBeInTheDocument();
    });
  });

  describe('ClassName Utility', () => {
    it('should merge classNames using cn utility', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test" className="class1 class2">
            Link
          </NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('class1');
      expect(link).toHaveClass('class2');
    });

    it('should handle undefined className gracefully', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test">Link</NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should handle empty className', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test" className="">
            Link
          </NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long URLs', () => {
      const longUrl = '/very/long/path/with/many/segments/'.repeat(10);
      render(
        <MemoryRouter>
          <NavLink to={longUrl}>Long URL</NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', longUrl);
    });

    it('should render without activeClassName', () => {
      render(
        <MemoryRouter initialEntries={['/test']}>
          <Routes>
            <Route
              path="/test"
              element={
                <NavLink to="/test" className="nav-link">
                  Test
                </NavLink>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveClass('nav-link');
    });

    it('should handle special characters in links', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test?name=José&city=São Paulo">Special Chars</NavLink>
        </MemoryRouter>
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href');
    });

    it('should render with complex children', () => {
      render(
        <MemoryRouter>
          <NavLink to="/test">
            <span className="icon">🔗</span>
            <span className="text">Complex Link</span>
          </NavLink>
        </MemoryRouter>
      );

      expect(screen.getByText('🔗')).toBeInTheDocument();
      expect(screen.getByText('Complex Link')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should render quickly', () => {
      const startTime = performance.now();

      render(
        <MemoryRouter>
          <NavLink to="/test">Link</NavLink>
        </MemoryRouter>
      );

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100);
    });

    it('should handle multiple links efficiently', () => {
      const links = Array.from({ length: 50 }, (_, i) => (
        <NavLink key={i} to={`/link-${i}`}>
          Link {i}
        </NavLink>
      ));

      const startTime = performance.now();

      render(<MemoryRouter>{links}</MemoryRouter>);

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(500);
    });
  });

  describe('Display Name', () => {
    it('should have correct displayName', () => {
      expect(NavLink.displayName).toBe('NavLink');
    });
  });
});
