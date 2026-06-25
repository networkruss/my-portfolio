import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";
import ClientLayout from "./components/ClientLayout";

// Playfair Display for the editorial serif headings
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// Inter for clean, readable body copy, UI text, and button actions
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Neil Russel Soliven | Portfolio",
  description: "I design and build web systems where considered database architecture and clean, functional frontend share equal weight.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col relative">
        {/* Grainy Noise Overlay for premium tactile paper texture */}
        <div className="fixed inset-0 z-[-1] pointer-events-none opacity-[0.02] dark:opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}