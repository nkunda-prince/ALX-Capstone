import { useState, useEffect, useRef } from "react";

const DATA = [
  {
    id: 1,
    title: "Modern Studio Near UR",
    price: 150000,
    locKey: "gikondo",
    location: "Gikondo, Kigali — 1.5 km from University of Rwanda",
    desc: "Cozy studio apartment perfect for students. Recently renovated with modern amenities including fast Wi-Fi, a private kitchenette, and an en-suite bathroom. Located in a quiet neighbourhood with easy transport links to campus.",
    amenities: ["Wi-Fi", "Private Bathroom", "Kitchenette", "Security", "Water 24/7", "Furnished"],
    imgs: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80",
    ],
    landlord: { name: "Jean Claude Mugabo", email: "jc.mugabo@campushousing.rw", phone: "+250 788 123 456" },
  },
  {
    id: 2,
    title: "Shared Room in Student House",
    price: 80000,
    locKey: "remera",
    location: "Remera, Kigali — 2 km from AUCA",
    desc: "Affordable shared room in a friendly student house. Great community atmosphere with shared kitchen and living room. Bills included in the monthly price. Perfect for freshmen.",
    amenities: ["Wi-Fi", "Shared Kitchen", "Bills Included", "Community Space", "Laundry"],
    imgs: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
    ],
    landlord: { name: "Marie Claire Uwimana", email: "marie@campushousing.rw", phone: "+250 722 456 789" },
  },
  {
    id: 3,
    title: "Luxury 1BR Apartment",
    price: 250000,
    locKey: "kimihurura",
    location: "Kimihurura, Kigali — 3 km from Kigali Independent University",
    desc: "Premium apartment with stunning views and top-tier amenities. Perfect for graduate students or professionals. Fully furnished with modern décor, high-speed internet and 24/7 security.",
    amenities: ["Wi-Fi", "AC", "Gym Access", "Parking", "Security 24/7", "Balcony", "Dishwasher"],
    imgs: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&q=80",
    ],
    landlord: { name: "Patrick Nzeyimana", email: "p.nzeyimana@campushousing.rw", phone: "+250 788 789 012" },
  },
  {
    id: 4,
    title: "Budget Single Room",
    price: 60000,
    locKey: "nyamirambo",
    location: "Nyamirambo, Kigali — 1 km from UR Huye Campus",
    desc: "Simple and clean single room, ideal for students on a tight budget. Access to shared bathroom and facilities. Located near local markets and transport hubs.",
    amenities: ["Shared Bathroom", "Water Included", "Secure Gate", "Near Market"],
    imgs: [
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    landlord: { name: "Alphonse Habimana", email: "alphonse@campushousing.rw", phone: "+250 722 111 222" },
  },
  {
    id: 5,
    title: "Cozy 2BR Shared Apartment",
    price: 120000,
    locKey: "kacyiru",
    location: "Kacyiru, Kigali — 500 m from Government Buildings",
    desc: "Spacious 2-bedroom apartment to share. Each tenant gets a private room with shared kitchen and lounge. Great area with cafes and shops nearby and excellent public transport.",
    amenities: ["Wi-Fi", "Private Room", "Shared Kitchen", "Lounge", "Generator", "Hot Water"],
    imgs: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&q=80",
    ],
    landlord: { name: "Diane Uwera", email: "diane@campushousing.rw", phone: "+250 788 333 444" },
  },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
const HomeIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" fill={filled ? "#ef4444" : "none"} viewBox="0 0 24 24" stroke={filled ? "#ef4444" : "currentColor"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);
const MapPinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const BackIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const FilterIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
    <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="9" y2="18" />
  </svg>
);
const SearchIcon = () => (
  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
const MailIcon = ({ size = 15 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);
const PhoneIcon = ({ size = 15 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.18a19.79 19.79 0 01-3.07-8.7A2 2 0 012.18 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.1a16 16 0 006 6l1.27-.85a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const ClockIcon = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);
const ShieldIcon = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const DollarIcon = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v12M9 9s1.5-2 3-2 3 1 3 3-3 3-3 3-3 1-3 3 1.5 2 3 2 3-1 3-3" />
  </svg>
);
const UsersIcon = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, visible }) {
  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 9999,
      background: "#0f172a", color: "#f8fafc",
      padding: "12px 22px", borderRadius: 14,
      fontSize: 14, fontWeight: 500,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "all 0.3s ease",
      pointerEvents: "none",
      boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      letterSpacing: "0.01em",
    }}>
      {message}
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, favCount }) {
  const links = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "listings", label: "Listings" },
    { key: "contact", label: "Contact" },
  ];
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 200,
      background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid #e8edf5",
      height: 64, padding: "0 6%",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
        <div style={{ width: 38, height: 38, background: "#1d4ed8", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <HomeIcon />
        </div>
        <span style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>CampusConnect</span>
      </button>

      <div style={{ display: "flex", gap: 32 }}>
        {links.map(l => (
          <button key={l.key} onClick={() => setPage(l.key)} style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: page === l.key ? 700 : 500,
            color: page === l.key ? "#1d4ed8" : "#475569",
            fontFamily: "'DM Sans', sans-serif",
            padding: "4px 0",
            borderBottom: page === l.key ? "2px solid #1d4ed8" : "2px solid transparent",
            transition: "all 0.15s",
          }}>{l.label}</button>
        ))}
      </div>

      <button onClick={() => setPage("favorites")} style={{
        display: "flex", alignItems: "center", gap: 7,
        background: "none", border: "none", cursor: "pointer",
        fontSize: 14, fontWeight: 600, color: "#475569",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <HeartIcon filled={favCount > 0} />
        Favorites
        {favCount > 0 && (
          <span style={{ background: "#1d4ed8", color: "#fff", borderRadius: 99, fontSize: 11, fontWeight: 700, padding: "1px 7px" }}>
            {favCount}
          </span>
        )}
      </button>
    </nav>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ListingCard({ listing, favs, onToggleFav, onView }) {
  const [hovered, setHovered] = useState(false);
  const saved = favs.includes(listing.id);
  return (
    <div
      onClick={() => onView(listing.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff", borderRadius: 18,
        border: "1px solid #e2e8f0",
        overflow: "hidden", cursor: "pointer",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(29,78,216,0.13)" : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all 0.25s ease",
      }}
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={listing.imgs[0]} alt={listing.title} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.4s ease",
        }} />
        <button
          onClick={e => { e.stopPropagation(); onToggleFav(listing.id); }}
          style={{
            position: "absolute", top: 12, right: 12,
            width: 36, height: 36, background: "#fff",
            border: "none", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            transition: "transform 0.18s",
          }}
        >
          <HeartIcon filled={saved} />
        </button>
        <div style={{
          position: "absolute", bottom: 12, left: 12,
          background: "rgba(15,23,42,0.8)", backdropFilter: "blur(8px)",
          color: "#fff", borderRadius: 8, padding: "4px 10px",
          fontSize: 13, fontWeight: 700,
        }}>
          {listing.price.toLocaleString()} RWF<span style={{ fontWeight: 400, opacity: 0.8 }}>/mo</span>
        </div>
      </div>

      <div style={{ padding: "16px 18px 20px" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 6, letterSpacing: "-0.01em" }}>{listing.title}</div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 4, fontSize: 12, color: "#94a3b8", marginBottom: 10 }}>
          <span style={{ marginTop: 1 }}><MapPinIcon size={12} /></span>
          <span>{listing.location}</span>
        </div>
        <div style={{
          fontSize: 13, color: "#64748b", lineHeight: 1.65, marginBottom: 14,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>{listing.desc}</div>
        <button style={{
          width: "100%", padding: "10px",
          background: "#1d4ed8", color: "#fff",
          border: "none", borderRadius: 10,
          fontSize: 13, fontWeight: 700, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          transition: "background 0.15s",
        }}
          onClick={e => { e.stopPropagation(); onView(listing.id); }}
        >View Details</button>
      </div>
    </div>
  );
}

