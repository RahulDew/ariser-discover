# Ariser Discover 🌅

Discover the web, softly. A sleek, modern, and highly-animated search client designed to deliver organic search results and clean webpage reader views in under a second.

🚀 **Live Demo:** [https://ariser-discover.web.app](https://ariser-discover.web.app)

---

## 📸 Screenshots
*Below are visual previews of Ariser Discover in action. (Add your custom screenshot URLs here)*

### Home Page
![Ariser Discover Home](https://user-images.githubusercontent.com/86983295/191952820-2b018a85-206a-42aa-a8b9-457d97a729ff.png)

### Dark Mode / Theme customizer
![Ariser Discover Dark Mode](https://user-images.githubusercontent.com/86983295/191952896-8f1c4a21-44b8-4883-8436-933ddfc99349.png)

*(Feel free to update these image links with your new screenshots!)*

---

## ✨ Features

### 🔍 Comprehensive Search Tabs
Powered by **Serper.dev** Google Search API, Ariser Discover aggregates and filters real-time searches across:
* **All (Web)**: Fast organic results with direct snippets and site links.
* **Images**: Visual grid results with lazy loading.
* **Videos**: Direct play links and metadata.
* **News**: Chronological news coverage.
* **Shopping**: Product comparison boxes.
* **Scholar**: Scientific and academic papers.

### 🌐 Deep Reader Scraper
A built-in DOM scraper that queries Serper's `/webpage` endpoint. It extracts clean, structured body text, page titles, and clean descriptions from any URL directly in the app—bypassing heavy ads, trackers, and page clutter.

### 🎨 Dynamic Theme Engine
Configure the search engine to match your aesthetic:
* **Themes**: Switch between *Apricot Sunrise*, *Kyoto Moss*, *Midnight Void*, and *Slate Dusk*.
* **Light/Dark Toggle**: Fully synchronized CSS custom properties (`:root` tokens) managed globally.
* Persistent selection saved automatically to browser storage.

### ⚡ Blazing-Fast Stack
* **Vite + React + TypeScript**: Standard fast bundling.
* **TanStack Router**: Type-safe client-side routing with hover preloading (`intent`).
* **TanStack Query**: Automatic query caching, synchronization, and background refetching.
* **Zustand**: Fast, boilerplate-free global state store.
* **Framer Motion**: Smooth entry layouts, spring-based animations, and responsive fluid spotlights.

### 📱 Progressive Web App (PWA)
* Fully offline-capable service workers (Vite PWA plugin).
* Add to Home Screen support for iOS & Android devices.
* Customizable standalone web app manifest.

### 📈 Built-in SEO Optimization
* **Dynamic Titles**: Page titles dynamically update based on query parameters (e.g. `[Query] - Ariser Discover`).
* **Structured Data**: Injected JSON-LD Schema markup so search engines recognize the Sitelinks Searchbox.
* **Open Graph (OG) Cards**: Clean card descriptions and branded image links for previews on WhatsApp, Discord, Slack, and Twitter/X.
* **Sitemap & robots.txt**: Active sitemap listing static routes for search crawlers.

---

## 🛠️ Local Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/RahulDew/ariser-search.git
cd ariser-search
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add your Serper API Key:
```env
# Get a free key with 2,500 queries at https://serper.dev
VITE_SERPER_KEY=your_serper_api_key_here
```

### 3. Run the Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## ☁️ Deployment

Ariser Discover is configured for **Firebase Hosting**.

To deploy changes live:
```bash
# Initialize (already completed)
firebase init

# Build & Deploy
npm run build
firebase deploy
```
