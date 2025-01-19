import '@/app/ui/global.css';
import {montserrat} from './ui/fonts'
import { Metadata } from 'next';

export const metadata = {
  title: "Tienda de Plantas",
  description: "Encuentra las mejores plantas para tu hogar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-800">
        <nav />
        <main className="min-h-screen">{children}</main>
        <footer />
      </body>
    </html>
  );
}