// ─── Page: Home ───────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  const features = [
    { icon: <HomeIcon />, title: "Quality Housing", desc: "Verified listings with detailed information and real photos" },
    { icon: <ShieldIcon size={20} />, title: "Safe & Secure", desc: "All properties are vetted for student safety and security" },
    { icon: <ClockIcon size={20} />, title: "Quick Response", desc: "Get in touch with landlords instantly and book your room fast" },
    { icon: <DollarIcon size={20} />, title: "Affordable Prices", desc: "Find budget-friendly options that fit your student lifestyle" },
  ];
  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: 520, background: "linear-gradient(135deg, #eff6ff 0%, #eef2ff 50%, #fdf4ff 100%)",
        display: "flex", alignItems: "center", padding: "80px 6%",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -80, right: "5%", width: 420, height: 420, background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: "10%", width: 280, height: 280, background: "radial-gradient(circle, rgba(29,78,216,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ maxWidth: 600, position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#dbeafe", borderRadius: 99, padding: "6px 14px", marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, background: "#1d4ed8", borderRadius: "50%", display: "inline-block" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1d4ed8" }}>Student Housing in Rwanda</span>
          </div>
          <h1 style={{ fontSize: "3.2rem", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, color: "#0f172a", letterSpacing: "-0.035em" }}>
            Find Your Perfect<br />
            <span style={{ color: "#1d4ed8" }}>Student Housing</span>
          </h1>
          <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.75, marginBottom: 36, maxWidth: 480 }}>
            Discover affordable, comfortable rooms near campus. Start your search today and find the ideal place to call home during your studies.
          </p>
          <div style={{ display: "flex", gap: 14 }}>
            <button onClick={() => setPage("listings")} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#1d4ed8", color: "#fff",
              border: "none", padding: "14px 28px", borderRadius: 50,
              fontSize: 15, fontWeight: 700, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 6px 20px rgba(29,78,216,0.3)",
              transition: "all 0.2s",
            }}>Browse Listings <ArrowIcon /></button>
            <button onClick={() => setPage("contact")} style={{
              background: "#fff", color: "#0f172a",
              border: "1.5px solid #e2e8f0", padding: "14px 28px", borderRadius: 50,
              fontSize: 15, fontWeight: 600, cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.2s",
            }}>Contact Us</button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "80px 6%", background: "#f8fafc" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 10, color: "#0f172a", letterSpacing: "-0.025em" }}>Why Choose CampusConnect?</h2>
          <p style={{ fontSize: 15, color: "#94a3b8" }}>We make finding student housing simple, safe, and stress-free</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, maxWidth: 1160, margin: "0 auto" }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18,
              padding: "28px 24px", transition: "all 0.2s",
            }}>
              <div style={{ width: 46, height: 46, background: "#eff6ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "#1d4ed8" }}>
                {f.icon}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: "#0f172a" }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 6%", background: "linear-gradient(135deg, #eff6ff 0%, #eef2ff 50%, #fdf4ff 100%)", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 900, marginBottom: 14, color: "#0f172a", letterSpacing: "-0.03em" }}>Ready to Find Your New Home?</h2>
        <p style={{ fontSize: 15, color: "#64748b", marginBottom: 36 }}>Browse hundreds of verified student housing options and connect with landlords today</p>
        <button onClick={() => setPage("listings")} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#1d4ed8", color: "#fff",
          border: "none", padding: "14px 32px", borderRadius: 50,
          fontSize: 15, fontWeight: 700, cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 6px 20px rgba(29,78,216,0.3)",
        }}>Get Started <ArrowIcon /></button>
      </section>
    </div>
  );
}

