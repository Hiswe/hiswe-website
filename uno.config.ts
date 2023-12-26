// uno.config.ts
import { defineConfig, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts: [],
  theme: {
    colors: {
      primary: {
        lightest: `hsl(200, 46%, 95%)`,
        lighter: `hsl(200, 47%, 82%)`,
        DEFAULT: `hsl(200, 46%, 66%)`,
        darker: `hsl(200, 47%, 41%)`,
        darkest: `hsl(240, 11%, 30%)`,
        black: `hsl(240, 11%, 15%)`,
        contrast: `white`,
      },
      accent: {
        DEFAULT: `hsl(332, 100%, 50%)`,
        lighter: `hsl(332, 100%, 90%)`,
        lightest: `hsl(332, 100%, 95%)`,
      },
      text: {
        DEFAULT: `hsl(240, 11%, 30%)`,
        lighter: `hsl(0, 0%, 40%)`,
      },
      // same as promary lightes
      background: {
        DEFAULT: `hsl(200, 46%, 95%)`,
      },
    },
    breakpoints: {
      md: `500px`,
      lg: `1024px`,
    },
  },
  presets: [
    presetUno(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  // ...UnoCSS options
})
