import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion as Motion,
} from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CircleHelp,
  Compass,
  Flag,
  Languages,
  Mail,
  Menu,
  MapPin,
  MapPinned,
  MessageCircle,
  Mountain,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";

import guides from "../data/guides";
import alleppeyImage from "../assets/destinations/alleppey.jpg";
import athirappillyImage from "../assets/destinations/athirappilly.jpg";
import fortKochiImage from "../assets/destinations/fort-kochi.jpg";
import kovalamImage from "../assets/destinations/kovalam.jpg";
import munnarImage from "../assets/destinations/munnar.jpg";
import thekkadyImage from "../assets/destinations/thekkady.jpg";
import varkalaImage from "../assets/destinations/varkala.jpg";
import wayanadImage from "../assets/destinations/wayanad.jpg";

const WHATSAPP_NUMBER = "919778405403";
const SUPPORT_EMAIL_URL =
  "mailto:dhyan102006@gmail.com?subject=Hirevoy%20Problem%20Report";
const SUPPORT_WHATSAPP_URL = "https://wa.me/919495177713";

const destinations = [
  {
    id: "fort-kochi",
    name: "Fort Kochi",
    guideQuery: "Kochi",
    image: fortKochiImage,
    tag: "Heritage Harbor",
    description:
      "Colonial lanes, spice markets, art cafes, and sunset walks by the Chinese fishing nets.",
  },
  {
    id: "munnar",
    name: "Munnar",
    guideQuery: "Munnar",
    image: munnarImage,
    tag: "Tea Country",
    description:
      "Misty tea estates, quiet viewpoints, forest roads, and cool hill-station mornings.",
  },
  {
    id: "alleppey",
    name: "Alleppey",
    guideQuery: "Alleppey",
    image: alleppeyImage,
    tag: "Backwaters",
    description:
      "Slow canals, village paths, canoe rides, and local kitchens along the Vembanad backwaters.",
  },
  {
    id: "varkala",
    name: "Varkala",
    guideQuery: "Varkala",
    image: varkalaImage,
    tag: "Cliff Coast",
    description:
      "Red cliffs, golden beaches, sea-view cafes, and peaceful temple-side coastal walks.",
  },
  {
    id: "wayanad",
    name: "Wayanad",
    guideQuery: "Wayanad",
    image: wayanadImage,
    tag: "Wild Highlands",
    description:
      "Forest trails, waterfalls, caves, coffee estates, and deep Western Ghats scenery.",
  },
  {
    id: "kovalam",
    name: "Kovalam",
    guideQuery: "Kovalam",
    image: kovalamImage,
    tag: "Lighthouse Bay",
    description:
      "Curved beaches, lighthouse views, seafood stops, and easygoing coastal evenings.",
  },
  {
    id: "thekkady",
    name: "Thekkady",
    guideQuery: "Thekkady",
    image: thekkadyImage,
    tag: "Spice Forest",
    description:
      "Periyar forest edges, spice gardens, boating routes, and wildlife-focused day plans.",
  },
  {
    id: "athirappilly",
    name: "Athirappilly",
    guideQuery: "Athirappilly",
    image: athirappillyImage,
    tag: "Waterfall Run",
    description:
      "Rainforest roads, roaring falls, river viewpoints, and lush day trips from central Kerala.",
  },
];

