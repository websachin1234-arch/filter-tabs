import { useState, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import KitchenBefore from "./assets/kitchen-before.png";
import KitchenAfter from "./assets/kitchen-after.png";
import BathroomBefore from "./assets/bathroom-before.png";
import BathroomAfter from "./assets/bathroom-after.png";
import BedroomBefore from "./assets/bedroom-before.png";
import BedroomAfter from "./assets/bedroom-after.png";
import TerraceBefore from "./assets/terrace-before.png";
import TerraceAfter from "./assets/terrace-after.png";
import LivingBefore from "./assets/living-room-before.png";
import LivingAfter from "./assets/living-room-after.png";

const rooms = {
  bathroom: {
    title: "Luxury Bathroom Renovation",
    description:
      "A complete bathroom renovation featuring elegant stone finishes, modern fixtures, warm lighting, and a clean minimalist design.",
    duration: "5 Weeks",
    location: "Zurich, Switzerland",
    budget: "CHF 85000",
    beforeImg: BathroomBefore,
    afterImg: BathroomAfter,
  },
  kitchen: {
    title: "Modern Kitchen Transformation",
    description:
      "A complete kitchen renovation transforming an unfinished interior into a bright, modern living space with custom cabinetry, integrated appliances, warm oak surfaces, and minimalist detailing.",
    duration: "8 Weeks",
    location: "Munich, Germany",
    budget: "CHF 162000",
    beforeImg: KitchenBefore,
    afterImg: KitchenAfter,
  },
  bedroom: {
    title: "Contemporary Bedroom Makeover",
    description:
      "A peaceful bedroom transformation with custom wardrobes, soft neutral finishes, ambient lighting, and carefully selected materials for everyday comfort.",
    duration: "4 Weeks",
    location: "Basel, Switzerland",
    budget: "CHF 48000",
    beforeImg: BedroomBefore,
    afterImg: BedroomAfter,
  },
  terrace: {
    title: "Modern Outdoor Terrace",
    description:
      "An underused terrace redesigned with durable outdoor flooring, refined finishes, integrated lighting, and a welcoming space for relaxing and entertaining.",
    duration: "6 Weeks",
    location: "Vienna, Austria",
    budget: "CHF 72000",
    beforeImg: TerraceBefore,
    afterImg: TerraceAfter,
  },
  "living-room": {
    title: "Elegant Living Room Redesign",
    description:
      "A complete living room refresh combining natural textures, bespoke storage, warm lighting, and contemporary finishes to create a comfortable and inviting interior.",
    duration: "7 Weeks",
    location: "Geneva, Switzerland",
    budget: "CHF 96'000",
    beforeImg: LivingBefore,
    afterImg: LivingAfter,
  },
};

const baseTab =
  "min-w-0 h-[clamp(38px,5vw,46px)] px-1 text-black flex items-center justify-center whitespace-nowrap text-[clamp(16px,2.5vw,24px)] leading-none cursor-pointer border-b-2 border-solid transition-all duration-200";
const activeLine = "border-black font-semibold";
const inactiveLine = "border-black/10 text-black/60";

function BeforeAfterSlider({ beforeImg, afterImg, title }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  }, []);

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={(e) => handleMove(e.clientX)}
      /* Yahan exact width: 594px aur height: 396px set kiya gaya hai */
      className="relative w-148.5 h-99 max-w-full cursor-ew-resize select-none overflow-hidden rounded-2xl bg-gray-100 shadow-lg"
    >
      
      <img
        src={afterImg}
        alt={`${title} After`}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <span className="pointer-events-none absolute top-4 right-4 z-10 rounded-md bg-black/75 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
        After
      </span>

     
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeImg}
          alt={`${title} Before`}
          className="pointer-events-none absolute inset-0 h-full max-w-none object-cover"
          style={{
            width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "594px",
            height: "100%",
          }}
        />
        <span className="pointer-events-none absolute top-4 left-4 z-10 rounded-md bg-black/75 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          Before
        </span>
      </div>

     
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-20 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-xl transition-transform active:scale-90">
          <svg
            className="h-5 w-5 text-neutral-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M8 9l-4 3 4 3m8-6l4 3-4 3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function FilterTabs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const room = searchParams.get("room");
  const activeTab = Object.keys(rooms).includes(room) ? room : "kitchen";
  const activePlace = rooms[activeTab];

  return (
    <section className="min-h-fit px-4">
      <div className="container mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center justify-center py-[clamp(40px,7.5vw,118px)]">
        
          <div className="flex w-full items-center justify-center gap-[clamp(24px,3.6vw,111px)] max-lg:flex-col max-lg:items-start">
            <div className="w-full max-w-162.5">
              <p className="text-[clamp(10px,0.8vw,14px)] font-semibold leading-relaxed tracking-widest text-gray-600">
                BUILT PROJECTS. EARNED TRUST.
              </p>
              <h1 className="w-full text-[clamp(28px,3.1vw,48px)] font-medium leading-tight text-black">
                Construction &amp; Renovation Projects Done the Right Way.
              </h1>
            </div>

            <div className="w-full max-w-130">
              <p className="w-full text-[clamp(13px,1.15vw,18px)] font-normal leading-relaxed text-gray-600">
                Explore completed construction and renovation projects delivered
                with transparent planning and trusted execution.
              </p>
              <button className="mt-[clamp(16px,1.8vw,28px)] h-[clamp(40px,3.65vw,56px)] min-w-[clamp(140px,12.7vw,194px)] cursor-pointer rounded-full border border-solid border-black text-[clamp(12px,1.15vw,18px)] font-semibold leading-normal text-black transition-all duration-200 ease-in-out hover:bg-black hover:text-white active:scale-95">
                View All Projects
              </button>
            </div>
          </div>

          <div className="mt-[clamp(32px,5.2vw,80px)] w-full">
            {/* Horizontal Tabs */}
            <div className="w-full overflow-x-auto">
              <div className="grid w-full min-w-125 grid-cols-5">
                {Object.keys(rooms).map((tabKey) => (
                  <button
                    key={tabKey}
                    onClick={() => setSearchParams({ room: tabKey })}
                    className={`${baseTab} ${activeTab === tabKey ? activeLine : inactiveLine}`}
                  >
                    {tabKey === "living-room"
                      ? "Living Room"
                      : tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-[clamp(28px,3.25vw,50px)] flex w-full items-center justify-between gap-[clamp(24px,4.32vw,66.5px)] max-lg:flex-col">
           
              <div className="flex w-full max-w-105 flex-col">
                <h2 className="text-[clamp(22px,2.1vw,32px)] font-medium leading-snug text-black">
                  {activePlace.title}
                </h2>

                <p className="mt-3 text-[clamp(12px,1.18vw,18px)] font-normal leading-relaxed text-gray-600">
                  {activePlace.description}
                </p>

                <div className="mt-6 flex w-full flex-wrap gap-x-[clamp(16px,2vw,32px)] gap-y-2">
                  <p className="text-[clamp(12px,1.3vw,20px)] font-medium text-black">
                    {activePlace.duration}
                  </p>
                  <p className="text-[clamp(12px,1.3vw,20px)] font-medium text-black">
                    {activePlace.location}
                  </p>
                  <p className="text-[clamp(12px,1.3vw,20px)] font-medium text-black">
                    {activePlace.budget}
                  </p>
                </div>
              </div>

           
              <div className="flex justify-center max-lg:w-full">
                <BeforeAfterSlider
                  key={activeTab}
                  beforeImg={activePlace.beforeImg}
                  afterImg={activePlace.afterImg}
                  title={activePlace.title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilterTabs;