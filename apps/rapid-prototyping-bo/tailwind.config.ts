const config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f6f7f9",
        ink: "#202329",
        muted: "#667085",
        line: "#d9dee7",
        accent: "#0f766e",
        warning: "#b45309",
        danger: "#be123c"
      }
    }
  }
};

export default config;
