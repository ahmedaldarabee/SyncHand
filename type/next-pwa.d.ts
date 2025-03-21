import "next";
import type { PWAConfig } from "next-pwa";

declare module "next" {
  interface NextConfig {
    pwa?: PWAConfig;
  }
}
