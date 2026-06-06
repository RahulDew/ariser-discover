# Ariser Discover 🌅

Discover the web, softly. A sleek, modern, and highly-animated search client designed to deliver organic search results and clean webpage reader views in under a second.

🚀 **Live Demo:** [https://ariser-discover.web.app](https://ariser-discover.web.app)

---

## 📸 Screenshots
*Below are visual previews of Ariser Discover in action. (Add your custom screenshot URLs here)*

### Home Page
<img width="1492" height="920" alt="Screenshot 2026-06-06 at 11 16 34 PM" src="https://github.com/user-attachments/assets/97efc1bb-39bd-4ee0-b3e8-d015e8c27e74" />

<img width="1485" height="924" alt="Screenshot 2026-06-06 at 11 16 58 PM" src="https://github.com/user-attachments/assets/2ddc437a-a86a-4663-a5e4-5317949d370c" />

<img width="1490" height="924" alt="Screenshot 2026-06-06 at 11 18 55 PM" src="https://github.com/user-attachments/assets/039cce40-e9ac-4c16-b7e4-f6ab14e9e983" />

<img width="1486" height="922" alt="Screenshot 2026-06-06 at 11 19 22 PM" src="https://github.com/user-attachments/assets/ddb60c31-3fab-4c26-80f0-0a441fb9a014" />

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
