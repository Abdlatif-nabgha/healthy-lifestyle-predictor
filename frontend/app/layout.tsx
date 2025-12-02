// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "Healthy Lifestyle App",
  description: "Predict your lifestyle health.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  );
}
