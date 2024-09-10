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
      </head>
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
