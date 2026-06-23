import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, ArrowUp, Check, CreditCard, Heart, Instagram,
  Facebook, Mail, Minus, Plus, Search, ShoppingBag, Truck,
  RefreshCw, Ruler, User, X, Youtube, Tag,
} from "lucide-react";

const asset = (name) => `/assets/generated/${name}.webp`;

const categories = [
  ["Lounge",       "category-lounge"],
  ["Sets",         "category-sets"],
  ["Dresses",      "category-dresses"],
  ["Essentials",   "category-essentials"],
  ["Couples Edit", "category-couples"],
];

const products = [
  {
    id: "half-zip",
    name: "Soft Structure Half Zip",
    color: "Taupe",
    price: 88,
    image: "product-half-zip",
    badge: "BESTSELLER",
    category: "women",
    isNew: false,
    description: "Relaxed silhouette meets elevated essentials. Crafted in our signature soft-touch fabric — breathable, structured, and made for movement. Pairs effortlessly with the Wide Leg Sweatpant.",
    swatches: ["#BFAF9E", "#DED7CD", "#8b7967"],
    variants: [
      { label: "Taupe",  image: "product-half-zip" },
      { label: "Oat",   image: "product-half-zip-alt" },
      { label: "Stone", image: "product-half-zip-detail" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "hoodie",
    name: "Signature Hoodie",
    color: "Olive",
    price: 78,
    image: "product-hoodie",
    badge: "NEW",
    category: "men",
    isNew: true,
    description: "Our most-wanted drop. A heavyweight hoodie with a refined structure — minimal branding, maximum presence. Unisex fit, sized to drape.",
    swatches: ["#5D614E", "#7d8068", "#4b4d3a"],
    variants: [
      { label: "Olive", image: "product-hoodie" },
      { label: "Moss",  image: "product-hoodie-alt" },
      { label: "Sage",  image: "product-hoodie-detail" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "sweatpant",
    name: "Wide Leg Sweatpant",
    color: "Bone",
    price: 68,
    image: "product-sweatpant",
    badge: "BESTSELLER",
    category: "women",
    isNew: false,
    description: "Wide, fluid, and endlessly flattering. Our Wide Leg Sweatpant is cut for movement and styled for going somewhere. Set up with the Half Zip for the complete look.",
    swatches: ["#EAE5D9", "#d9cdb8", "#9a8974"],
    variants: [
      { label: "Bone",  image: "product-sweatpant" },
      { label: "Cream", image: "product-sweatpant-alt" },
      { label: "Dune",  image: "product-sweatpant-detail" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "tank",
    name: "Ribbed Tank",
    color: "Black",
    price: 48,
    image: "product-tank",
    badge: "LAST FEW",
    category: "women",
    isNew: false,
    description: "Ribbed, second-skin fit. Wear it under the jacket, under the zip, or alone. The tank that goes everywhere and does everything.",
    swatches: ["#2A2A2A", "#8b7863", "#dfd3c0"],
    variants: [
      { label: "Black", image: "product-tank" },
      { label: "Cocoa", image: "product-tank-alt" },
      { label: "Sand",  image: "product-tank-detail" },
    ],
    sizes: ["XS", "S", "M", "L"],
  },
  {
    id: "jacket",
    name: "Cropped Zip Jacket",
    color: "Chocolate",
    price: 88,
    image: "product-jacket",
    badge: "NEW",
    category: "sets",
    isNew: true,
    description: "The jacket that makes the set. A cropped silhouette in our premium chocolate fabrication — pair with the Ribbed Tank and Wide Leg for the full Blaquelyś uniform.",
    swatches: ["#4A352A", "#a9896c", "#e5d7c0"],
    variants: [
      { label: "Chocolate", image: "product-jacket" },
      { label: "Truffle",   image: "product-jacket-alt" },
      { label: "Mocha",     image: "product-jacket-detail" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "tee",
    name: "Heavyweight Tee",
    color: "Sand",
    price: 48,
    image: "product-tee",
    badge: null,
    category: "men",
    isNew: false,
    description: "A tee that actually holds its shape. Premium heavyweight cotton, dropped shoulders, boxy-relaxed fit. The wardrobe anchor.",
    swatches: ["#D1C6B8", "#f0e8d9", "#c4b294"],
    variants: [
      { label: "Sand",  image: "product-tee" },
      { label: "Ivory", image: "product-tee-alt" },
      { label: "Clay",  image: "product-tee-detail" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
];

const looks = [
  {
    name: "The City Set",
    image: "look-city",
    items: ["Soft Structure Half Zip", "Wide Leg Sweatpant", "Essential Tee"],
    price: "$184.00",
    productIds: ["half-zip", "sweatpant", "tank"],
  },
  {
    name: "The Airport Set",
    image: "look-airport",
    items: ["Signature Hoodie", "Wide Leg Sweatpant", "Crew Sock"],
    price: "$166.00",
    productIds: ["hoodie", "sweatpant", "tank"],
  },
  {
    name: "The Weekend Set",
    image: "look-weekend",
    items: ["Cropped Zip Jacket", "Ribbed Tank", "Wide Leg Pant"],
    price: "$162.00",
    productIds: ["jacket", "tank", "sweatpant"],
  },
  {
    name: "The Vacay Set",
    image: "look-vacay",
    items: ["Linen Shirt", "Linen Short", "Tank Top"],
    price: "$148.00",
    productIds: ["jacket", "tank", "tee"],
  },
];

const social = [
  "insta-couple",
  "insta-white-set",
  "insta-olive",
  "insta-brown",
  "insta-linen",
];

const FILTER_TABS = [
  ["all", "ALL"],
  ["new", "NEW IN"],
  ["women", "WOMEN"],
  ["men", "HIM"],
  ["sets", "SETS"],
];

const PROMO_CODES = { "BLAQU10": 0.10, "CITY20": 0.20, "LUXE15": 0.15 };

const SIZE_GUIDE = {
  women: [
    { size: "XS", bust: '32"', waist: '24"', hips: '34"' },
    { size: "S",  bust: '34"', waist: '26"', hips: '36"' },
    { size: "M",  bust: '36"', waist: '28"', hips: '38"' },
    { size: "L",  bust: '38"', waist: '30"', hips: '40"' },
    { size: "XL", bust: '41"', waist: '33"', hips: '43"' },
  ],
  men: [
    { size: "S",   chest: '36"', waist: '30"', inseam: '30"' },
    { size: "M",   chest: '38"', waist: '32"', inseam: '31"' },
    { size: "L",   chest: '41"', waist: '34"', inseam: '32"' },
    { size: "XL",  chest: '44"', waist: '36"', inseam: '32"' },
    { size: "XXL", chest: '47"', waist: '39"', inseam: '33"' },
  ],
};

const money = (value) => `$${value.toFixed(2)}`;

async function sendSiteMessage(payload) {
  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("unavailable");
    return response.json();
  } catch {
    const fallback = { ...payload, id: `local-${Date.now()}`, receivedAt: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem("blaquelysMessages") || "[]");
    localStorage.setItem("blaquelysMessages", JSON.stringify([fallback, ...saved].slice(0, 20)));
    return { ok: true, local: true, message: fallback };
  }
}

function App() {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [wishlist, setWishlist]     = useState(() => new Set());
  const [cart, setCart]             = useState([]);
  const [cartOpen, setCartOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView]   = useState(null);
  const [query, setQuery]           = useState("");
  const [toast, setToast]           = useState("");
  const [noteOpen, setNoteOpen]     = useState(false);
  const [sending, setSending]       = useState("");
  const [scrolled, setScrolled]     = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort]     = useState("featured");
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [promoInput, setPromoInput]     = useState("");
  const [promoApplied, setPromoApplied] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [showBackTop, setShowBackTop]   = useState(false);
  const [loaded, setLoaded]             = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrolled(window.scrollY > 80);
      setScrollProgress(pct);
      setShowBackTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("isVisible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 80px 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2800);
    return () => window.clearTimeout(id);
  }, [toast]);

  const discount = promoApplied ? (PROMO_CODES[promoApplied] || 0) : 0;
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const discountAmount = cartTotal * discount;
  const finalTotal = cartTotal - discountAmount;
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const freeShippingAt = 150;
  const shippingProgress = Math.min((cartTotal / freeShippingAt) * 100, 100);
  const shippingLeft = Math.max(freeShippingAt - cartTotal, 0);

  const filteredSearch = useMemo(() => {
    const n = query.trim().toLowerCase();
    if (!n) return products;
    return products.filter((p) =>
      [p.name, p.color, p.category, ...p.variants.map((v) => v.label)].join(" ").toLowerCase().includes(n),
    );
  }, [query]);

  const displayProducts = useMemo(() => {
    let list = products;
    if (activeFilter === "new") list = list.filter((p) => p.isNew);
    else if (activeFilter !== "all") list = list.filter((p) => p.category === activeFilter);
    if (activeSort === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (activeSort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeFilter, activeSort]);

  const wishlisted = products.filter((p) => wishlist.has(p.id));

  const selectVariant = (productId, index) =>
    setSelectedVariants((c) => ({ ...c, [productId]: index }));

  const addToCart = (product, size = "M") => {
    const idx     = selectedVariants[product.id] || 0;
    const variant = product.variants[idx];
    const cartId  = `${product.id}-${variant.label}-${size}`;
    setCart((items) => {
      const existing = items.find((i) => i.cartId === cartId);
      if (existing) return items.map((i) => i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i);
      return [...items, { cartId, productId: product.id, name: product.name, color: variant.label, image: variant.image, price: product.price, quantity: 1, size }];
    });
    setCartOpen(true);
    setCheckoutStep(null);
    setToast(`${product.name} added to bag`);
  };

  const updateCart = (cartId, quantity) =>
    setCart((items) => quantity <= 0 ? items.filter((i) => i.cartId !== cartId) : items.map((i) => i.cartId === cartId ? { ...i, quantity } : i));

  const toggleWishlist = (id) =>
    setWishlist((cur) => { const n = new Set(cur); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const scrollTo = (selector) =>
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoApplied(code);
      setToast(`Code ${code} applied — ${Math.round(PROMO_CODES[code] * 100)}% off!`);
    } else {
      setToast("Invalid promo code");
    }
    setPromoInput("");
  };

  const handleNewsletter = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSending("newsletter");
    await sendSiteMessage({ type: "newsletter", email: form.get("email"), source: "footer-newsletter" });
    e.currentTarget.reset();
    setSending("");
    setToast("You're on the list");
  };

  const handleConcierge = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSending("concierge");
    await sendSiteMessage({ type: "concierge", name: form.get("name"), email: form.get("contactEmail"), message: form.get("message"), cart: cart.map(({ name, color, size, quantity }) => ({ name, color, size, quantity })) });
    e.currentTarget.reset();
    setSending("");
    setToast("Message sent to Blaquelyś");
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (checkoutStep === 1) { setCheckoutStep(2); return; }
    setSending("checkout");
    await sendSiteMessage({ type: "checkout-intent", cart, total: finalTotal, promo: promoApplied });
    setSending("");
    setCheckoutStep(3);
    setCart([]);
    setPromoApplied(null);
  };

  return (
    <div className={loaded ? "siteShell siteLoaded" : "siteShell"}>
      {/* ── Preloader ─────────────────────────────── */}
      <div className={loaded ? "preloader preloaderDone" : "preloader"} aria-hidden="true">
        <div className="preloaderInner">
          <span className="preloaderLogo">BLAQUELYŚ</span>
          <div className="preloaderBar"><div className="preloaderFill" /></div>
          <span className="preloaderSub">LUXURY STREET ESSENTIALS</span>
        </div>
      </div>
      <div className="customCursor" ref={cursorRef} aria-hidden="true" />
      <div className="scrollProgressBar" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      <div className="announcement">
        <div><Truck size={13} strokeWidth={1.6} /> FREE U.S. SHIPPING ON ORDERS $150+</div>
        <button className="announcementCenter" type="button" onClick={() => scrollTo(".productsSection")}>
          NEW DROP LIVE <span>|</span> <a>SHOP NOW</a>
        </button>
        <div><RefreshCw size={13} strokeWidth={1.7} /> EASY RETURNS</div>
      </div>

      <header className={scrolled ? "scrolled" : ""}>
        <nav className="nav" aria-label="Main navigation">
          <div className="navGroup navLeft">
            <button className="iconButton" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => { setActiveFilter("new"); scrollTo(".productsSection"); }}>NEW IN</button>
            <button type="button" onClick={() => { setActiveFilter("women"); scrollTo(".productsSection"); }}>WOMEN</button>
            <button type="button" onClick={() => { setActiveFilter("men"); scrollTo(".productsSection"); }}>HIM</button>
            <button type="button" onClick={() => { setActiveFilter("sets"); scrollTo(".productsSection"); }}>SETS</button>
          </div>

          <button className="brandLink" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="logo">BLAQUELYŚ</span>
          </button>

          <div className="navGroup navRight">
            <button type="button" onClick={() => scrollTo(".categorySection")}>COUPLES EDIT</button>
            <button type="button" onClick={() => { setActiveFilter("all"); scrollTo(".productsSection"); }}>BEST SELLERS</button>
            <button className="iconButton" aria-label="Wishlist" onClick={() => setWishlistOpen(true)}>
              <Heart size={20} strokeWidth={1.5} />
              {wishlist.size > 0 && <span className="badgeDot">{wishlist.size}</span>}
            </button>
            <button className="iconButton" aria-label="Styling concierge" onClick={() => setNoteOpen(true)}>
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="iconButton cartIconButton" aria-label="Cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && <span>{cartCount}</span>}
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────── */}
        <section className="hero">
          <svg className="retroLinesSvg" viewBox="0 0 500 500" fill="none" aria-hidden="true">
            <path d="M-100 200 C 150 200, 250 100, 250 -100" stroke="#7C6754" strokeWidth="22" strokeLinecap="round"/>
            <path d="M-100 240 C 170 240, 280 120, 280 -100" stroke="#A98F78" strokeWidth="22" strokeLinecap="round"/>
            <path d="M-100 280 C 190 280, 310 140, 310 -100" stroke="#E4DAC3" strokeWidth="22" strokeLinecap="round"/>
          </svg>
          <img src={asset("hero-couple")} alt="" className="heroImage" />
          <div className="heroGradient" />
          <div className="heroCopy">
            <div className="heroCopyInner">
              <div className="heroEyebrow">
                <span className="heroPill">✦ New Drop Live</span>
              </div>
              <h1>
                <span className="heroLine" style={{"--d":"500ms"}}>CITY PLAY.</span>
                <span className="heroLine" style={{"--d":"680ms"}}>LUXE LINES.</span>
              </h1>
              <p><em>Cartoon chic for her and<br />the one beside her.</em></p>
              <div className="heroActions">
                <button className="button buttonDark" type="button" onClick={() => { setActiveFilter("women"); scrollTo(".productsSection"); }}>
                  SHOP WOMEN
                </button>
                <button className="button buttonLight" type="button" onClick={() => scrollTo(".categorySection")}>
                  SHOP COUPLES
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Category arched tiles ───────────────────── */}
        <section className="categorySection" aria-label="Featured categories">
          <div className="categoryGrid">
            {categories.map(([label, image]) => (
              <button
                type="button"
                className="categoryTile"
                key={label}
                data-reveal
                onClick={() => scrollTo(".productsSection")}
              >
                <div className="categoryImageWrap">
                  <img src={asset(image)} alt={label} />
                </div>
                <div className="categoryLabel">
                  <span>{label}</span>
                  <small>SHOP NOW →</small>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ── Press strip ─────────────────────────────── */}
        <div className="pressStrip" data-reveal>
          <span className="pressLabel">AS FEATURED IN</span>
          {["VOGUE", "ESSENCE", "ELLE", "HARPER'S BAZAAR", "WWD", "REFINERY29"].map((p) => (
            <span className="pressName" key={p}>{p}</span>
          ))}
        </div>

        {/* ── Marquee ticker ──────────────────────────── */}
        <div className="marqueeBar" aria-hidden="true">
          <div className="marqueeTrack">
            {[...Array(3)].flatMap(() => [
              "NEW COLLECTION", "✦", "CITY PLAY", "✦", "LUXE LINES", "✦", "BLAQUELYŚ", "✦", "OFF DUTY EVERYWHERE", "✦", "PREMIUM FABRICS", "✦", "FREE U.S. SHIPPING $150+", "✦",
            ]).map((t, i) => <span key={i}>{t}</span>)}
          </div>
        </div>

        {/* ── Stats bar ───────────────────────────────── */}
        <section className="statsSection">
          {[
            { num: "6+",   label: "SIGNATURE PIECES" },
            { num: "∞",    label: "LOOKS TO BUILD" },
            { num: "100%", label: "PREMIUM FABRIC" },
            { num: "0",    label: "COMPROMISE" },
          ].map(({ num, label }) => (
            <div className="statItem" key={label} data-reveal>
              <strong>{num}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        {/* ── Best Sellers ────────────────────────────── */}
        <section className="sectionBlock productsSection">
          <div className="sectionHeader" data-reveal>
            <h2>BEST SELLERS</h2>
            <button type="button" className="textLink" onClick={() => setSearchOpen(true)}>
              VIEW ALL <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>

          {/* Filter + Sort Bar */}
          <div className="filterBar" data-reveal>
            <div className="filterTabs">
              {FILTER_TABS.map(([val, label]) => (
                <button
                  key={val}
                  className={activeFilter === val ? "filterTab filterTabActive" : "filterTab"}
                  type="button"
                  onClick={() => setActiveFilter(val)}
                >
                  {label}
                  {val === "new" && <span className="newDot" />}
                </button>
              ))}
            </div>
            <select
              className="sortSelect"
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>
          </div>

          <div className="productGrid">
            {displayProducts.length ? displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedIndex={selectedVariants[product.id] || 0}
                isWished={wishlist.has(product.id)}
                onVariant={selectVariant}
                onWish={toggleWishlist}
                onQuickView={setQuickView}
                onAdd={addToCart}
              />
            )) : (
              <div className="emptyFilter">
                <p>No pieces in this category yet.</p>
                <button className="textLink" type="button" onClick={() => setActiveFilter("all")}>
                  VIEW ALL <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── Fabric editorial ────────────────────────── */}
        <section className="fabricSection" data-reveal>
          <div className="fabricInner">
            <div className="fabricImageWrap">
              <img src={asset("fabric-story")} alt="Blaquelyś fabric detail" />
            </div>
            <div className="fabricCard">
              <small>Fabric. Fit. Feel.</small>
              <h2>OUR OFF DUTY<br />STANDARD.</h2>
              <p>
                Every piece is crafted in premium, breathable fabrics with a fit
                that moves with you. Made to be worn well. Designed to last beyond seasons.
              </p>
              <div className="fabricIcons">
                <div>
                  <div className="fabricIconCircle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C6754"><circle cx="12" cy="12" r="10" strokeWidth="1.5"/></svg>
                  </div>
                  <small>PREMIUM FABRICS</small>
                </div>
                <div>
                  <div className="fabricIconCircle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C6754"><path d="M12 2L2 7l10 5 10-5-10-5z" strokeWidth="1.5"/></svg>
                  </div>
                  <small>LUXE COMFORT</small>
                </div>
                <div>
                  <div className="fabricIconCircle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C6754"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" strokeWidth="1.5"/></svg>
                  </div>
                  <small>TIMELESS DESIGN</small>
                </div>
                <div>
                  <div className="fabricIconCircle">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C6754"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" strokeWidth="1.5"/></svg>
                  </div>
                  <small>MADE TO TRAVEL</small>
                </div>
              </div>
              <button className="fabricCta" type="button" onClick={() => setNoteOpen(true)}>
                READ OUR STORY →
              </button>
            </div>
          </div>
        </section>

        {/* ── Shop the Look ───────────────────────────── */}
        <section className="looksSection">
          <div className="sectionHeader" data-reveal>
            <h2>SHOP THE LOOK</h2>
            <button type="button" className="textLink" onClick={() => scrollTo(".looksSection")}>
              VIEW ALL LOOKS <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
          <div className="lookGrid">
            {looks.map((look, li) => (
              <article className="lookCard" key={look.name} data-reveal>
                <div className="lookImageWrap">
                  <img src={asset(look.image)} alt={look.name} />
                  <div className="lookOverlay">
                    <button className="button buttonDark" type="button" onClick={() => {
                      look.productIds.forEach((pid) => { const p = products.find((x) => x.id === pid); if (p) addToCart(p); });
                    }}>
                      ADD LOOK TO BAG
                    </button>
                  </div>
                </div>
                <div className="lookInfo">
                  <span className="lookNum">0{li + 1}</span>
                  <h3>{look.name}</h3>
                  <ul>
                    {look.items.map((item, ii) => (
                      <li key={item}>
                        <button type="button" onClick={() => {
                          const p = products.find((x) => x.id === look.productIds[ii]);
                          if (p) setQuickView(p);
                        }}>
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <strong>{look.price}</strong>
                  <button className="button buttonLight" type="button" onClick={() => {
                    look.productIds.forEach((pid) => { const p = products.find((x) => x.id === pid); if (p) addToCart(p); });
                  }}>
                    SHOP THIS LOOK
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Editorial band ──────────────────────────── */}
        <div className="editorialBand" aria-hidden="true">
          <p>OFF DUTY.</p>
          <p>EVERY<br/>WHERE.</p>
        </div>

        {/* ── Social / Instagram ──────────────────────── */}
        <section className="socialSection" data-reveal>
          <div className="socialHeader">
            <h2>OFF DUTY. EVERYWHERE.</h2>
            <button type="button" className="textLink" onClick={() => setNoteOpen(true)}>
              @BLAQUELYŚ <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
          <div className="socialStrip">
            {social.map((image, i) => (
              <div className="socialTile" key={`${image}-${i}`}>
                <img src={asset(image)} alt="" />
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Newsletter bar ──────────────────────────── */}
      <section className="newsletter" aria-label="Newsletter signup">
        <div className="newsletterInner">
          <div className="newsletterLeft">
            <div className="newsletterIconCircle">
              <Mail size={28} strokeWidth={1.2} />
            </div>
            <div>
              <h2>THE INNER CIRCLE</h2>
              <p>New drops, exclusive access, and style delivered directly.</p>
            </div>
          </div>
          <form onSubmit={handleNewsletter}>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" placeholder="Enter your email" required />
            <button type="submit" disabled={sending === "newsletter"}>
              {sending === "newsletter" ? "SENDING" : "SUBSCRIBE"}
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────── */}
      <footer>
        <div className="footerMain">
          <div className="footerBrand">
            <span className="logoFooter">BLAQUELYŚ</span>
            <p>Luxury street essentials for her and the one beside her.<br />Made to wear. Styled to be.</p>
            <div className="socialIcons" aria-label="Social links">
              <a href="#" aria-label="Instagram"><Instagram size={17} strokeWidth={1.4} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={17} strokeWidth={1.4} /></a>
              <a href="#" aria-label="YouTube"><Youtube size={17} strokeWidth={1.4} /></a>
            </div>
          </div>
          <div className="footerColumn">
            <h3>SHOP</h3>
            {[["New In","new"],["Women","women"],["Him","men"],["Sets","sets"],["Best Sellers","all"]].map(([l, f]) => (
              <button key={l} type="button" onClick={() => { setActiveFilter(f); scrollTo(".productsSection"); }}>{l}</button>
            ))}
          </div>
          <div className="footerColumn">
            <h3>CUSTOMER CARE</h3>
            {["FAQ & Shipping", "Returns & Exchanges"].map((l) => (
              <button key={l} type="button">{l}</button>
            ))}
            <button type="button" onClick={() => setSizeGuideOpen(true)}>Size Guide</button>
            <button type="button" onClick={() => setNoteOpen(true)}>Contact The Concierge</button>
          </div>
          <div className="footerColumn">
            <h3>LEGAL</h3>
            {["Our Story", "Terms & Conditions", "Privacy Policy"].map((l) => (
              <button key={l} type="button">{l}</button>
            ))}
          </div>
        </div>
        <div className="footerBottom">
          <p>© 2026 BLAQUELYŚ. ALL RIGHTS RESERVED.</p>
          <div className="paymentRow" aria-label="Accepted payment methods">
            {["Shop", "Pay", "GPay", "Klarna", "PayPal", <CreditCard key="mc" size={11} strokeWidth={1.4} />, "Visa", "Amex"].map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showBackTop && (
        <button className="backToTop" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <ArrowUp size={16} strokeWidth={2} />
        </button>
      )}

      {/* ── Overlays ───────────────────────────────── */}
      <SearchPanel
        open={searchOpen}
        query={query}
        setQuery={setQuery}
        products={filteredSearch}
        onClose={() => setSearchOpen(false)}
        onQuickView={(p) => { setQuickView(p); setSearchOpen(false); }}
      />
      <CartDrawer
        open={cartOpen}
        cart={cart}
        total={cartTotal}
        finalTotal={finalTotal}
        discountAmount={discountAmount}
        promoApplied={promoApplied}
        promoInput={promoInput}
        setPromoInput={setPromoInput}
        onApplyPromo={applyPromo}
        shippingProgress={shippingProgress}
        shippingLeft={shippingLeft}
        sending={sending === "checkout"}
        checkoutStep={checkoutStep}
        setCheckoutStep={setCheckoutStep}
        onClose={() => { setCartOpen(false); setCheckoutStep(null); }}
        onUpdate={updateCart}
        onCheckout={handleCheckout}
      />
      <WishlistDrawer
        open={wishlistOpen}
        items={wishlisted}
        selectedVariants={selectedVariants}
        onClose={() => setWishlistOpen(false)}
        onAdd={addToCart}
        onWish={toggleWishlist}
        onView={(p) => { setQuickView(p); setWishlistOpen(false); }}
      />
      <ConciergeDrawer
        open={noteOpen}
        sending={sending === "concierge"}
        onClose={() => setNoteOpen(false)}
        onSubmit={handleConcierge}
      />
      {quickView && (
        <QuickView
          product={quickView}
          selectedIndex={selectedVariants[quickView.id] || 0}
          onVariant={selectVariant}
          onAdd={addToCart}
          onClose={() => setQuickView(null)}
          onSizeGuide={() => setSizeGuideOpen(true)}
        />
      )}
      {sizeGuideOpen && (
        <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />
      )}
      <div className={toast ? "toast toastVisible" : "toast"} role="status">
        <Check size={16} strokeWidth={1.6} />
        {toast}
      </div>
    </div>
  );
}

function ProductCard({ product, selectedIndex, isWished, onVariant, onWish, onQuickView, onAdd }) {
  const [sizeOpen, setSizeOpen] = useState(false);
  const variant   = product.variants[selectedIndex];
  const hoverImg  = product.variants[(selectedIndex + 1) % product.variants.length];
  return (
    <article className="productCard" data-reveal onMouseLeave={() => setSizeOpen(false)}>
      <div className="productImage">
        {product.badge && (
          <span className={`productBadge badge${product.badge.replace(" ", "")}`}>{product.badge}</span>
        )}
        <button type="button" className="imageButton" onClick={() => onQuickView(product)} aria-label={`View ${product.name}`}>
          <img className="imgPrimary" src={asset(variant.image)} alt={product.name} />
          <img className="imgHover" src={asset(hoverImg.image)} alt="" aria-hidden="true" />
        </button>
        <button
          className={isWished ? "heartButton heartButtonActive" : "heartButton"}
          aria-label={`Save ${product.name}`}
          onClick={() => onWish(product.id)}
        >
          <Heart size={16} strokeWidth={1.5} />
        </button>
        <div className={sizeOpen ? "quickAddWrap quickAddOpen" : "quickAddWrap"}>
          {sizeOpen ? (
            <div className="quickSizePop">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { onAdd(product, s); setSizeOpen(false); }}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : (
            <button type="button" className="quickAdd" onClick={() => setSizeOpen(true)}>
              QUICK ADD
            </button>
          )}
        </div>
      </div>
      <div className="productCardBody">
        <div className="productCardTop">
          <h3>{product.name}</h3>
          <strong>{money(product.price)}</strong>
        </div>
        <p>{variant.label}</p>
        <div className="swatches" aria-label={`${product.name} colors`}>
          {product.swatches.map((color, index) => (
            <button
              type="button"
              className={index === selectedIndex ? "swatchActive" : ""}
              key={color}
              style={{ background: color }}
              aria-label={`${product.name} ${product.variants[index].label}`}
              onClick={() => onVariant(product.id, index)}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

function SearchPanel({ open, query, setQuery, products, onClose, onQuickView }) {
  return (
    <aside className={open ? "panelOverlay panelOverlayOpen" : "panelOverlay"} aria-hidden={!open} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="searchPanel">
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close search">
          <X size={16} strokeWidth={1.5} />
        </button>
        <h2>Find Your Fit</h2>
        <label htmlFor="searchInput">Search products</label>
        <input
          id="searchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search color, set, or style…"
          autoFocus={open}
        />
        {query && (
          <div className="searchMeta">{products.length} result{products.length !== 1 ? "s" : ""}</div>
        )}
        <div className="searchResults">
          {products.map((product) => (
            <button type="button" key={product.id} onClick={() => onQuickView(product)}>
              <img src={asset(product.image)} alt="" />
              <span>
                <strong>{product.name}</strong>
                <small>{product.color} · {money(product.price)}</small>
                {product.badge && <em>{product.badge}</em>}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function CartDrawer({ open, cart, total, finalTotal, discountAmount, promoApplied, promoInput, setPromoInput, onApplyPromo, shippingProgress, shippingLeft, sending, checkoutStep, setCheckoutStep, onClose, onUpdate, onCheckout }) {
  return (
    <aside className={open ? "cartDrawer cartDrawerOpen" : "cartDrawer"} aria-hidden={!open}>
      <div className="drawerHeader">
        <h2>{checkoutStep === 3 ? "Order Confirmed" : checkoutStep === 2 ? "Payment" : checkoutStep === 1 ? "Shipping" : "Your Bag"}</h2>
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close cart">
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>

      {checkoutStep === 3 ? (
        <div className="checkoutConfirm">
          <div className="confirmIcon"><Check size={32} strokeWidth={1.5} /></div>
          <h3>Thank You!</h3>
          <p>Your order is being processed. You'll receive a confirmation email shortly from the Blaquelyś team.</p>
          <button className="button buttonDark" type="button" onClick={onClose}>CONTINUE SHOPPING</button>
        </div>
      ) : checkoutStep === 2 ? (
        <form className="checkoutForm" onSubmit={onCheckout}>
          <div className="formSection"><h4>Payment Details</h4></div>
          <label>Card Number</label>
          <input placeholder="1234 5678 9012 3456" required pattern=".{16,19}" maxLength={19} />
          <div className="formRow">
            <div>
              <label>Expiry</label>
              <input placeholder="MM / YY" required />
            </div>
            <div>
              <label>CVV</label>
              <input placeholder="123" required maxLength={4} />
            </div>
          </div>
          <label>Name on Card</label>
          <input placeholder="Full name" required />
          <div className="orderSummaryLine"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
          {discountAmount > 0 && <div className="orderSummaryLine promoLine"><span>Promo ({promoApplied})</span><span>−${discountAmount.toFixed(2)}</span></div>}
          <div className="orderSummaryLine"><span>Shipping</span><span>{total >= 150 ? "FREE" : "$8.95"}</span></div>
          <div className="orderSummaryLine totalLine"><span>Total</span><span>${(finalTotal + (total >= 150 ? 0 : 8.95)).toFixed(2)}</span></div>
          <button className="button buttonDark" type="submit" disabled={sending}>{sending ? "Processing…" : "PLACE ORDER"}</button>
          <button className="textLink" type="button" onClick={() => setCheckoutStep(1)} style={{marginTop:8,justifyContent:"center",width:"100%"}}>← Back</button>
        </form>
      ) : checkoutStep === 1 ? (
        <form className="checkoutForm" onSubmit={onCheckout}>
          <div className="formSection"><h4>Shipping Address</h4></div>
          <div className="formRow">
            <div><label>First Name</label><input placeholder="First" required /></div>
            <div><label>Last Name</label><input placeholder="Last" required /></div>
          </div>
          <label>Email</label>
          <input type="email" placeholder="you@example.com" required />
          <label>Address</label>
          <input placeholder="Street address" required />
          <div className="formRow">
            <div><label>City</label><input placeholder="City" required /></div>
            <div><label>State</label><input placeholder="ST" required maxLength={2} /></div>
            <div><label>ZIP</label><input placeholder="12345" required maxLength={10} /></div>
          </div>
          <button className="button buttonDark" type="submit">CONTINUE TO PAYMENT →</button>
          <button className="textLink" type="button" onClick={() => setCheckoutStep(null)} style={{marginTop:8,justifyContent:"center",width:"100%"}}>← Back to Bag</button>
        </form>
      ) : cart.length ? (
        <>
          {shippingLeft > 0 ? (
            <div className="shippingBar">
              <p>Add <strong>{money(shippingLeft)}</strong> more for free shipping</p>
              <div className="shippingTrack"><div className="shippingFill" style={{ width: `${shippingProgress}%` }} /></div>
            </div>
          ) : (
            <div className="shippingBar freeShipping">
              <p><Check size={13} strokeWidth={2} /> You've unlocked <strong>FREE shipping!</strong></p>
            </div>
          )}
          <div className="cartItems">
            {cart.map((item) => (
              <article key={item.cartId} className="cartItem">
                <img src={asset(item.image)} alt="" />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.color} · Size {item.size}</p>
                  <strong>{money(item.price)}</strong>
                  <div className="qtyControl">
                    <button type="button" onClick={() => onUpdate(item.cartId, item.quantity - 1)} aria-label="Decrease">
                      <Minus size={12} />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => onUpdate(item.cartId, item.quantity + 1)} aria-label="Increase">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="cartFooter">
            <div className="promoRow">
              <input
                placeholder="Promo code (try BLAQU10)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onApplyPromo()}
              />
              <button type="button" onClick={onApplyPromo}><Tag size={14} /></button>
            </div>
            {discountAmount > 0 && (
              <div className="promoAppliedRow"><Check size={12} strokeWidth={2} /> {promoApplied} — {Math.round((discountAmount / total) * 100)}% off applied</div>
            )}
            <div className="cartTotals">
              <p><span>Subtotal</span><span>{money(total)}</span></p>
              {discountAmount > 0 && <p className="discountLine"><span>Discount</span><span>−{money(discountAmount)}</span></p>}
              <p className="totalRow"><span>Total</span><strong>{money(finalTotal)}</strong></p>
            </div>
            <button className="button buttonDark" type="button" onClick={() => setCheckoutStep(1)}>
              CHECKOUT →
            </button>
          </div>
        </>
      ) : (
        <div className="emptyCart">
          <ShoppingBag size={40} strokeWidth={1} />
          <p>Your bag is waiting for something soft.</p>
        </div>
      )}
    </aside>
  );
}

function WishlistDrawer({ open, items, selectedVariants, onClose, onAdd, onWish, onView }) {
  return (
    <aside className={open ? "cartDrawer cartDrawerOpen" : "cartDrawer"} aria-hidden={!open}>
      <div className="drawerHeader">
        <h2>Saved</h2>
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close wishlist">
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
      {items.length ? (
        <div className="cartItems">
          {items.map((product) => {
            const idx = selectedVariants[product.id] || 0;
            const variant = product.variants[idx];
            return (
              <article key={product.id} className="cartItem wishlistItem">
                <button type="button" onClick={() => onView(product)} className="wishlistThumb">
                  <img src={asset(variant.image)} alt="" />
                </button>
                <div>
                  <h3>{product.name}</h3>
                  <p>{variant.label} · {money(product.price)}</p>
                  <div className="wishlistActions">
                    <button className="button buttonDark" type="button" style={{fontSize:"8px",padding:"8px 16px"}} onClick={() => onAdd(product)}>
                      ADD TO BAG
                    </button>
                    <button className="iconButton" type="button" onClick={() => onWish(product.id)} aria-label="Remove">
                      <X size={14} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="emptyCart">
          <Heart size={40} strokeWidth={1} />
          <p>No saved pieces yet. Heart a product to save it here.</p>
        </div>
      )}
    </aside>
  );
}

function ConciergeDrawer({ open, sending, onClose, onSubmit }) {
  return (
    <aside className={open ? "cartDrawer cartDrawerOpen" : "cartDrawer"} aria-hidden={!open}>
      <div className="drawerHeader">
        <h2>Styling Note</h2>
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close">
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
      <form className="conciergeForm" onSubmit={onSubmit}>
        <p>Send Blaquelyś a fit question, event note, or styling request.</p>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Your name" required />
        <label htmlFor="contactEmail">Email</label>
        <input id="contactEmail" name="contactEmail" type="email" placeholder="you@example.com" required />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows="6" placeholder="Tell us what you want styled." required />
        <button className="button buttonDark" type="submit" disabled={sending}>
          {sending ? "Sending…" : "Send Message"}
        </button>
      </form>
    </aside>
  );
}

function QuickView({ product, selectedIndex, onVariant, onAdd, onClose, onSizeGuide }) {
  const [size, setSize] = useState(product.sizes[2] || product.sizes[0]);
  const variant = product.variants[selectedIndex];
  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="quickViewTitle" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <article className="quickView">
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close quick view">
          <X size={16} strokeWidth={1.5} />
        </button>
        <div className="quickGallery">
          <img src={asset(variant.image)} alt={product.name} />
          <div>
            {product.variants.map((item, index) => (
              <button type="button" key={item.image} className={index === selectedIndex ? "thumbActive" : ""} onClick={() => onVariant(product.id, index)}>
                <img src={asset(item.image)} alt={item.label} />
              </button>
            ))}
          </div>
        </div>
        <div className="quickInfo">
          {product.badge && <span className={`productBadge badge${product.badge.replace(" ","")} quickBadge`}>{product.badge}</span>}
          <h2 id="quickViewTitle">{product.name}</h2>
          <p className="quickPrice">{money(product.price)} · {variant.label}</p>
          <p className="quickDesc">{product.description}</p>
          <div className="quickSwatches">
            <span>COLOR: {variant.label}</span>
            <div className="swatches">
              {product.swatches.map((color, index) => (
                <button
                  type="button"
                  key={color}
                  className={index === selectedIndex ? "swatchActive" : ""}
                  style={{ background: color }}
                  aria-label={product.variants[index].label}
                  onClick={() => onVariant(product.id, index)}
                />
              ))}
            </div>
          </div>
          <div className="sizePicker">
            <div className="sizePickerHeader">
              <span>SIZE: {size}</span>
              <button type="button" className="textLink" onClick={onSizeGuide} style={{fontSize:"9px"}}>
                <Ruler size={12} strokeWidth={1.5} /> SIZE GUIDE
              </button>
            </div>
            <div className="sizeButtons">
              {product.sizes.map((s) => (
                <button type="button" key={s} className={s === size ? "sizeActive" : ""} onClick={() => setSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button className="button buttonDark" type="button" onClick={() => { onAdd(product, size); onClose(); }}>
            ADD TO BAG — {money(product.price)}
          </button>
        </div>
      </article>
    </div>
  );
}

function SizeGuideModal({ onClose }) {
  const [tab, setTab] = useState("women");
  const cols = tab === "women" ? ["Bust", "Waist", "Hips"] : ["Chest", "Waist", "Inseam"];
  const rows = SIZE_GUIDE[tab];
  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Size Guide" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sizeGuide">
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close size guide"><X size={16} strokeWidth={1.5} /></button>
        <h2>Size Guide</h2>
        <p className="sizeGuideNote">All measurements in inches. Measure loosely over clothing.</p>
        <div className="sizeGuideTabs">
          {["women", "men"].map((t) => (
            <button key={t} type="button" className={tab === t ? "filterTab filterTabActive" : "filterTab"} onClick={() => setTab(t)}>
              {t === "women" ? "WOMEN" : "MEN"}
            </button>
          ))}
        </div>
        <table className="sizeTable">
          <thead>
            <tr>
              <th>Size</th>
              {cols.map((c) => <th key={c}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.size}>
                <td><strong>{row.size}</strong></td>
                {cols.map((c) => <td key={c}>{row[c.toLowerCase()]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="sizeGuideNote" style={{marginTop:16}}>
          <strong>Tip:</strong> When between sizes, size up for a relaxed fit or size down for a more tailored look.
        </div>
      </div>
    </div>
  );
}

export default App;
