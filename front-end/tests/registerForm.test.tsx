import RegisterForm from '@components/registerForm';
import { render, screen } from '@testing-library/react';

test("AdminUserOverview renders correctly", () => {
    const component = render(<RegisterForm />);
    expect(screen).toContain(component);
});