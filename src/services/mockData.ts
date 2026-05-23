/**
 * Highly realistic simulated data generator for Serper.dev endpoints.
 * Dynamically inserts the search query to make mock searches look real and interactive.
 */
export const getMockResults = (query, type = "search") => {
  const q = query || "Nike";
  const formattedQuery = q.charAt(0).toUpperCase() + q.slice(1);

  // Small delay simulation wrapper
  return new Promise((resolve) => {
    setTimeout(() => {
      switch (type) {
        case "images":
          resolve(generateMockImages(formattedQuery));
          break;
        case "videos":
          resolve(generateMockVideos(formattedQuery));
          break;
        case "news":
          resolve(generateMockNews(formattedQuery));
          break;
        case "search":
        default:
          resolve(generateMockWeb(formattedQuery));
          break;
      }
    }, 400); // 400ms natural network delay
  });
};

const generateMockWeb = (q) => ({
  searchParameters: {
    q,
    type: "search",
    engine: "google"
  },
  organic: [
    {
      title: `${q} Official Site | Shop Shoes, Apparel & Gear`,
      link: `https://www.official-${q.toLowerCase()}.com`,
      snippet: `Explore the newest collections of ${q}. Find top-tier clothing, high-performance shoes, activewear, and athletic gear. Free shipping on qualifying orders.`,
      position: 1
    },
    {
      title: `Buy ${q} Products Online at Discounted Prices`,
      link: `https://www.e-shop.com/brands/${q.toLowerCase()}`,
      snippet: `Shop online for the latest range of ${q} footwear, accessories, and sportswear at our marketplace. Enjoy quick delivery, easy returns, and 24/7 client support.`,
      position: 2
    },
    {
      title: `${q} - Wikipedia Entry`,
      link: `https://en.wikipedia.org/wiki/${q}`,
      snippet: `${q} is an international corporation engaged in the design, development, manufacturing, and worldwide marketing and sales of apparel, equipment, and accessories.`,
      position: 3
    },
    {
      title: `Latest reviews of ${q} premium products | GearHead`,
      link: `https://www.gearhead-reviews.com/${q.toLowerCase()}-review`,
      snippet: `We review the top 5 ${q} products released this quarter. Read our unbiased hands-on performance analysis, pros and cons, and sizing guide before you buy.`,
      position: 4
    },
    {
      title: `Why ${q} is dominating the modern lifestyle trends`,
      link: `https://www.trendsetter-mag.com/culture/${q.toLowerCase()}-trends`,
      snippet: `From athletics to high fashion, here is a detailed analytical breakdown of how ${q} successfully positioned itself as a cultural icon in this generation.`,
      position: 5
    }
  ],
  peopleAlsoAsk: [
    {
      question: `What makes ${q} products so popular?`,
      snippet: `The popularity of ${q} stems from high-quality engineering, premium material selections, and dynamic storytelling marketing that inspires users worldwide.`,
      title: `Unlocking the popularity of ${q} | Brand Academy`,
      link: `https://www.brand-academy.com/analysis/${q.toLowerCase()}`
    },
    {
      question: `Where is the nearest ${q} store located?`,
      snippet: `You can find the nearest authorized retail locations and flagship outlets by accessing the store locator tool directly on their official portal.`,
      title: `Store Locator Tool | ${q} Global`,
      link: `https://www.official-${q.toLowerCase()}.com/stores`
    }
  ],
  relatedSearches: [
    { query: `${q} promo code` },
    { query: `${q} new release` },
    { query: `${q} size chart` },
    { query: `alternatives to ${q}` }
  ]
});

