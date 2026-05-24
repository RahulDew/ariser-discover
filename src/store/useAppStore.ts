import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the Theme structure
export interface ThemePalette {
  bg: string;
  text: string;
  accent: string;
  accentHover: string;
  cardBg: string;
  inputBg: string;
  borderColor: string;
  mutedText: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description: string;
  light: ThemePalette;
  dark: ThemePalette;
}

// 8 Elegant Colorways from the Redesign PDF Specs
export const THEMES: Record<string, ThemeConfig> = {
  apricot: {
    id: "apricot",
    name: "Apricot",
    description: "Cream + terracotta",
    light: {
      bg: "#FDF6EC",
      text: "#2E2724",
      accent: "#D66240",
      accentHover: "#B85031",
      cardBg: "#F9F0DF",
      inputBg: "#FFFFFF",
      borderColor: "#F1E3D3",
      mutedText: "#7E7570",
    },
    dark: {
      bg: "#1C1613",
      text: "#F5ECE8",
      accent: "#E27E5C",
      accentHover: "#EA9679",
      cardBg: "#251E1A",
      inputBg: "#1C1613",
      borderColor: "#322722",
      mutedText: "#A39791",
    },
  },
  marina: {
    id: "marina",
    name: "Marina",
    description: "Misty white + deep aqua",
    light: {
      bg: "#EEF6F8",
      text: "#1A2F37",
      accent: "#1F6E8C",
      accentHover: "#15526A",
      cardBg: "#E3ECEF",
      inputBg: "#FFFFFF",
      borderColor: "#D5E3E7",
      mutedText: "#6B7E86",
    },
    dark: {
      bg: "#0B1317",
      text: "#ECF4F6",
      accent: "#3D9CB9",
      accentHover: "#55B4D1",
      cardBg: "#121E24",
      inputBg: "#0B1317",
      borderColor: "#1D2D36",
      mutedText: "#8E9FA5",
    },
  },
  bloom: {
    id: "bloom",
    name: "Bloom",
    description: "Blush + magenta",
    light: {
      bg: "#FCF0F4",
      text: "#3F1B24",
      accent: "#B83B5E",
      accentHover: "#992E4C",
      cardBg: "#F5DFE5",
      inputBg: "#FFFFFF",
      borderColor: "#EDCDD5",
      mutedText: "#8A6971",
    },
    dark: {
      bg: "#1A0A0E",
      text: "#FAEFF2",
      accent: "#D95B7E",
      accentHover: "#E57B9A",
      cardBg: "#241116",
      inputBg: "#1A0A0E",
      borderColor: "#331D24",
      mutedText: "#AB9097",
    },
  },
  honey: {
    id: "honey",
    name: "Honey",
    description: "Warm cream + amber",
    light: {
      bg: "#FDF8E7",
      text: "#332505",
      accent: "#B0760C",
      accentHover: "#936005",
      cardBg: "#F7EDB5",
      inputBg: "#FFFFFF",
      borderColor: "#ECDCA5",
      mutedText: "#7C6F52",
    },
    dark: {
      bg: "#141005",
      text: "#FAF6EB",
      accent: "#E09F20",
      accentHover: "#EDB33C",
      cardBg: "#1F1A0A",
      inputBg: "#141005",
      borderColor: "#2E2512",
      mutedText: "#A39C8A",
    },
  },
  violet: {
    id: "violet",
    name: "Violet",
    description: "Lavender + cool purple",
    light: {
      bg: "#F3F0FA",
      text: "#28233C",
      accent: "#6F55D3",
      accentHover: "#5B44B5",
      cardBg: "#E7E2F2",
      inputBg: "#FFFFFF",
      borderColor: "#DBD5EA",
      mutedText: "#746E89",
    },
    dark: {
      bg: "#0E0B16",
      text: "#F1EFF7",
      accent: "#9681EC",
      accentHover: "#AB99F1",
      cardBg: "#171324",
      inputBg: "#0E0B16",
      borderColor: "#231D36",
      mutedText: "#9691A8",
    },
  },
  plum: {
    id: "plum",
    name: "Plum",
    description: "Cream + deep warm purple",
    light: {
      bg: "#FAF0F5",
      text: "#37132D",
      accent: "#7B2869",
      accentHover: "#621C52",
      cardBg: "#F0DDE9",
      inputBg: "#FFFFFF",
      borderColor: "#E4C9DB",
      mutedText: "#82667A",
    },
    dark: {
      bg: "#12050E",
      text: "#F7EDF4",
      accent: "#A55592",
      accentHover: "#BA73A9",
      cardBg: "#1A0D16",
      inputBg: "#12050E",
      borderColor: "#281A25",
      mutedText: "#A594A1",
    },
  },
  sage: {
    id: "sage",
    name: "Sage",
    description: "Soft green + muted forest",
    light: {
      bg: "#F4F6F0",
      text: "#232B1E",
      accent: "#4B653A",
      accentHover: "#3B512E",
      cardBg: "#E6ECE0",
      inputBg: "#FFFFFF",
      borderColor: "#D8E2D1",
      mutedText: "#6A7465",
    },
    dark: {
      bg: "#0E120A",
      text: "#F2F4F0",
      accent: "#72935E",
      accentHover: "#88A775",
      cardBg: "#171C13",
      inputBg: "#0E120A",
      borderColor: "#242C1D",
      mutedText: "#929C8D",
    },
  },
  rosewood: {
    id: "rosewood",
    name: "Rosewood",
    description: "Pink-beige + dusty burgundy",
    light: {
      bg: "#FAF0EE",
      text: "#3D1B1B",
      accent: "#9C3D3D",
      accentHover: "#812F2F",
      cardBg: "#F0DDD8",
      inputBg: "#FFFFFF",
      borderColor: "#E4C7C0",
      mutedText: "#8F7272",
    },
    dark: {
      bg: "#140909",
      text: "#F7EDED",
      accent: "#C46262",
      accentHover: "#D17F7F",
      cardBg: "#1F1111",
      inputBg: "#140909",
      borderColor: "#2D1D1D",
      mutedText: "#A89494",
    },
  },
};

