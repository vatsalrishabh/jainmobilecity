import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template: `%s - ${process.env.NEXT_NEXT_PUBLIC_APP_NAME_FULL} online store`,
    default: ` ${process.env.NEXT_NEXT_PUBLIC_APP_NAME_FULL} online store`,
  },
  description: ` ${process.env.NEXT_NEXT_PUBLIC_APP_NAME_FULL} online store, Your one stop shop for all your needs`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
