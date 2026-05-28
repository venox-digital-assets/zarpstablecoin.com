// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.zarpstablecoin.com',
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Allow access via Tailscale MagicDNS hostnames (e.g. minecraft.tail9efa6b.ts.net).
      // Vite blocks unknown Host headers by default; raw Tailscale IPs are always allowed.
      allowedHosts: ['.ts.net']
    }
  }
});