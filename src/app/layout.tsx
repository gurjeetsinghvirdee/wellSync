export const metadata = {
  title: 'wellSync',
  description: 'Fitness Tracker & Wellness Journal',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
