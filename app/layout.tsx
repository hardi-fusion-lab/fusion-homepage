import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://hardi-fusion-lab.vercel.app"), // TODO: Update with your actual Vercel domain
  title: "Hardi Fusion Lab | Full Stack Digital Solutions",
  description: "Premium full-stack development studio specializing in high-performance web applications, trading platforms, and cloud architecture.",
  icons: {
    icon: "/logo-symbol.png",
    shortcut: "/logo-symbol.png",
    apple: "/logo-symbol.png",
  },
  openGraph: {
    title: "Hardi Fusion Lab | Full Stack Digital Solutions",
    description: "Premium full-stack development studio specializing in high-performance web applications, trading platforms, and cloud architecture.",
    url: "https://hardi.lab", // Placeholder, user can update
    siteName: "Hardi Fusion Lab",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hardi Fusion Lab Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardi Fusion Lab",
    description: "Premium full-stack development studio.",
    images: ["/og-image.png"],
    creator: "@hardihsu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.className} antialiased bg-black selection:bg-blue-500/30`}>
        <div className="fixed inset-0 -z-10 h-full w-full bg-black">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#1e3a8a33,#000)] opacity-40 blur-[100px] mx-auto"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
