import { siteAssets } from "../assets/siteAssets";

export const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "FAQ", path: "/faq" },
];

export const homeCategories = [
  {
    title: "Women's Edit",
    description: "Refined layers, sharp accessories, and elevated wardrobe staples.",
    image: siteAssets.categories.women,
  },
  {
    title: "Men's Wardrobe",
    description: "Smart outerwear, structured bags, and everyday pieces with polish.",
    image: siteAssets.categories.men,
  },
  {
    title: "Young Classics",
    description: "Soft textures and comfortable layers designed for easy daily wear.",
    image: siteAssets.categories.kids,
  },
  {
    title: "Accessories",
    description: "Bags, jewelry, and functional finishing details with a modern feel.",
    image: siteAssets.categories.accessories,
  },
];

export const highlights = [
  {
    icon: "fa-truck-fast",
    title: "Free Shipping",
    text: "Free delivery on orders above $99 across major cities.",
  },
  {
    icon: "fa-shield-heart",
    title: "Secure Checkout",
    text: "Simple and safe checkout experience with trusted payment flow.",
  },
  {
    icon: "fa-rotate-left",
    title: "Easy Returns",
    text: "7-day return support on eligible items for peace of mind.",
  },
  {
    icon: "fa-headset",
    title: "Friendly Support",
    text: "Helpful support team ready to assist with product questions.",
  },
];

export const testimonials = [
  {
    name: "Riya Kapoor",
    role: "Style Shopper",
    text: "Everything feels more curated now. The products finally match the images and the whole store looks sharper.",
  },
  {
    name: "Arjun Verma",
    role: "Frequent Buyer",
    text: "The browsing flow is smooth, and the cleaner product cards make the catalog feel much more premium.",
  },
  {
    name: "Neha Singh",
    role: "First-Time Visitor",
    text: "The refreshed colors and spacing make the site feel more modern without becoming hard to use.",
  },
];

export const faqs = [
  {
    question: "Can I save items for later?",
    answer: "Yes. You can keep your favorite styles in your wishlist and return to them anytime while browsing BuzzBuy.",
  },
  {
    question: "What can I shop at BuzzBuy?",
    answer: "BuzzBuy offers curated fashion across clothing, accessories, and everyday style essentials for modern wardrobes.",
  },
  {
    question: "Does BuzzBuy offer easy returns?",
    answer: "Yes. Eligible items come with a simple return experience so you can shop with more confidence.",
  },
  {
    question: "Can I shop on mobile too?",
    answer: "Yes. BuzzBuy is designed for smooth browsing across mobile, tablet, and desktop devices.",
  },
];

export const footerGroups = [
  {
    title: "Shop",
    links: [
      { label: "All Products", path: "/products" },
      { label: "Wishlist", path: "/wishlist" },
      { label: "Cart", path: "/cart" },
      { label: "Checkout", path: "/checkout" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Profile", path: "/profile" },
      { label: "Orders", path: "/orders" },
      { label: "FAQ", path: "/faq" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", path: "/contact" },
      { label: "Login", path: "/login" },
      { label: "Register", path: "/register" },
      { label: "Help Center", path: "/faq" },
    ],
  },
];

export const stats = [
  { value: "12K+", label: "Happy customers" },
  { value: "180+", label: "Curated pieces" },
  { value: "96%", label: "Repeat buyers" },
  { value: "24/7", label: "Style support" },
];

export const heroContent = {
  title: "Sharper product stories, cleaner shopping flow, fresher visual style.",
  text: "Browse a curated fashion destination filled with apparel, footwear, and accessories chosen to make everyday style feel elevated and effortless.",
  image: siteAssets.hero,
  saleImage: siteAssets.sale,
  slides: [
    siteAssets.hero,
    siteAssets.categories.women,
    siteAssets.categories.men,
    siteAssets.categories.accessories,
  ],
};
