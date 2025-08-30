export default function Footer({ left, center, right }) {
  return (
    <div className="footer fixed bottom-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">{left}</div>
        <div className="flex items-center gap-3 text-sm">{center}</div>
        <div className="flex items-center gap-3 flex-wrap justify-end">{right}</div>
      </div>
    </div>
  );
}
