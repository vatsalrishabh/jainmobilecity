import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    template: `%s - Jain Mobile City Online Store`,
    default: `Jain Mobile City - Your One Stop Shop for Mobile Phones`,
  },
  description: `Jain Mobile City online store - Your one stop shop for all your mobile phone needs`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
