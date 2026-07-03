const ITEMS = ["CLEAN SHOES", "CLEAN CLUBS", "BETTER GAME", "COURSE-READY GEAR"];

function MarqueeContent() {
  return (
    <span className="inline-flex items-center">
      {ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          {item}
          <span className="mx-3 text-green-primary">•</span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden border-t-[3px] border-green-primary bg-green-deep py-[15px] whitespace-nowrap">
      <div className="anim-marquee inline-flex font-heading text-xl font-black tracking-[0.04em] text-[#EDEDED]">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}
