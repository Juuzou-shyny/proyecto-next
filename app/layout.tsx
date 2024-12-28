import '@/app/ui/global.css';
import {montserrat} from './ui/fonts'
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
