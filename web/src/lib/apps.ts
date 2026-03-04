export type AppItem = {
  slug: string;
  name: string;
  category: string;
  platform: "Windows" | "macOS" | "Android" | "Linux" | "iOS";
  price: string;
  rating: number;
  imageUrl: string;
  description: string;
};

export const apps: AppItem[] = [
  {
    slug: "omnimail",
    name: "OmniMail",
    category: "Communications",
    platform: "Windows",
    price: "Free",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=500",
    description: "Unified email and messaging platform for seamless communication across all channels.",
  },
  {
    slug: "writeflow",
    name: "WriteFlow",
    category: "Writing",
    platform: "macOS",
    price: "$2.99",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1455849318169-8381d3927398?w=500",
    description: "Distraction-free writing environment with advanced formatting and collaboration tools.",
  },
  {
    slug: "planify",
    name: "Planify",
    category: "Productivity",
    platform: "Android",
    price: "Free",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500",
    description: "Smart project management and task tracking with AI-powered scheduling.",
  },
  {
    slug: "designstudio",
    name: "DesignStudio",
    category: "Design",
    platform: "Windows",
    price: "$49.99",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500",
    description: "Professional graphic design tool with templates, AI assistance, and cloud collaboration.",
  },
  {
    slug: "codesmith",
    name: "CodeSmith",
    category: "Development",
    platform: "Linux",
    price: "$19.99",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500",
    description: "Advanced code editor with intelligent syntax highlighting and debugging tools.",
  },
  {
    slug: "securevault",
    name: "SecureVault",
    category: "Security",
    platform: "iOS",
    price: "$9.99",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f5ae4e8a84e?w=500",
    description: "Military-grade encryption for passwords, documents, and sensitive personal information.",
  },
];

export const games: AppItem[] = [
  {
    slug: "cyber-tactics",
    name: "Cyber Tactics",
    category: "Strategy",
    platform: "Windows",
    price: "$19.99",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500",
    description: "Lead elite squads through tactical sci-fi campaigns and online ranked battles.",
  },
  {
    slug: "retro-console",
    name: "Retro Console",
    category: "Simulation",
    platform: "Android",
    price: "Free",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500",
    description: "Build and manage your dream retro gaming corner with collectible classics.",
  },
  {
    slug: "apex-drift",
    name: "Apex Drift",
    category: "Racing",
    platform: "Linux",
    price: "$29.99",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=500",
    description: "High-speed racing with advanced physics, custom tracks, and global tournaments.",
  },
  {
    slug: "neon-knight",
    name: "Neon Knight",
    category: "Action",
    platform: "Windows",
    price: "$14.99",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=500",
    description: "Hack-and-slash action adventure set in a vibrant neon cyberpunk universe.",
  },
  {
    slug: "ghost-runner",
    name: "Ghost Runner",
    category: "Parkour",
    platform: "iOS",
    price: "$9.99",
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500",
    description: "Precision movement and high-adrenaline parkour across futuristic cityscapes.",
  },
  {
    slug: "pixel-quest",
    name: "Pixel Quest",
    category: "RPG",
    platform: "macOS",
    price: "Free",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500",
    description: "A modern pixel RPG with rich storytelling and co-op dungeon expeditions.",
  },
];

export const productivityApps = [
  { name: "OmniMail", category: "Communications", price: "Free", cta: "Get", color: "bg-blue-500" },
  { name: "WriteFlow", category: "Writing", price: "$2.99", cta: "Buy", color: "bg-purple-500" },
  { name: "Planify", category: "Productivity", price: "Free", cta: "Get", color: "bg-orange-500" },
];