// ─── Page: About ──────────────────────────────────────────────────────────────
function AboutPage() {
  const stats = [
    { num: "500+", label: "Active Listings" },
    { num: "2,000+", label: "Happy Students" },
    { num: "15+", label: "Partner Universities" },
    { num: "5+", label: "Years of Service" },
  ];
  const values = [
    { icon: <UsersIcon size={20} />, title: "Student-Centered", desc: "Everything we do is designed with students in mind. We understand the unique challenges of finding housing while studying." },
    { icon: <div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg></div>, title: "Quality First", desc: "We carefully verify every listing to ensure students get safe, comfortable, and accurately described accommodations." },
    { icon: <ShieldIcon size={20} />, title: "Trust & Transparency", desc: "No hidden fees, no surprises. We believe in honest communication between students and landlords." },
    { icon: <div style={{ width: 20, height: 20 }}><svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg></div>, title: "Continuous Improvement", desc: "We're constantly evolving our platform based on student feedback to make housing search easier every day." },
  ];
  return (
    <div>
      <div style={{ padding: "60px 6% 50px", background: "linear-gradient(120deg, #eff6ff 0%, #f8fafc 100%)", borderBottom: "1px solid #e2e8f0" }}>
        <h1 style={{ fontSize: "2.6rem", fontWeight: 900, marginBottom: 10, color: "#0f172a", letterSpacing: "-0.03em" }}>About CampusConnect</h1>
        <p style={{ fontSize: 15, color: "#94a3b8" }}>Connecting students with their perfect home away from home since 2019</p>
      </div>

      <div style={{ padding: "70px 6%", maxWidth: 860, margin: "0 auto" }}>
        <h2 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: 20, color: "#0f172a", letterSpacing: "-0.02em" }}>Our Mission</h2>
        <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85, marginBottom: 14 }}>At CampusConnect, we believe that finding the right place to live shouldn't be a barrier to education. Our mission is to make student housing accessible, affordable, and stress-free for every student pursuing their academic dreams.</p>
        <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.85 }}>We started this platform after experiencing firsthand the challenges of finding safe, affordable housing near campus. Today, we're proud to serve thousands of students across Rwanda, helping them focus on what matters most — their education.</p>
      </div>

      <div style={{ padding: "60px 6%", background: "linear-gradient(135deg, #eff6ff 0%, #eef2ff 50%, #fdf4ff 100%)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: "2.8rem", fontWeight: 900, color: "#1d4ed8", letterSpacing: "-0.04em" }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <section style={{ padding: "80px 6%", background: "#f8fafc" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 10, color: "#0f172a", letterSpacing: "-0.025em" }}>Our Values</h2>
          <p style={{ fontSize: 15, color: "#94a3b8" }}>The principles that guide everything we do</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {values.map((v, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: "32px 28px" }}>
              <div style={{ width: 46, height: 46, background: "#eff6ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, color: "#1d4ed8" }}>
                {v.icon}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: "#0f172a" }}>{v.title}</div>
              <div style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── Page: Listings ───────────────────────────────────────────────────────────
function ListingsPage({ favs, onToggleFav, onView }) {
  const [keyword, setKeyword] = useState("");
  const [loc, setLoc] = useState("");
  const [maxPrice, setMaxPrice] = useState(300000);
  const [filtered, setFiltered] = useState(DATA);

  const apply = () => {
    setFiltered(DATA.filter(l =>
      (!keyword || l.title.toLowerCase().includes(keyword.toLowerCase()) || l.desc.toLowerCase().includes(keyword.toLowerCase())) &&
      (!loc || l.locKey === loc) &&
      l.price <= maxPrice
    ));
  };
  const clear = () => { setKeyword(""); setLoc(""); setMaxPrice(300000); setFiltered(DATA); };

  return (
    <div style={{ display: "flex", gap: 24, padding: "36px 6%", alignItems: "flex-start", background: "#f8fafc", minHeight: "80vh" }}>
      {/* Filters */}
      <aside style={{ width: 264, flexShrink: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: "24px 20px", position: "sticky", top: 80 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 700, marginBottom: 24, color: "#0f172a" }}>
          <FilterIcon /> Filters
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>Search</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}><SearchIcon /></span>
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Keywords..." style={{ width: "100%", padding: "9px 13px 9px 34px", border: "1.5px solid #e2e8f0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: "none", boxSizing: "border-box", color: "#0f172a" }} />
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>Location</label>
          <select value={loc} onChange={e => setLoc(e.target.value)} style={{ width: "100%", padding: "9px 13px", border: "1.5px solid #e2e8f0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 13, outline: "none", background: "#fff", color: "#0f172a", cursor: "pointer" }}>
            <option value="">All Locations</option>
            <option value="gikondo">Gikondo</option>
            <option value="remera">Remera</option>
            <option value="kimihurura">Kimihurura</option>
            <option value="kacyiru">Kacyiru</option>
            <option value="nyamirambo">Nyamirambo</option>
          </select>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: "0.05em" }}>Max Price</label>
          <input type="range" min="0" max="300000" step="10000" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: "100%", accentColor: "#1d4ed8", cursor: "pointer", marginTop: 6 }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8", marginTop: 5 }}>
            <span>0 RWF</span><span>{maxPrice.toLocaleString()} RWF</span>
          </div>
        </div>

        <button onClick={apply} style={{ width: "100%", padding: 11, background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>Apply Filters</button>
        <button onClick={clear} style={{ width: "100%", padding: 11, background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600, cursor: "pointer", marginTop: 10 }}>Clear Filters</button>
      </aside>

      {/* Grid */}
      <main style={{ flex: 1 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: "1.7rem", fontWeight: 800, marginBottom: 5, color: "#0f172a", letterSpacing: "-0.025em" }}>Available Rooms</h2>
          <p style={{ fontSize: 13, color: "#94a3b8" }}>{filtered.length} listing{filtered.length !== 1 ? "s" : ""} found</p>
        </div>
        {filtered.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {filtered.map(l => <ListingCard key={l.id} listing={l} favs={favs} onToggleFav={onToggleFav} onView={onView} />)}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>No listings match your filters.</div>
        )}
      </main>
    </div>
  );
}

// ─── Page: Detail ─────────────────────────────────────────────────────────────
function DetailPage({ id, favs, onToggleFav, setPage, showToast }) {
  const l = DATA.find(x => x.id === id);
  const [mainImg, setMainImg] = useState(l ? l.imgs[0] : "");
  const [activeThumb, setActiveThumb] = useState(0);

  useEffect(() => {
    if (l) { setMainImg(l.imgs[0]); setActiveThumb(0); }
  }, [id]);

  if (!l) return null;
  const saved = favs.includes(l.id);

  return (
    <div style={{ background: "#fff", minHeight: "80vh" }}>
      <div style={{ padding: "28px 6% 60px" }}>
        <button onClick={() => setPage("listings")} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#64748b", background: "none", border: "none", cursor: "pointer", marginBottom: 28, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
          <BackIcon /> Back to listings
        </button>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32, alignItems: "flex-start" }}>
          <div>
            <div style={{ borderRadius: 18, overflow: "hidden", marginBottom: 12, height: 430 }}>
              <img src={mainImg} alt={l.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {l.imgs.map((img, i) => (
                <div key={i} onClick={() => { setMainImg(img); setActiveThumb(i); }}
                  style={{ borderRadius: 12, overflow: "hidden", height: 108, cursor: "pointer", border: activeThumb === i ? "2.5px solid #1d4ed8" : "2.5px solid transparent", transition: "border-color 0.15s", opacity: activeThumb === i ? 1 : 0.85 }}>
                  <img src={img} alt={`img ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#d97706", marginBottom: 4 }}>{l.price.toLocaleString()} RWF <span style={{ fontSize: 15, fontWeight: 500, color: "#94a3b8" }}>/month</span></div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: 10, color: "#0f172a", letterSpacing: "-0.02em" }}>{l.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14, color: "#94a3b8", marginBottom: 24 }}>
                <MapPinIcon size={14} />{l.location}
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#0f172a" }}>About this Property</div>
              <div style={{ fontSize: 14, color: "#475569", lineHeight: 1.85, marginBottom: 28 }}>{l.desc}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#0f172a" }}>Amenities</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {l.amenities.map((a, i) => (
                  <span key={i} style={{ background: "#eff6ff", color: "#1d4ed8", borderRadius: 99, padding: "5px 14px", fontSize: 12, fontWeight: 600 }}>{a}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: 28, position: "sticky", top: 84 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#0f172a" }}>Contact Landlord</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ width: 44, height: 44, background: "#eff6ff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800, color: "#1d4ed8", flexShrink: 0 }}>
                {l.landlord.name[0]}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{l.landlord.name}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>Property Owner</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#475569", marginBottom: 10 }}>
              <span style={{ color: "#1d4ed8" }}><MailIcon /></span>
              <a href={`mailto:${l.landlord.email}`} style={{ color: "#1d4ed8", textDecoration: "none", fontWeight: 500, fontSize: 13 }}>{l.landlord.email}</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#475569", marginBottom: 20 }}>
              <span style={{ color: "#1d4ed8" }}><PhoneIcon /></span>
              <span>{l.landlord.phone}</span>
            </div>
            <hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "18px 0" }} />
            <button onClick={() => { setPage("contact"); showToast("Redirected to contact form!"); }}
              style={{ width: "100%", padding: 13, background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>
              Contact Landlord
            </button>
            <button onClick={() => onToggleFav(l.id)}
              style={{
                width: "100%", padding: 12, background: saved ? "#fff5f5" : "#fff",
                color: saved ? "#ef4444" : "#0f172a",
                border: `1.5px solid ${saved ? "#ef4444" : "#e2e8f0"}`, borderRadius: 12,
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
              }}>
              <HeartIcon filled={saved} />
              {saved ? "Saved to Favorites" : "Save to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page: Contact ────────────────────────────────────────────────────────────
function ContactPage({ showToast }) {
  const infos = [
    { icon: <MapPinIcon size={20} />, title: "Office Location", text: "KN 78 St, Kigali\nNyarugenge District\nKigali, Rwanda" },
    { icon: <PhoneIcon size={20} />, title: "Phone", text: "+250 788 123 456\n+250 722 987 654" },
    { icon: <MailIcon size={20} />, title: "Email", text: "info@campusconnect.rw\nsupport@campusconnect.rw" },
    { icon: <ClockIcon size={20} />, title: "Office Hours", text: "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed" },
  ];
  const input = { width: "100%", padding: "12px 15px", border: "1.5px solid #e2e8f0", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#0f172a", outline: "none", background: "#fafbff", boxSizing: "border-box" };
  return (
    <div>
      <div style={{ padding: "60px 6% 50px", background: "linear-gradient(120deg, #eff6ff 0%, #f8fafc 100%)", borderBottom: "1px solid #e2e8f0" }}>
        <h1 style={{ fontSize: "2.6rem", fontWeight: 900, marginBottom: 10, color: "#0f172a", letterSpacing: "-0.03em" }}>Get in Touch</h1>
        <p style={{ fontSize: 15, color: "#94a3b8" }}>Have questions? We're here to help you find your perfect student housing</p>
      </div>

      <div style={{ padding: "70px 6%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, maxWidth: 1100, margin: "0 auto" }}>
          <div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 28, color: "#0f172a", letterSpacing: "-0.02em" }}>Contact Information</h3>
            {infos.map((info, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "22px 20px", display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, background: "#eff6ff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#1d4ed8" }}>
                  {info.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 5, color: "#0f172a" }}>{info.title}</div>
                  {info.text.split("\n").map((t, j) => <div key={j} style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.65 }}>{t}</div>)}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 18, padding: 36 }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 28, color: "#0f172a", letterSpacing: "-0.02em" }}>Send us a Message</h3>
            {[
              { label: "Full Name", type: "text", placeholder: "Enter your name" },
              { label: "Email Address", type: "email", placeholder: "your.email@example.com" },
              { label: "Phone Number", type: "tel", placeholder: "+250 7XX XXX XXX" },
              { label: "Subject", type: "text", placeholder: "How can we help?" },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} style={input} />
              </div>
            ))}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.05em" }}>Message</label>
              <textarea placeholder="Tell us more about your inquiry..." style={{ ...input, resize: "vertical", minHeight: 140 }} />
            </div>
            <button onClick={() => showToast("Message sent! We'll get back to you soon ✅")} style={{
              width: "100%", padding: 14, background: "#1d4ed8", color: "#fff",
              border: "none", borderRadius: 50, fontFamily: "'DM Sans', sans-serif",
              fontSize: 15, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 6px 20px rgba(29,78,216,0.3)",
            }}>Send Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page: Favorites ──────────────────────────────────────────────────────────
function FavoritesPage({ favs, onToggleFav, onView, setPage }) {
  const list = DATA.filter(l => favs.includes(l.id));
  return (
    <div style={{ padding: "60px 6%" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 6, color: "#0f172a", letterSpacing: "-0.025em" }}>My Favorites</h1>
      <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 36 }}>Your saved listings for easy access</p>
      {list.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {list.map(l => <ListingCard key={l.id} listing={l} favs={favs} onToggleFav={onToggleFav} onView={onView} />)}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ color: "#cbd5e0", marginBottom: 14 }}><HeartIcon filled={false} /></div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#64748b", marginBottom: 8 }}>No saved listings yet</h3>
          <p style={{ fontSize: 14, color: "#94a3b8", marginBottom: 24 }}>Click the heart icon on any listing to save it here.</p>
          <button onClick={() => setPage("listings")} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#1d4ed8", color: "#fff", border: "none",
            padding: "12px 24px", borderRadius: 50,
            fontSize: 14, fontWeight: 700, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>Browse Listings <ArrowIcon /></button>
        </div>
      )}
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ background: "#0f172a", color: "rgba(255,255,255,0.55)", padding: "44px 6% 26px", textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, justifyContent: "center", marginBottom: 14 }}>
        <div style={{ width: 34, height: 34, background: "#1d4ed8", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><HomeIcon /></div>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>CampusConnect</span>
      </div>
      <div style={{ display: "flex", gap: 24, justifyContent: "center", margin: "12px 0 18px" }}>
        {["home", "about", "listings", "contact"].map(p => (
          <button key={p} onClick={() => setPage(p)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", textTransform: "capitalize" }}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
      <p style={{ fontSize: 13 }}>© 2025 CampusConnect. All rights reserved. Made with ❤️ for students in Rwanda.</p>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [detailId, setDetailId] = useState(null);
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cc_f") || "[]"); } catch { return []; }
  });
  const [toast, setToast] = useState({ msg: "", visible: false });
  const toastTimer = useRef(null);

  const showToast = (msg) => {
    setToast({ msg, visible: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  const toggleFav = (id) => {
    setFavs(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      try { localStorage.setItem("cc_f", JSON.stringify(next)); } catch {}
      showToast(prev.includes(id) ? "Removed from favorites" : "Saved to favorites ❤️");
      return next;
    });
  };

  const openDetail = (id) => { setDetailId(id); setPage("detail"); };

  const navigate = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#0f172a", background: "#fff", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        input, select, textarea, button { font-family: 'DM Sans', sans-serif; }
        input:focus, select:focus, textarea:focus { border-color: #1d4ed8 !important; background: #fff !important; }
        input[type=range]::-webkit-slider-thumb { background: #1d4ed8; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: #cbd5e0; border-radius: 3px; }
      `}</style>

      <Nav page={page} setPage={navigate} favCount={favs.length} />

      {page === "home" && <HomePage setPage={navigate} />}
      {page === "about" && <AboutPage />}
      {page === "listings" && <ListingsPage favs={favs} onToggleFav={toggleFav} onView={openDetail} />}
      {page === "detail" && <DetailPage id={detailId} favs={favs} onToggleFav={toggleFav} setPage={navigate} showToast={showToast} />}
      {page === "contact" && <ContactPage showToast={showToast} />}
      {page === "favorites" && <FavoritesPage favs={favs} onToggleFav={toggleFav} onView={openDetail} setPage={navigate} />}

      <Footer setPage={navigate} />
      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  );
}
