import "./globals.css";

export const metadata = {
  title: "Souk N Story — Private, tailor-made journeys to Morocco",
  description:
    "Private, tailor-made Morocco journeys from any US city: flights, palace stays, private guides and every detail in between, designed by a Moroccan American.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body bg-ivory">{children}</body>
    </html>
  );
}
