// The original SoukNStory app screens (Ask, Stories, Explore, My Trip, business
// portal) keep their phone-width layout while the public website around them
// is full width.
export default function AppScreensLayout({ children }) {
  return (
    <div className="bg-cream min-h-screen">
      <div className="max-w-[420px] mx-auto min-h-screen flex flex-col bg-cream shadow-[0_0_40px_rgba(0,0,0,0.06)]">
        {children}
      </div>
    </div>
  );
}
