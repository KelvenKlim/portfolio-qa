import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('lib/utils', () => {
  describe('cn()', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toBe('base-class active-class');
    });

    it('should remove false/undefined/null values', () => {
      const result = cn('base', false, undefined, null, 'valid');
      expect(result).toBe('base valid');
    });

    it('should override conflicting Tailwind classes', () => {
      const result = cn('p-4', 'p-8');
      expect(result).toBe('p-8');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['text-sm', 'font-bold'], 'text-center');
      expect(result).toBe('text-sm font-bold text-center');
    });

    it('should handle objects with conditional classes', () => {
      const result = cn({
        'text-red-500': true,
        'bg-blue-500': false,
        'p-4': true,
      });
      expect(result).toBe('text-red-500 p-4');
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle complex combinations', () => {
      const variant = 'primary';
      const size = 'lg';
      const result = cn(
        'base-button',
        variant === 'primary' && 'bg-primary text-white',
        size === 'lg' && 'px-8 py-4',
        { 'hover:bg-primary-dark': true }
      );
      expect(result).toContain('base-button');
      expect(result).toContain('bg-primary');
      expect(result).toContain('px-8');
    });

    it('should be performant with many classes', () => {
      const start = performance.now();
      const classes = Array(100).fill('text-sm');
      const result = cn(...classes);
      const end = performance.now();
      
      expect(result).toBe('text-sm');
      expect(end - start).toBeLessThan(10); // Should be < 10ms
    });
  });
});
