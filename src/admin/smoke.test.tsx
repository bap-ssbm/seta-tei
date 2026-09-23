import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../login/Login';
import Admin from './Admin';

test('ログイン画面が表示される', async () => {
  render(<MemoryRouter><Login /></MemoryRouter>);
  await waitFor(() => screen.getByText('管理画面ログイン'));
  expect(screen.getByLabelText('ユーザー名')).toBeTruthy();
  expect(screen.getByLabelText('パスワード')).toBeTruthy();
});

test('未設定時は管理画面が案内を表示する', async () => {
  render(<MemoryRouter><Admin /></MemoryRouter>);
  await waitFor(() => screen.getByText(/Supabase が設定されていません/));
});
