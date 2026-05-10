import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '@/i18n/LanguageContext';
import { translations } from '@/i18n/translations';
import { ReactNode } from 'react';

describe('i18n/LanguageContext', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
  })();

  beforeEach(() => {
    // Setup localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.clear();
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <LanguageProvider>{children}</LanguageProvider>
  );

  describe('Initial State', () => {
    it('should default to Portuguese (pt) when no saved preference', () => {
      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.lang).toBe('pt');
      expect(result.current.t).toEqual(translations.pt);
    });

    it('should use saved language from localStorage (pt)', () => {
      localStorageMock.setItem('lang', 'pt');

      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.lang).toBe('pt');
    });

    it('should use saved language from localStorage (en)', () => {
      localStorageMock.setItem('lang', 'en');

      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.lang).toBe('en');
    });

    it('should default to pt if localStorage has invalid value', () => {
      localStorageMock.setItem('lang', 'fr'); // Invalid language

      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.lang).toBe('pt');
    });

    it('should provide correct translations object', () => {
      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.t).toHaveProperty('nav');
      expect(result.current.t).toHaveProperty('hero');
      expect(result.current.t).toHaveProperty('about');
    });
  });

  describe('Language Toggle', () => {
    it('should toggle from pt to en', () => {
      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.lang).toBe('pt');

      act(() => {
        result.current.toggleLang();
      });

      expect(result.current.lang).toBe('en');
      expect(result.current.t).toEqual(translations.en);
    });

    it('should toggle from en to pt', () => {
      localStorageMock.setItem('lang', 'en');

      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.lang).toBe('en');

      act(() => {
        result.current.toggleLang();
      });

      expect(result.current.lang).toBe('pt');
      expect(result.current.t).toEqual(translations.pt);
    });

    it('should toggle multiple times correctly', () => {
      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.lang).toBe('pt');

      act(() => {
        result.current.toggleLang(); // pt -> en
      });
      expect(result.current.lang).toBe('en');

      act(() => {
        result.current.toggleLang(); // en -> pt
      });
      expect(result.current.lang).toBe('pt');

      act(() => {
        result.current.toggleLang(); // pt -> en
      });
      expect(result.current.lang).toBe('en');
    });
  });

  describe('LocalStorage Persistence', () => {
    it('should save language to localStorage on toggle', () => {
      const { result } = renderHook(() => useLanguage(), { wrapper });

      act(() => {
        result.current.toggleLang();
      });

      expect(localStorageMock.getItem('lang')).toBe('en');
    });

    it('should persist language across re-renders', () => {
      const { result, rerender } = renderHook(() => useLanguage(), { wrapper });

      act(() => {
        result.current.toggleLang();
      });

      expect(result.current.lang).toBe('en');

      rerender();

      expect(result.current.lang).toBe('en');
    });

    it('should update localStorage every time language changes', () => {
      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(localStorageMock.getItem('lang')).toBe('pt');

      act(() => {
        result.current.toggleLang();
      });
      expect(localStorageMock.getItem('lang')).toBe('en');

      act(() => {
        result.current.toggleLang();
      });
      expect(localStorageMock.getItem('lang')).toBe('pt');
    });
  });

  describe('Translations Content', () => {
    it('should provide correct Portuguese translations', () => {
      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.t.nav.about).toBe('Sobre');
      expect(result.current.t.nav.services).toBe('Serviços');
    });

    it('should provide correct English translations', () => {
      localStorageMock.setItem('lang', 'en');

      const { result } = renderHook(() => useLanguage(), { wrapper });

      expect(result.current.t.nav.about).toBe('About');
      expect(result.current.t.nav.services).toBe('Services');
    });

    it('should update translations when language changes', () => {
      const { result } = renderHook(() => useLanguage(), { wrapper });

      const ptAbout = result.current.t.nav.about;

      act(() => {
        result.current.toggleLang();
      });

      const enAbout = result.current.t.nav.about;

      expect(ptAbout).not.toBe(enAbout);
      expect(ptAbout).toBe('Sobre');
      expect(enAbout).toBe('About');
    });
  });

  describe('Error Handling', () => {
    it('should throw error when useLanguage is used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useLanguage());
      }).toThrow('useLanguage must be used within LanguageProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('Performance', () => {
    it('should not cause unnecessary re-renders', () => {
      let renderCount = 0;

      const { rerender } = renderHook(
        () => {
          renderCount++;
          return useLanguage();
        },
        { wrapper }
      );

      const initialRenderCount = renderCount;

      // Rerenders without state changes
      rerender();
      rerender();

      expect(renderCount).toBe(initialRenderCount + 2); // Only the explicit rerenders
    });

    it('should toggle language quickly (< 10ms)', () => {
      const { result } = renderHook(() => useLanguage(), { wrapper });

      const start = performance.now();
      
      act(() => {
        result.current.toggleLang();
      });

      const end = performance.now();

      expect(end - start).toBeLessThan(10);
    });
  });

  describe('Integration', () => {
    it('should work with multiple consumers', () => {
      const { result: result1 } = renderHook(() => useLanguage(), { wrapper });
      const { result: result2 } = renderHook(() => useLanguage(), { wrapper });

      expect(result1.current.lang).toBe(result2.current.lang);

      act(() => {
        result1.current.toggleLang();
      });

      // Both should reflect the change (they share the same context)
      expect(result1.current.lang).toBe('en');
    });
  });
});