const generateMockImages = (q) => ({
  searchParameters: {
    q,
    type: "images",
    engine: "google"
  },
  images: [
    {
      title: `${q} Running Shoes Blue Wave`,
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
      imageWidth: 400,
      imageHeight: 267,
      source: "Unsplash Sports",
      link: `https://www.unsplash.com/photos/shoes-${q.toLowerCase()}`
    },
    {
      title: `Modern ${q} Lifestyle Activewear Display`,
      imageUrl: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400&q=80",
      imageWidth: 400,
      imageHeight: 500,
      source: "Unsplash Style",
      link: `https://www.unsplash.com/photos/clothing-${q.toLowerCase()}`
    },
    {
      title: `Minimalist ${q} Brand Logo Accent`,
      imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&q=80",
      imageWidth: 400,
      imageHeight: 267,
      source: "Unsplash Sneakers",
      link: `https://www.unsplash.com/photos/sneakers-${q.toLowerCase()}`
    },
    {
      title: `Authorized Retail Storefront of ${q}`,
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
      imageWidth: 400,
      imageHeight: 267,
      source: "Unsplash Storefront",
      link: `https://www.unsplash.com/photos/shop-${q.toLowerCase()}`
    },
    {
      title: `Professional athlete training in ${q} gear`,
      imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80",
      imageWidth: 400,
      imageHeight: 267,
      source: "Unsplash Athlete",
      link: `https://www.unsplash.com/photos/fitness-${q.toLowerCase()}`
    }
  ]
});

const generateMockVideos = (q) => ({
  searchParameters: {
    q,
    type: "videos",
    engine: "google"
  },
  videos: [
    {
      title: `${q} Brand Campaign Video - Find Your Greatness`,
      link: "https://www.youtube.com/watch?v=WYP9AGtLvRg",
      snippet: `Watch the official inspiration cinematic release from ${q}. Push limits, break boundaries, and unlock your true inner potential starting today.`,
      imageUrl: "https://images.unsplash.com/photo-1508609348619-482c77a4aa27?w=400&q=80",
      duration: "2:45",
      source: "YouTube",
      channel: `${q} Official Channel`,
      date: "3 weeks ago"
    },
    {
      title: `Everything you need to know about the new ${q} lineup`,
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      snippet: `In-depth video analysis testing the durable materials, structural stability, and everyday comfort of ${q}'s newest product launch. Review by TechFit.`,
      imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&q=80",
      duration: "12:15",
      source: "YouTube",
      channel: "TechFit Reviews",
      date: "5 days ago"
    },
    {
      title: `${q} Factory Tour - How the premium gear is manufactured`,
      link: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
      snippet: `Go inside the state-of-the-art facilities of ${q} to observe the advanced robotics, sustainable sourcing methods, and intensive quality checks.`,
      imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&q=80",
      duration: "8:30",
      source: "Vimeo",
      channel: "Mega Factories",
      date: "1 month ago"
    }
  ]
});

const generateMockNews = (q) => ({
  searchParameters: {
    q,
    type: "news",
    engine: "google"
  },
  news: [
    {
      title: `${q} Announces Revolutionary Net-Zero Carbon Initiative`,
      link: `https://www.business-wire.com/news/${q.toLowerCase()}-sustainability`,
      snippet: `Leading sportswear manufacturer ${q} unveiled a massive strategic overhaul targeting complete circular material recycling and zero manufacturing waste by the next decade.`,
      date: "2 hours ago",
      source: "BusinessWire",
      imageUrl: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=150&q=80"
    },
    {
      title: `Financial Analysis: ${q} Stocks Surge Following Strong Quarterly Earnings`,
      link: `https://www.marketwatch-news.com/stocks/${q.toLowerCase()}-earnings`,
      snippet: `Wall street analysts exceed previous targets as ${q} reports record digital growth, direct-to-consumer sales, and significant penetration in international athletic markets.`,
      date: "1 day ago",
      source: "MarketWatch",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=150&q=80"
    },
    {
      title: `${q} Unveils Next-Gen Smart Wearables at Tech Summit`,
      link: `https://www.techradar.com/news/${q.toLowerCase()}-smart-gear`,
      snippet: `Integrating bio-sensor tech directly into running items, ${q} introduces an ecosystem that gives real-time running posture and speed analysis synced directly with mobile apps.`,
      date: "3 days ago",
      source: "TechRadar",
      imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=150&q=80"
    }
  ]
});
