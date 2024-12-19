import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthService from '@services/authService';
import { useRouter } from 'next/router';
import RegisterForm from '@components/registerForm';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mocking the AuthService and Helper functions
jest.mock('@services/authService');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('RegisterForm', () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders register form correctly', () => {
    render(<RegisterForm />);

    expect(screen.getByText(/register/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  test('handles input changes', async () => {
    render(<RegisterForm />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(usernameInput).toHaveValue('testuser');
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('shows error message when registration fails', async () => {
    (AuthService.registerUser as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'An error occurred' }),
    });

    render(<RegisterForm />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/register/i);

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(/an error occurred/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('redirects on successful registration', async () => {
    (AuthService.registerUser as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'dummy-token' }),
    });

    render(<RegisterForm />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/register/i);

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    fireEvent.click(submitButton);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });

  test('displays loading state correctly', async () => {
    (AuthService.registerUser as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'dummy-token' }),
    });

    render(<RegisterForm />);

    const usernameInput = screen.getByPlaceholderText(/username/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByText(/register/i);

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    fireEvent.click(submitButton);

    expect(screen.queryByText(/loading/i)).toBeInTheDocument();
  });
});