const trustItems = [
  {
    title: "Verified Local Guides",
    description: "Profiles are reviewed before travelers connect.",
    icon: ShieldCheck,
  },
  {
    title: "Direct WhatsApp Contact",
    description: "Plan details, availability, and budget directly.",
    icon: MessageCircle,
  },
  {
    title: "Local Experiences Only",
    description: "Kerala itineraries shaped by people who know the place.",
    icon: MapPinned,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const sectionViewport = { once: true, amount: 0.18 };
const pageGutter = "px-4 sm:px-6 lg:px-8";
const sectionClass = `${pageGutter} py-16 sm:py-20 lg:py-24`;
const containerClass = "mx-auto max-w-6xl";
const eyebrowClass =
  "mb-3 inline-flex rounded-full border border-[#34d399]/25 bg-[#34d399]/10 px-3 py-1 text-xs font-bold uppercase text-[#a7f3d0] backdrop-blur-xl";
const elevatedCardClass =
  "border border-white/[0.12] bg-[linear-gradient(180deg,rgba(12,34,25,0.88),rgba(12,34,25,0.72))] backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_22px_60px_rgba(6,22,18,0.42)]";

const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const getGuideCount = (destination) => {
  const name = destination.name.toLowerCase();
  const query = destination.guideQuery.toLowerCase();

  return guides.filter((guide) => {
    const location = guide.location.toLowerCase();
    return (
      location.includes(query) ||
      query.includes(location) ||
      name.includes(location)
    );
  }).length;
};

const openSupportWhatsApp = () => {
  if (window.gtag) {
    window.gtag("event", "whatsapp_click", { source: "support" });
  }

  window.open(SUPPORT_WHATSAPP_URL, "_blank", "noopener,noreferrer");
};

const openSupportEmail = () => {
  window.open(SUPPORT_EMAIL_URL, "_blank", "noopener,noreferrer");
};

const openGuideWhatsApp = (guide) => {
  const payload = {
    guideId: guide.id,
    guideName: guide.name,
    location: guide.location,
    ts: Date.now(),
  };

  localStorage.setItem("lastLead", JSON.stringify(payload));

  if (window.gtag) {
    window.gtag("event", "whatsapp_click", { guide: guide.name });
  }

  const message = `Hi! I found Hirevoy.

I'm interested in booking a local guide.

Location: ${guide.location}
Guide: ${guide.name}
Budget: Rs.${guide.price}

Can you share details and availability?`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
};

const PrimaryButton = ({
  children,
  className = "",
  icon: Icon = ArrowRight,
  to,
  variant = "solid",
  ...props
}) => {
  const baseClass =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition duration-200 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34d399]";
  const variants = {
    solid:
      "bg-[#34d399] text-[#061612] shadow-[0_10px_26px_rgba(52,211,153,0.22)] hover:bg-[#6ee7b7] hover:-translate-y-0.5",
    glass:
      "border border-white/18 bg-white/[0.08] text-[#ecfdf5] backdrop-blur-md hover:border-[#34d399]/45 hover:bg-white/[0.11] hover:-translate-y-0.5",
  };
  const buttonClass = `${baseClass} ${variants[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
    </>
  );

  if (to) {
    return (
      <Link className={buttonClass} to={to} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={buttonClass} type="button" {...props}>
      {content}
    </button>
  );
};

const SectionHeading = ({ eyebrow, title, children, align = "center" }) => (
  <Motion.div
    className={`mb-9 max-w-3xl sm:mb-12 ${
      align === "left" ? "mr-auto text-left" : "mx-auto text-center"
    }`}
    initial="hidden"
    variants={fadeUp}
    viewport={sectionViewport}
    whileInView="visible"
  >
    <span className={eyebrowClass}>{eyebrow}</span>
    <h2 className="text-[2rem] font-extrabold leading-[1.08] text-[#ecfdf5] sm:text-4xl lg:text-[3rem]">
      {title}
    </h2>
    {children ? (
      <p
        className={`mt-4 max-w-2xl text-base leading-7 text-[#d1fae5] ${
          align === "left" ? "" : "mx-auto"
        }`}
      >
        {children}
      </p>
    ) : null}
  </Motion.div>
);

const WhatsAppIcon = ({ className = "" }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="currentColor"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.02 3.2C8.94 3.2 3.2 8.93 3.2 16c0 2.42.68 4.68 1.85 6.61L3.6 28.8l6.35-1.42a12.7 12.7 0 0 0 6.07 1.54c7.08 0 12.82-5.73 12.82-12.8C28.84 8.93 23.1 3.2 16.02 3.2Zm0 23.54c-2.03 0-3.91-.56-5.52-1.54l-.39-.23-3.74.84.85-3.64-.25-.4A10.55 10.55 0 0 1 5.39 16c0-5.86 4.76-10.62 10.63-10.62 5.88 0 10.64 4.76 10.64 10.62 0 5.88-4.76 10.64-10.64 10.64Zm5.85-7.95c-.32-.16-1.89-.93-2.18-1.04-.3-.11-.51-.16-.73.16-.22.32-.84 1.04-1.03 1.26-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.59a9.71 9.71 0 0 1-1.79-2.23c-.19-.32-.02-.49.14-.65.15-.15.32-.38.49-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.57-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.57.08-.86.4-.3.32-1.13 1.1-1.13 2.69 0 1.59 1.16 3.12 1.32 3.34.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.04.13.62-.09 1.89-.77 2.16-1.51.27-.74.27-1.38.19-1.51-.08-.13-.3-.21-.62-.38Z" />
  </svg>
);

const SupportAction = ({ children, icon: Icon, onClick }) => (
  <button
    className="flex w-full items-center gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.06] px-4 py-3 text-left text-sm font-semibold text-[#ecfdf5] transition hover:border-[#34d399]/35 hover:bg-white/[0.09]"
    onClick={onClick}
    type="button"
  >
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#34d399]/12 text-[#a7f3d0]">
      {Icon ? <Icon aria-hidden="true" className="h-4 w-4" /> : null}
    </span>
    {children}
  </button>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeAndScroll = (id) => {
    setIsOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border border-white/[0.13] bg-[#061612]/72 px-3 py-2 shadow-[0_12px_42px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:gap-4 sm:px-5">
        <Link
          aria-label="Hirevoy home"
          className="flex min-w-0 items-center gap-2"
          onClick={() => setIsOpen(false)}
          to="/"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#34d399] text-sm font-extrabold text-[#061612] sm:h-10 sm:w-10">
            H
          </span>
          <span className="truncate text-lg font-extrabold text-[#ecfdf5] sm:text-xl">
            Hirevoy
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium text-[#d1fae5] md:flex">
          <button
            className="transition hover:text-[#34d399]"
            onClick={() => scrollToId("destinations")}
            type="button"
          >
            Destinations
          </button>
          <Link className="transition hover:text-[#34d399]" to="/guides">
            Guides
          </Link>
          <button
            className="transition hover:text-[#34d399]"
            onClick={() => scrollToId("experience")}
            type="button"
          >
            Experience
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <PrimaryButton
            className="min-h-10 px-3 py-2 text-xs sm:px-4 sm:text-sm"
            icon={Compass}
            onClick={() => closeAndScroll("destinations")}
          >
            <span className="sm:hidden">Start</span>
            <span className="hidden sm:inline">Start Exploring</span>
          </PrimaryButton>
          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/14 bg-white/[0.07] text-[#ecfdf5] transition hover:border-[#34d399]/40 hover:bg-white/[0.1] md:hidden"
            onClick={() => setIsOpen((current) => !current)}
            type="button"
          >
            {isOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <Motion.div
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-[1.5rem] border border-white/[0.13] bg-[#061612]/88 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.32)] backdrop-blur-2xl md:hidden"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <button
              className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-[#d1fae5] transition hover:bg-white/[0.07] hover:text-[#ecfdf5]"
              onClick={() => closeAndScroll("destinations")}
              type="button"
            >
              Destinations
            </button>
            <Link
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#d1fae5] transition hover:bg-white/[0.07] hover:text-[#ecfdf5]"
              onClick={() => setIsOpen(false)}
              to="/guides"
            >
              Guides
            </Link>
            <button
              className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-[#d1fae5] transition hover:bg-white/[0.07] hover:text-[#ecfdf5]"
              onClick={() => closeAndScroll("experience")}
              type="button"
            >
              Experience
            </button>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section
      className={`relative isolate flex min-h-[92svh] items-center overflow-hidden ${pageGutter} pb-16 pt-28 sm:min-h-[94svh] sm:pb-20`}
    >
      <img
        alt=""
        className="absolute inset-0 h-full w-full scale-[1.03] object-cover"
        decoding="async"
        fetchPriority="high"
        loading="eager"
        src={munnarImage}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,22,18,0.72)_0%,rgba(6,22,18,0.58)_48%,#061612_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(52,211,153,0.13),transparent_58%)]" />

      <Motion.div
        className="relative z-10 mx-auto max-w-5xl text-center"
        initial="hidden"
        variants={stagger}
        animate="visible"
      >
        <Motion.div
          className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.09] px-4 py-2 text-xs font-bold uppercase text-[#fbbf24] backdrop-blur-md sm:text-sm"
          variants={fadeUp}
        >
          <Mountain aria-hidden="true" className="h-4 w-4" />
          Kerala local guide platform
        </Motion.div>
        <Motion.h1
          className="mx-auto max-w-4xl text-[clamp(2.85rem,11vw,5.9rem)] font-extrabold leading-[0.96] text-[#ecfdf5]"
          variants={fadeUp}
        >
          Explore Kerala Beyond Tourist Traps
        </Motion.h1>
        <Motion.p
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#d1fae5] sm:text-lg sm:leading-8"
          variants={fadeUp}
        >
          Connect with trusted local guides across Kerala for authentic travel
          experiences.
        </Motion.p>
        <Motion.div
          className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          variants={fadeUp}
        >
          <PrimaryButton className="w-full sm:w-auto" to="/guides">
            Explore Guides
          </PrimaryButton>
          <PrimaryButton
            className="w-full sm:w-auto"
            to="/destinations"
            variant="glass"
          >
            Browse Destinations
          </PrimaryButton>
        </Motion.div>
      </Motion.div>
    </section>
  );
};

const TrustBar = () => (
  <section className={`relative z-10 -mt-8 ${pageGutter}`}>
    <Motion.div
      className={`${containerClass} grid gap-3 rounded-[1.75rem] border border-white/[0.12] bg-[#0c2219]/78 p-3 shadow-[0_18px_56px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:grid-cols-3`}
      initial="hidden"
      variants={stagger}
      viewport={sectionViewport}
      whileInView="visible"
    >
      {trustItems.map((item) => {
        const Icon = item.icon;
        return (
          <Motion.div
            className="flex items-start gap-3 rounded-2xl border border-white/[0.11] bg-white/[0.05] p-4 backdrop-blur-xl"
            key={item.title}
            variants={fadeUp}
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#34d399]/12 text-[#a7f3d0]">
              <Icon aria-hidden="true" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-[0.95rem] font-bold text-[#ecfdf5]">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-6 text-[#d1fae5]">
                {item.description}
              </p>
            </div>
          </Motion.div>
        );
      })}
    </Motion.div>
  </section>
);

const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();
  const count = getGuideCount(destination);
  const guideLabel =
    count > 0
      ? `${count} ${count === 1 ? "guide" : "guides"} listed`
      : "Guide matching on request";

  return (
    <Motion.article
      className={`group relative h-[430px] overflow-hidden rounded-[1.75rem] ${elevatedCardClass} transition duration-300 hover:-translate-y-1.5 hover:border-[#34d399]/35 sm:h-[460px]`}
      initial="hidden"
      variants={fadeUp}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <img
        alt={`${destination.name}, Kerala`}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
        decoding="async"
        loading="lazy"
        src={destination.image}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,22,18,0.12)_0%,rgba(6,22,18,0.35)_38%,rgba(6,22,18,0.92)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/18 bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase text-[#ecfdf5] backdrop-blur-md">
            {destination.tag}
          </span>
          <span className="rounded-full bg-[#061612]/72 px-3 py-1 text-[0.7rem] font-semibold text-[#a7f3d0] backdrop-blur-md">
            {guideLabel}
          </span>
        </div>
        <h3 className="text-[1.65rem] font-extrabold leading-tight text-[#ecfdf5]">
          {destination.name}
        </h3>
        <p className="mt-3 min-h-20 text-sm leading-6 text-[#d1fae5]">
          {destination.description}
        </p>
        <PrimaryButton
          className="mt-5 w-full"
          onClick={() => navigate(`/guides?location=${destination.guideQuery}`)}
        >
          Explore with a Guide
        </PrimaryButton>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-transparent transition duration-300 group-hover:ring-[#34d399]/30" />
    </Motion.article>
  );
};

const DestinationsSection = () => (
  <section
    className={`${sectionClass} scroll-mt-28`}
    id="destinations"
  >
    <div className={containerClass}>
      <SectionHeading
        eyebrow="Destinations"
        title="Choose Where Kerala Opens Up"
      >
        Start with the place, then connect with a local guide who can shape the
        day around your pace, budget, and interests.
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {destinations.map((destination) => (
          <DestinationCard
            destination={destination}
            key={destination.id}
          />
        ))}
      </div>
    </div>
  </section>
);

const GuideCard = ({ guide }) => {
  const navigate = useNavigate();
  const languages = guide.languages?.join(", ") || guide.language;

  return (
    <Motion.article
      className={`group flex min-h-[300px] cursor-pointer flex-col rounded-[1.75rem] p-5 outline-none transition duration-300 hover:-translate-y-1 hover:border-[#34d399]/35 focus-visible:border-[#34d399] sm:p-6 ${elevatedCardClass}`}
      initial="hidden"
      onClick={() => {
        if (window.gtag) {
          window.gtag("event", "guide_click", { guide: guide.name });
        }
        navigate(`/guides/${guide.id}`);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          navigate(`/guides/${guide.id}`);
        }
      }}
      role="button"
      tabIndex={0}
      variants={fadeUp}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[1.35rem] font-extrabold leading-tight text-[#ecfdf5]">
            {guide.name}
          </h3>
          <p className="mt-2 flex items-center gap-2 text-sm text-[#d1fae5]">
            <MapPin aria-hidden="true" className="h-4 w-4 text-[#34d399]" />
            {guide.location}
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#34d399]/25 bg-[#34d399]/10 px-2.5 py-1 text-[0.72rem] font-bold text-[#a7f3d0]">
          <BadgeCheck aria-hidden="true" className="h-3.5 w-3.5" />
          Verified
        </span>
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl border border-white/[0.11] bg-white/[0.04] p-4 text-sm text-[#d1fae5] backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <Languages
            aria-hidden="true"
            className="mt-0.5 h-4 w-4 shrink-0 text-[#34d399]"
          />
          <span>{languages}</span>
        </div>
        <div className="h-px bg-white/[0.08]" />
        <div className="flex items-center gap-3">
          <WalletCards
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-[#34d399]"
          />
          <span>Rs.{guide.price}/day</span>
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-[#a7f3d0]">
        Verified Local Guide
      </p>

      <PrimaryButton
        className="mt-auto w-full"
        icon={MessageCircle}
        onClick={(event) => {
          event.stopPropagation();
          openGuideWhatsApp(guide);
        }}
      >
        Chat with Guide
      </PrimaryButton>
    </Motion.article>
  );
};

const FeaturedGuides = () => (
  <section className={`${sectionClass} bg-[linear-gradient(180deg,#061612_0%,#081f16_44%,#061612_100%)]`}>
    <div className={containerClass}>
      <SectionHeading eyebrow="Featured Guides" title="Meet Local Experts">
        Browse trusted Kerala guides by location, language, and daily price.
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {guides.slice(0, 3).map((guide) => (
          <GuideCard guide={guide} key={guide.id} />
        ))}
      </div>
    </div>
  </section>
);

const ExperienceSection = () => (
  <section
    className={`${sectionClass} scroll-mt-28 overflow-hidden`}
    id="experience"
  >
    <div className={`${containerClass} grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14`}>
      <Motion.div
        className="grid h-[430px] grid-cols-6 grid-rows-6 gap-3 sm:h-[540px] lg:h-[620px]"
        initial="hidden"
        variants={fadeUp}
        viewport={sectionViewport}
        whileInView="visible"
      >
        <img
          alt="A Kerala backwater route"
          className="col-span-4 row-span-4 h-full w-full rounded-[1.5rem] border border-white/[0.12] object-cover shadow-[0_18px_50px_rgba(6,22,18,0.42)]"
          decoding="async"
          loading="lazy"
          src={alleppeyImage}
        />
        <img
          alt="Fort Kochi heritage streets"
          className="col-span-2 row-span-2 h-full w-full rounded-[1.5rem] border border-white/[0.12] object-cover shadow-[0_18px_50px_rgba(6,22,18,0.32)]"
          decoding="async"
          loading="lazy"
          src={fortKochiImage}
        />
        <img
          alt="Varkala cliff coast"
          className="col-span-2 row-span-2 h-full w-full rounded-[1.5rem] border border-white/[0.12] object-cover shadow-[0_18px_50px_rgba(6,22,18,0.32)]"
          decoding="async"
          loading="lazy"
          src={varkalaImage}
        />
        <div
          className={`col-span-3 row-span-2 flex flex-col justify-end rounded-[1.5rem] p-4 sm:p-5 ${elevatedCardClass}`}
        >
          <span className="text-xs font-bold uppercase text-[#a7f3d0] sm:text-sm">
            Local-first
          </span>
          <p className="mt-2 text-base font-bold leading-6 text-[#ecfdf5] sm:text-lg">
            Plans shaped around real Kerala, not fixed tourist scripts.
          </p>
        </div>
        <img
          alt="Munnar tea hills"
          className="col-span-3 row-span-2 h-full w-full rounded-[1.5rem] border border-white/[0.12] object-cover shadow-[0_18px_50px_rgba(6,22,18,0.32)]"
          decoding="async"
          loading="lazy"
          src={munnarImage}
        />
      </Motion.div>

      <SectionHeading
        align="left"
        eyebrow="Experience"
        title="Travel Kerala Like a Local"
      >
        Hirevoy helps travelers move from a destination list to an actual local
        plan. Browse Kerala places, compare trusted guides, and start the
        conversation directly on WhatsApp.
      </SectionHeading>
    </div>
  </section>
);

const FinalCTA = () => (
  <section className={`relative overflow-hidden border-y border-white/[0.12] bg-[#0c2219] ${pageGutter} py-16 sm:py-20 lg:py-24`}>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.15),transparent_64%)]" />
    <Motion.div
      className="relative mx-auto max-w-4xl text-center"
      initial="hidden"
      variants={fadeUp}
      viewport={sectionViewport}
      whileInView="visible"
    >
      <span className={eyebrowClass}>Start the trip</span>
      <h2 className="mx-auto mt-5 max-w-3xl text-[2.2rem] font-extrabold leading-[1.05] text-[#ecfdf5] sm:text-5xl">
        Ready to Explore Kerala?
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#d1fae5]">
        Pick a guide, choose a destination, and plan with someone who knows the
        route beyond the obvious stops.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <PrimaryButton className="w-full sm:w-auto" to="/guides">
          Find a Guide
        </PrimaryButton>
        <PrimaryButton
          className="w-full sm:w-auto"
          to="/destinations"
          variant="glass"
        >
          Browse Destinations
        </PrimaryButton>
      </div>
    </Motion.div>
  </section>
);

const Footer = () => (
  <footer className={`border-t border-white/14 bg-[#061612] ${pageGutter} py-10`}>
    <div className={`${containerClass} grid gap-8 rounded-[1.75rem] border border-white/[0.12] bg-white/[0.05] p-6 backdrop-blur-xl md:grid-cols-[1.2fr_1fr_1fr]`}>
      <div>
        <Link className="inline-flex items-center gap-2" to="/">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#34d399] text-sm font-extrabold text-[#061612]">
            H
          </span>
          <span className="text-xl font-extrabold text-[#ecfdf5]">
            Hirevoy
          </span>
        </Link>
        <p className="mt-4 max-w-sm text-sm leading-6 text-[#d1fae5]">
          Premium Kerala guide discovery with direct local connections.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-[#ecfdf5]">Explore</h3>
        <div className="mt-4 grid gap-3 text-sm text-[#d1fae5]">
          <Link className="transition hover:text-[#34d399]" to="/guides">
            Guides
          </Link>
          <Link className="transition hover:text-[#34d399]" to="/destinations">
            Destinations
          </Link>
          <button
            className="text-left transition hover:text-[#34d399]"
            onClick={() => scrollToId("experience")}
            type="button"
          >
            Experience
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-[#ecfdf5]">Support</h3>
        <p className="mt-4 flex items-center gap-2 text-sm text-[#d1fae5]">
          <MapPin aria-hidden="true" className="h-4 w-4 text-[#34d399]" />
          Kerala, India
        </p>
        <PrimaryButton
          className="mt-5 w-full sm:w-auto"
          icon={WhatsAppIcon}
          onClick={openSupportWhatsApp}
        >
          WhatsApp Support
        </PrimaryButton>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-[#d1fae5]">
          <button
            className="transition hover:text-[#34d399]"
            onClick={openSupportEmail}
            type="button"
          >
            Report Problem
          </button>
          <button
            className="transition hover:text-[#34d399]"
            onClick={openSupportEmail}
            type="button"
          >
            Email Support
          </button>
        </div>
      </div>

      <p className="border-t border-white/14 pt-5 text-sm text-[#a7f3d0] md:col-span-3">
        Copyright 2026 Hirevoy. Explore Kerala with trusted local guides.
      </p>
    </div>
  </footer>
);

const SupportWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const longPressTimer = useRef(null);
  const longPressTriggered = useRef(false);

  const clearLongPress = () => {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const startLongPress = (event) => {
    if (event.pointerType === "mouse") return;

    longPressTriggered.current = false;
    clearLongPress();
    longPressTimer.current = window.setTimeout(() => {
      longPressTriggered.current = true;
      setIsOpen(true);
    }, 560);
  };

  const handleWhatsAppClick = () => {
    if (longPressTriggered.current) {
      longPressTriggered.current = false;
      return;
    }

    openSupportWhatsApp();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-end gap-2 sm:bottom-5 sm:right-5">
      <AnimatePresence>
        {isOpen ? (
          <Motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute bottom-16 right-0 w-[min(19rem,calc(100vw-2rem))] rounded-[1.5rem] border border-white/[0.14] bg-[#061612]/88 p-4 shadow-[0_22px_70px_rgba(0,0,0,0.46)] backdrop-blur-2xl sm:bottom-[4.5rem]"
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-extrabold text-[#ecfdf5]">
                  Need help?
                </h3>
                <p className="mt-1 text-sm leading-6 text-[#d1fae5]">
                  Report a problem or contact support.
                </p>
              </div>
              <button
                aria-label="Close support menu"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/[0.12] bg-white/[0.07] text-[#d1fae5] transition hover:border-[#34d399]/35 hover:text-[#ecfdf5]"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-2">
              <SupportAction icon={Flag} onClick={openSupportEmail}>
                Report Problem
              </SupportAction>
              <SupportAction icon={Mail} onClick={openSupportEmail}>
                Email Support
              </SupportAction>
              <SupportAction icon={WhatsAppIcon} onClick={openSupportWhatsApp}>
                WhatsApp Support
              </SupportAction>
            </div>
          </Motion.div>
        ) : null}
      </AnimatePresence>

      <button
        aria-label="Open support menu"
        className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.14] bg-[#061612]/78 text-[#d1fae5] shadow-[0_12px_30px_rgba(0,0,0,0.32)] backdrop-blur-xl transition hover:scale-105 hover:border-[#34d399]/40 hover:text-[#a7f3d0]"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <CircleHelp aria-hidden="true" className="h-5 w-5" />
      </button>

      <button
        aria-label="Chat on WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(135deg,#34d399,#059669)] text-white shadow-[0_14px_34px_rgba(52,211,153,0.34)] transition hover:scale-105 hover:shadow-[0_18px_44px_rgba(52,211,153,0.42)] active:scale-95 sm:h-14 sm:w-14"
        onClick={handleWhatsAppClick}
        onPointerCancel={clearLongPress}
        onPointerDown={startLongPress}
        onPointerLeave={clearLongPress}
        onPointerUp={clearLongPress}
        type="button"
      >
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </button>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(52,211,153,0.08),transparent_34%),#061612] text-[#ecfdf5]">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <DestinationsSection />
        <FeaturedGuides />
        <ExperienceSection />
        <FinalCTA />
      </main>
      <Footer />
      <SupportWidget />
    </div>
  );
};

export default Home;
