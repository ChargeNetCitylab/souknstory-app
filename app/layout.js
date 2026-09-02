import "./globals.css";

export const metadata = {
  title: "SoukNStory — Discover the Morocco behind the map",
  description: "Personalized trips, trusted local experiences, and a Moroccan AI companion — built around you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body bg-cream">
        <div className="max-w-[420px] mx-auto min-h-screen flex flex-col bg-cream shadow-[0_0_40px_rgba(0,0,0,0.06)]">
          {children}
        </div>
      </body>
    </html>
  );
}
