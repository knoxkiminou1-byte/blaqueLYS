import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  CreditCard,
  Heart,
  Instagram,
  Facebook,
  Mail,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Truck,
  RefreshCw,
  User,
  X,
  Youtube,
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
  },
  {
    name: "The Airport Set",
    image: "look-airport",
    items: ["Signature Hoodie", "Wide Leg Sweatpant", "Crew Sock"],
    price: "$166.00",
  },
  {
    name: "The Weekend Set",
    image: "look-weekend",
    items: ["Cropped Zip Jacket", "Ribbed Tank", "Wide Leg Pant"],
    price: "$162.00",
  },
  {
    name: "The Vacay Set",
    image: "look-vacay",
    items: ["Linen Shirt", "Linen Short", "Tank Top"],
    price: "$148.00",
  },
];

const social = [
  "insta-couple",
  "insta-white-set",
  "insta-olive",
  "insta-brown",
  "insta-linen",
];

const money = (value) => `$${value.toFixed(2)}`;

async function sendSiteMessage(payload) {
  try {
    const response = await fetch("/api/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) throw new Error("Message endpoint unavailable");
    return response.json();
  } catch {
    const fallback = { ...payload, id: `local-${Date.now()}`, receivedAt: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem("blaqueLotusMessages") || "[]");
    localStorage.setItem("blaqueLotusMessages", JSON.stringify([fallback, ...saved].slice(0, 20)));
    return { ok: true, local: true, message: fallback };
  }
}

function App() {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [wishlist, setWishlist]   = useState(() => new Set());
  const [cart, setCart]           = useState([]);
  const [cartOpen, setCartOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickView, setQuickView] = useState(null);
  const [query, setQuery]         = useState("");
  const [toast, setToast]         = useState("");
  const [noteOpen, setNoteOpen]   = useState(false);
  const [sending, setSending]     = useState("");

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
      { threshold: 0.1 },
    );
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  const filteredProducts = useMemo(() => {
    const n = query.trim().toLowerCase();
    if (!n) return products;
    return products.filter((p) =>
      [p.name, p.color, ...p.variants.map((v) => v.label)].join(" ").toLowerCase().includes(n),
    );
  }, [query]);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

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
    setToast(`${product.name} added to bag`);
  };

  const updateCart = (cartId, quantity) =>
    setCart((items) => quantity <= 0 ? items.filter((i) => i.cartId !== cartId) : items.map((i) => i.cartId === cartId ? { ...i, quantity } : i));

  const toggleWishlist = (id) =>
    setWishlist((cur) => { const n = new Set(cur); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const scrollTo = (selector) =>
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleNewsletter = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSending("newsletter");
    await sendSiteMessage({ type: "newsletter", email: form.get("email"), source: "footer-newsletter" });
    e.currentTarget.reset();
    setSending("");
    setToast("You are on the list");
  };

  const handleConcierge = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSending("concierge");
    await sendSiteMessage({ type: "concierge", name: form.get("name"), email: form.get("contactEmail"), message: form.get("message"), cart: cart.map(({ name, color, size, quantity }) => ({ name, color, size, quantity })) });
    e.currentTarget.reset();
    setSending("");
    setToast("Message sent to Blaque Lotus");
  };

  const handleCheckoutMessage = async () => {
    setSending("checkout");
    await sendSiteMessage({ type: "checkout-intent", message: "Customer started checkout from storefront cart.", cart, total: cartTotal });
    setSending("");
    setToast("Checkout note sent");
  };

  return (
    <div className="siteShell">
      <div className="canvasGrain" aria-hidden="true" />

      {/* Announcement bar */}
      <div className="announcement">
        <div>
          <Truck size={13} strokeWidth={1.6} />
          FREE U.S. SHIPPING ON ORDERS $150+
        </div>
        <button className="announcementCenter" type="button" onClick={() => scrollTo(".productsSection")}>
          NEW DROP LIVE <span>|</span> <a>SHOP NOW</a>
        </button>
        <div>
          <RefreshCw size={13} strokeWidth={1.7} />
          EASY RETURNS
        </div>
      </div>

      {/* Floating header */}
      <header>
        <nav className="nav" aria-label="Main navigation">
          <div className="navGroup navLeft">
            <button className="iconButton" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => scrollTo(".productsSection")}>NEW IN</button>
            <button type="button" onClick={() => scrollTo(".categorySection")}>WOMEN</button>
            <button type="button" onClick={() => scrollTo(".productsSection")}>HIM</button>
            <button type="button" onClick={() => scrollTo(".looksSection")}>SETS</button>
          </div>

          <button className="brandLink" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="logo">BLAQUE LOTUS</span>
          </button>

          <div className="navGroup navRight">
            <button type="button" onClick={() => scrollTo(".categorySection")}>COUPLES EDIT</button>
            <button type="button" onClick={() => scrollTo(".productsSection")}>BEST SELLERS</button>
            <button className="iconButton" aria-label="Styling concierge" onClick={() => setNoteOpen(true)}>
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="iconButton cartIconButton" aria-label="Cart" onClick={() => setCartOpen(true)}>
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount ? <span>{cartCount}</span> : null}
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────── */}
        <section className="hero">
          {/* Animated SVG curved retro lines */}
          <svg className="retroLinesSvg" viewBox="0 0 500 500" fill="none" aria-hidden="true">
            <path d="M-100 200 C 150 200, 250 100, 250 -100" stroke="#7C6754" strokeWidth="22" strokeLinecap="round"/>
            <path d="M-100 240 C 170 240, 280 120, 280 -100" stroke="#A98F78" strokeWidth="22" strokeLinecap="round"/>
            <path d="M-100 280 C 190 280, 310 140, 310 -100" stroke="#E4DAC3" strokeWidth="22" strokeLinecap="round"/>
          </svg>

          <img src={asset("hero-couple")} alt="" className="heroImage" />
          <div className="heroGradient" aria-hidden="true" />

          <div className="heroCopy">
            <div className="heroCopyInner">
              <h1>CITY PLAY.<br />LUXE LINES.</h1>
              <p>Cartoon chic for her and<br />the one beside her.</p>
              <div className="heroActions">
                <button className="button buttonDark" type="button" onClick={() => scrollTo(".productsSection")}>
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
        <section className="categorySection" aria-label="Featured categories" data-reveal>
          <div className="categoryGrid">
            {categories.map(([label, image]) => (
              <button
                type="button"
                className="categoryTile"
                key={label}
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

        {/* ── Best Sellers ────────────────────────────── */}
        <section className="sectionBlock productsSection">
          <div className="sectionHeader" data-reveal>
            <h2>BEST SELLERS</h2>
            <button type="button" className="textLink" onClick={() => setSearchOpen(true)}>
              VIEW ALL <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
          <div className="productGrid">
            {products.map((product) => (
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
            ))}
          </div>
        </section>

        {/* ── Fabric editorial ────────────────────────── */}
        <section className="fabricSection" data-reveal>
          <div className="fabricInner">
            <div className="fabricImageWrap">
              <img src={asset("fabric-story")} alt="Blaque Lotus fabric detail" />
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
            {looks.map((look) => (
              <article className="lookCard" key={look.name} data-reveal>
                <div className="lookImageWrap">
                  <img src={asset(look.image)} alt={look.name} />
                </div>
                <div className="lookInfo">
                  <h3>{look.name}</h3>
                  <ul>
                    {look.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <strong>{look.price}</strong>
                  <button className="button buttonLight" type="button" onClick={() => addToCart(products[0])}>
                    SHOP THIS LOOK
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Social / Instagram ──────────────────────── */}
        <section className="socialSection" data-reveal>
          <div className="socialHeader">
            <h2>OFF DUTY. EVERYWHERE.</h2>
            <button type="button" className="textLink" onClick={() => setNoteOpen(true)}>
              @BLAQUELOTUS <ArrowRight size={16} strokeWidth={1.5} />
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
            <span className="logoFooter">BLAQUE LOTUS</span>
            <p>Luxury street essentials for her and the one beside her.<br />Made to wear. Styled to be.</p>
            <div className="socialIcons" aria-label="Social links">
              <a href="#" aria-label="Instagram"><Instagram size={17} strokeWidth={1.4} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={17} strokeWidth={1.4} /></a>
              <a href="#" aria-label="YouTube"><Youtube size={17} strokeWidth={1.4} /></a>
            </div>
          </div>
          <div className="footerColumn">
            <h3>SHOP</h3>
            {["New In", "Women", "Him", "Sets", "Best Sellers"].map((l) => (
              <button key={l} type="button" onClick={() => scrollTo(".productsSection")}>{l}</button>
            ))}
          </div>
          <div className="footerColumn">
            <h3>CUSTOMER CARE</h3>
            {["FAQ & Shipping", "Returns & Exchanges", "Size Guide"].map((l) => (
              <button key={l} type="button">{l}</button>
            ))}
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
          <p>© 2026 BLAQUE LOTUS. ALL RIGHTS RESERVED.</p>
          <div className="paymentRow" aria-label="Accepted payment methods">
            {["Shop", "Pay", "GPay", "Klarna", "PayPal", <CreditCard key="mc" size={11} strokeWidth={1.4} />, "Visa", "Amex"].map((label, i) => (
              <span key={i}>{label}</span>
            ))}
          </div>
        </div>
      </footer>

      {/* ── Overlays ───────────────────────────────── */}
      <SearchPanel
        open={searchOpen}
        query={query}
        setQuery={setQuery}
        products={filteredProducts}
        onClose={() => setSearchOpen(false)}
        onQuickView={(p) => { setQuickView(p); setSearchOpen(false); }}
      />
      <CartDrawer
        open={cartOpen}
        cart={cart}
        total={cartTotal}
        sending={sending === "checkout"}
        onClose={() => setCartOpen(false)}
        onUpdate={updateCart}
        onCheckout={handleCheckoutMessage}
      />
      <ConciergeDrawer
        open={noteOpen}
        sending={sending === "concierge"}
        onClose={() => setNoteOpen(false)}
        onSubmit={handleConcierge}
      />
      {quickView ? (
        <QuickView
          product={quickView}
          selectedIndex={selectedVariants[quickView.id] || 0}
          onVariant={selectVariant}
          onAdd={addToCart}
          onClose={() => setQuickView(null)}
        />
      ) : null}
      <div className={toast ? "toast toastVisible" : "toast"} role="status">
        <Check size={16} strokeWidth={1.6} />
        {toast}
      </div>
    </div>
  );
}

function ProductCard({ product, selectedIndex, isWished, onVariant, onWish, onQuickView, onAdd }) {
  const variant = product.variants[selectedIndex];
  return (
    <article className="productCard" data-reveal>
      <div className="productImage">
        <button type="button" className="imageButton" onClick={() => onQuickView(product)} aria-label={`View ${product.name}`}>
          <img src={asset(variant.image)} alt={product.name} />
        </button>
        <button
          className={isWished ? "heartButton heartButtonActive" : "heartButton"}
          aria-label={`Save ${product.name}`}
          onClick={() => onWish(product.id)}
        >
          <Heart size={16} strokeWidth={1.5} />
        </button>
        <button type="button" className="quickAdd" onClick={() => onAdd(product)}>
          Quick Add
        </button>
      </div>
      <h3>{product.name}</h3>
      <p>{variant.label}</p>
      <strong>{money(product.price)}</strong>
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
    </article>
  );
}

function SearchPanel({ open, query, setQuery, products, onClose, onQuickView }) {
  return (
    <aside className={open ? "panelOverlay panelOverlayOpen" : "panelOverlay"} aria-hidden={!open}>
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
          placeholder="Search color, set, or style"
        />
        <div className="searchResults">
          {products.map((product) => (
            <button type="button" key={product.id} onClick={() => onQuickView(product)}>
              <img src={asset(product.image)} alt="" />
              <span>
                <strong>{product.name}</strong>
                <small>{product.color} · {money(product.price)}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function CartDrawer({ open, cart, total, sending, onClose, onUpdate, onCheckout }) {
  return (
    <aside className={open ? "cartDrawer cartDrawerOpen" : "cartDrawer"} aria-hidden={!open}>
      <div className="drawerHeader">
        <h2>Your Bag</h2>
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close cart">
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>
      {cart.length ? (
        <>
          <div className="cartItems">
            {cart.map((item) => (
              <article key={item.cartId} className="cartItem">
                <img src={asset(item.image)} alt="" />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.color} · {item.size}</p>
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
            <p>
              <span>Subtotal</span>
              <strong>{money(total)}</strong>
            </p>
            <button className="button buttonDark" type="button" onClick={onCheckout} disabled={sending}>
              {sending ? "Sending…" : "Send Checkout Note"}
            </button>
          </div>
        </>
      ) : (
        <div className="emptyCart">
          <p>Your bag is waiting for something soft.</p>
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
        <p>Send Blaque Lotus a fit question, event note, or styling request.</p>
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

function QuickView({ product, selectedIndex, onVariant, onAdd, onClose }) {
  const [size, setSize] = useState(product.sizes[2] || product.sizes[0]);
  const variant = product.variants[selectedIndex];
  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="quickViewTitle">
      <article className="quickView">
        <button className="closeButton" type="button" onClick={onClose} aria-label="Close quick view">
          <X size={16} strokeWidth={1.5} />
        </button>
        <div className="quickGallery">
          <img src={asset(variant.image)} alt={product.name} />
          <div>
            {product.variants.map((item, index) => (
              <button type="button" key={item.image} className={index === selectedIndex ? "thumbActive" : ""} onClick={() => onVariant(product.id, index)}>
                <img src={asset(item.image)} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="quickInfo">
          <span>Best Seller</span>
          <h2 id="quickViewTitle">{product.name}</h2>
          <p>{variant.label} · {money(product.price)}</p>
          <div className="sizePicker">
            {product.sizes.map((s) => (
              <button type="button" key={s} className={s === size ? "sizeActive" : ""} onClick={() => setSize(s)}>
                {s}
              </button>
            ))}
          </div>
          <button className="button buttonDark" type="button" onClick={() => onAdd(product, size)}>
            Add To Bag
          </button>
        </div>
      </article>
    </div>
  );
}

export default App;
