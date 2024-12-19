import { render, screen, fireEvent } from '@testing-library/react';
import ScrollToTopButton from '@components/scrollToTopButton';

describe('ScrollToTopButton', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  test('should be hidden when the user is at the top of the page', () => {
    render(<ScrollToTopButton />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('hidden');
  });

  test('should be visible when the user scrolls down', () => {
    render(<ScrollToTopButton />);
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 100,
    });
    fireEvent.scroll(window);
    const button = screen.getByRole('button');
    expect(button).not.toHaveClass('hidden');
  });

  test('should scroll to the top when clicked', () => {
    render(<ScrollToTopButton />);
    const scrollToMock = jest.fn();
    Object.defineProperty(window, 'scrollTo', { value: scrollToMock });
    fireEvent.click(screen.getByRole('button'));
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
