import { createRoot } from 'react-dom/client';
import App from './App';

async function mountApp() {
  if (process.env.NODE_ENV === 'development') {
    const { worker } = await import('./mock/browser');
    await worker.start(); // MSW 시작 (worker.start()가 완료될 때까지 기다림)
  }

  createRoot(document.getElementById('root')!).render(<App />);
}

mountApp();
