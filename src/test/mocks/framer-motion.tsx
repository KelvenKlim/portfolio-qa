/**
 * Mock for framer-motion to speed up tests
 * Removes animations and simplifies motion components
 */

import { vi } from 'vitest';

const actualMotion = await vi.importActual<typeof import('framer-motion')>('framer-motion');

export const motion = {
  div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
  header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
  footer: ({ children, ...props }: any) => <footer {...props}>{children}</footer>,
  ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
  li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
  h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
};

export const AnimatePresence = ({ children }: any) => <>{children}</>;

export const useAnimation = () => ({
  start: vi.fn(),
  stop: vi.fn(),
  set: vi.fn(),
});

export const useInView = () => [vi.fn(), true];

export const useMotionValue = (initial: number) => ({
  get: () => initial,
  set: vi.fn(),
  onChange: vi.fn(),
});

export const useTransform = () => 0;

export const useScroll = () => ({
  scrollY: { get: () => 0, onChange: vi.fn() },
  scrollYProgress: { get: () => 0, onChange: vi.fn() },
});

// Export everything else from actual framer-motion
export * from 'framer-motion';
