import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: "Passa Bola - Futebol Feminino",
  description: "Plataforma dedicada ao futebol feminino, conectando jogadoras, torcedoras e amantes do esporte.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}