// CSS Injection Helper to enforce multi-theme variables dynamically
export const applyThemeColors = (themeId: string, mode: "light" | "dark") => {
  const selectedTheme = THEMES[themeId] || THEMES.apricot;
  const palette = mode === "dark" ? selectedTheme.dark : selectedTheme.light;
  
  const root = document.documentElement;
  
  root.style.setProperty("--color-bg", palette.bg);
  root.style.setProperty("--color-text", palette.text);
  root.style.setProperty("--color-accent", palette.accent);
  root.style.setProperty("--color-accent-hover", palette.accentHover);
  root.style.setProperty("--color-card-bg", palette.cardBg);
  root.style.setProperty("--color-input-bg", palette.inputBg);
  root.style.setProperty("--color-border", palette.borderColor);
  root.style.setProperty("--color-muted-text", palette.mutedText);

  // Sync dark class for standard tailwind options if needed
  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
};

export interface AppState {
  themeId: string;
  mode: "light" | "dark";
  searchHistory: string[];
  mockMode: boolean;
  setTheme: (themeId: string) => void;
  toggleMode: () => void;
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  removeFromHistory: (query: string) => void;
  setMockMode: (val: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      themeId: "apricot", // Default theme from the PDF (Apricot Cream + Terracotta)
      mode: "light",
      searchHistory: [],
      mockMode: false,

      setTheme: (themeId) => {
        const mode = get().mode;
        set({ themeId });
        applyThemeColors(themeId, mode);
      },

      toggleMode: () => {
        const currentMode = get().mode;
        const nextMode = currentMode === "light" ? "dark" : "light";
        const themeId = get().themeId;
        
        set({ mode: nextMode });
        applyThemeColors(themeId, nextMode);
      },

      addToHistory: (query) => {
        if (!query || query.trim() === "") return;
        
        const cleanQuery = query.trim();
        const currentHistory = get().searchHistory;
        
        const filteredHistory = currentHistory.filter((item) => item !== cleanQuery);
        const newHistory = [cleanQuery, ...filteredHistory].slice(0, 20);
        
        set({ searchHistory: newHistory });
      },

      clearHistory: () => set({ searchHistory: [] }),

      removeFromHistory: (query) => {
        const currentHistory = get().searchHistory;
        set({ searchHistory: currentHistory.filter((item) => item !== query) });
      },

      setMockMode: (val) => set({ mockMode: val }),
    }),
    {
      name: "ariser-discover-store", // Storage key for Ariser Discover brand
      onRehydrateStorage: () => (state) => {
        // Automatically inject theme custom colors as soon as local storage hydrates!
        if (state) {
          const hasApiKey = !!import.meta.env.VITE_SERPER_KEY;
          state.mockMode = !hasApiKey;
          applyThemeColors(state.themeId, state.mode);
        }
      },
    }
  )
);
