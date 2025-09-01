import './global.css';
import { RudderstackProvider } from '@/components/RudderstackProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
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
          <title>next-sev</title></head>
      <body>
        <RudderstackProvider>
          <div>
            {children}
          </div>
        </RudderstackProvider>
      </body>
    </html>
  )
}
