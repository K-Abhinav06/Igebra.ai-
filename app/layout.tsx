'use client';

import type { ReactNode } from 'react';
import { Navbar } from './components/navbar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>EduAI - Personalized Education AI Platform</title>
        <meta name="description" content="AI-powered personalized learning platform for students" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
