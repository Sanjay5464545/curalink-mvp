// frontend/app/layout.js
import './globals.css';

export const metadata = {
  title: 'CuraLink',
  description: 'AI Health Assistant',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-slate-800 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
  