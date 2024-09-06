import './global.css';

export const metadata = {
  title: 'next sev',
  description: 'just for fun',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head>
        <link rel="icon" type="image/png" href="favicon.png" />
      </head>
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
