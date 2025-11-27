import './globals.css'

export const metadata = {
  title: 'HealthVibe AI',
  description: 'Your Personal Lifestyle Intelligence',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}