import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
});

/** @type {import("next").NextConfig} */
export default withPWA({
    reactStrictMode: true,
});