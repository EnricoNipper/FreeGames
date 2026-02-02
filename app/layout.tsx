import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FreeGames Hub - Jogos Grátis Para PC, Steam, Epic Games",
  description: "Descubra jogos AAA grátis da Epic Games, Steam, GOG e muito mais. Atualizado diariamente. 100% Legal e sem pegadinhas!",
  keywords: "jogos grátis, free games, epic games, steam, gog, pc games, jogos gratis pc",
  authors: [{ name: "FreeGames Hub" }],
  openGraph: {
    title: "FreeGames Hub - Jogos Grátis Para PC",
    description: "Descubra jogos AAA grátis da Epic Games, Steam, GOG e muito mais.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Consent Mode v2 (ANTES do AdSense) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Default consent (granted para desenvolvimento/teste)
              gtag('consent', 'default', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted'
              });
            `,
          }}
        />
        
        {/* Google AdSense */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
