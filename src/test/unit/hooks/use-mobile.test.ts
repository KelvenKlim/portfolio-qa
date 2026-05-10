import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useIsMobile } from '@/hooks/use-mobile';

describe('hooks/use-mobile', () => {
  const MOBILE_BREAKPOINT = 768;

  let originalInnerWidth: number;
  let matchMediaMock: any;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
    
    matchMediaMock = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  describe('Initial State', () => {
    it('should return false for desktop screens (>= 768px)', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });

    it('should return true for mobile screens (< 768px)', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    it('should return true at exactly 767px (mobile)', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 767,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    it('should return false at exactly 768px (desktop)', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      const { result } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('should update when window is resized from desktop to mobile', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { result, rerender } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(false);
      });

      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const changeHandler = matchMediaMock.mock.results[0]?.value.addEventListener.mock.calls[0]?.[1];
      if (changeHandler) {
        changeHandler();
      }

      rerender();

      await waitFor(() => {
        expect(result.current).toBe(true);
      });
    });

    it('should update when window is resized from mobile to desktop', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const { result, rerender } = renderHook(() => useIsMobile());

      await waitFor(() => {
        expect(result.current).toBe(true);
      });

      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const changeHandler = matchMediaMock.mock.results[0]?.value.addEventListener.mock.calls[0]?.[1];
      if (changeHandler) {
        changeHandler();
      }

      rerender();

      await waitFor(() => {
        expect(result.current).toBe(false);
      });
    });
  });

  describe('Cleanup', () => {
    it('should remove event listener on unmount', () => {
      const removeEventListenerSpy = vi.fn();
      
      matchMediaMock = vi.fn().mockImplementation(() => ({
        matches: false,
        media: '',
        addEventListener: vi.fn(),
        removeEventListener: removeEventListenerSpy,
      }));

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: matchMediaMock,
      });

      const { unmount } = renderHook(() => useIsMobile());
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('change', expect.any(Function));
    });
  });

  describe('Performance', () => {
    it('should not cause unnecessary re-renders', async () => {
      let renderCount = 0;

      const { rerender } = renderHook(() => {
        renderCount++;
        return useIsMobile();
      });

      // Wait for initial render to complete
      await waitFor(() => {
        expect(renderCount).toBeGreaterThanOrEqual(1);
      });

      const countAfterInitial = renderCount;

      rerender();
      rerender();
      rerender();

      expect(renderCount).toBe(countAfterInitial + 3);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined initial state gracefully', () => {
      const { result } = renderHook(() => useIsMobile());
      
      expect(typeof result.current).toBe('boolean');
    });

    it('should work with common device widths', async () => {
      const testCases = [
        { width: 320, expected: true, device: 'iPhone SE' },
        { width: 375, expected: true, device: 'iPhone 12' },
        { width: 414, expected: true, device: 'iPhone 12 Pro Max' },
        { width: 768, expected: false, device: 'iPad' },
        { width: 1024, expected: false, device: 'iPad Pro' },
        { width: 1440, expected: false, device: 'Laptop' },
        { width: 1920, expected: false, device: 'Desktop' },
      ];

      for (const { width, expected, device } of testCases) {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });

        const { result } = renderHook(() => useIsMobile());

        await waitFor(() => {
          expect(result.current).toBe(expected);
        }, { timeout: 1000 });
      }
    });
  });
});
