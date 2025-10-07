import { theme } from "@chakra-ui/react";

const defaults = {
  colors: {
    baseColor: "#0080FF",
    primary: {
      default: "#0080FF",
      light: "#3399FF", // Lighter blue
      dark: "#0066CC", // Darker blue
      xlight: "#E6F3FF", // Very light background tint
    },
    primaryScheme: {
      50: "#E6F3FF",
      100: "#B3DAFF",
      200: "#80C1FF",
      300: "#4DA9FF",
      400: "#1A91FF",
      500: "#0080FF", // base
      600: "#0066CC",
      700: "#004C99",
      800: "#003366",
      900: "#001933",
    },
    secondaryScheme: {
      50: "#FFF7E6",
      100: "#FFE8BF",
      200: "#FFD699",
      300: "#FFC266",
      400: "#FFAD33",
      500: "#FFA500", // base hsl(35 100% 50%)
      600: "#CC8400",
      700: "#996300",
      800: "#664200",
      900: "#332100",
    },
    text: {
      dark: "black",
      default: "#2D3748",
      subheader: "rgba(24, 25, 31, 1)",
      light: "#718096",
      mlight: "#FFD992",
      disabled: "#CBD5E0",
      secondary: "white",
      placeholder: "rgba(0, 0, 0, 0.36)",
      url: "#3182CE",
      info: "#3182CE",
    },
    border: {
      default: "#718096",
      light: "#CBD5E0",
      xlight: "#E2E8F0",
      success: {
        100: "#C6F6D5",
        200: "#9AE6B4",
        300: "#38A169",
        400: "#1C4532",
      },
      error: "#E53E3E",
    },
    background: {
      dark: "#414141",
      secondaryDark: "#515151",
      thertiary: "#EDF2F7",
      primary: "white",
      secondary: "#F7FAFC",
      selection: "#FFFDF5",
      quaternary: "#45AB0F",
    },
    pill: {
      purple: theme.colors.purple[200],
      blue: theme.colors.blue[200],
    },
    accent: {
      dark: "#008E00",
      light: "#01C41C",
    },
    portalLink: "#004DE2",
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Sora Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
    quote: `'Literata Variable', serif`,
  },
  fontSizes: {
    xs: "0.875rem",
    "2.5xl": "1.625rem",
    12: "12px",
    21: "21px",
  },
  sizes: {
    container: {
      "5xl": "3440px",
      "4xl": "2560px",
      "3xl": "1920px",
      "2xl": "1580px",
      xl: "1196px",
    },
    card: {
      defaultMd: "330px",
      defaultSm: "272px",
      default: "296px",
      priceCardLg: "26rem",
      priceCard: "30rem",
    },
  },
  shadows: {
    lg: "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
    base: "0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)",
    md: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  breakpoints: {
    ...theme.breakpoints,
    priceCardLg: "1024px",
    "3xl": "1920px",
    "4xl": "2560px",
    "5xl": "3440px",
  },
  styles: {
    light: {
      global: {
        "html, body": {
          background: "#fff",
          fontFamily: `'Inter Variable', sans-serif`,
          color: "text.default",
          fontSize: "14px",
        },
      },
    },
    dark: {
      global: {
        "html, body": {
          background: "#000",
        },
      },
    },
  },
  lineHeights: {
    normal: "100%",
    tall: "125%",
    taller: "150%",
  },
  letterSpacings: {
    normal: "0%",
    wider: "5%",
    wide: "2.5%",
    narrow: "-2%",
    narrower: "-5%",
  },
  zIndices: {
    navbar: 50,
  },
};

export default defaults;
