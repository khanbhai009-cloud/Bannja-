// app/layout.tsx

export const metadata = {
  title: 'Bannja Shop',
  description: 'Luxury & Trendy Items',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}