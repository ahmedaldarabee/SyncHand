import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};
const APP_NAME = "SyncHand";
const APP_DEFAULT_TITLE = "SyncHand";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "SyncHand is an AI-powered project designed to enhance productivity and efficiency for individuals and teams.";

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
};