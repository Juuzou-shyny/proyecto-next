import '@/app/ui/global.css';
import {montserrat} from './ui/fonts'
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  className={`${montserrat.className} antialiased`}>
        {children}
        <footer className='py-10 flex justify-center items-center'></footer>
        <p className="text-center mt-4">Hecho con amor de la gente de Vercel ❤️</p>
        </body>
    </html>
  );
}
