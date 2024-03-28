/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['dh-frontend.cdn.prismic.io'],
        
    },
    reactStrictMode: true,
    swcMinify: true,
    //
    // Note: configuring pageExtensions also affects _document.js, _app.js,
    // middleware.js as well as files under pages/api/.
    // For example, setting pageExtensions: ['page.tsx', 'page.ts']
    // means the following files: _document.tsx, _app.tsx, middleware.ts, pages/users.tsx and pages/api/users.ts
    // will have to be renamed to _document.page.tsx, _app.page.tsx, middleware.route.ts, pages/users.page.tsx
    // and pages/api/users.page.ts respectively.
    pageExtensions: ['page.tsx', 'page.ts', 'route.tsx', 'route.ts'],
    env:{
        MARVEL_API_URL: process.env.MARVEL_API_URL,
        MARVEL_API_PUBLIC_KEY: process.env.MARVEL_API_PUBLIC_KEY,
        MARVEL_API_PRIVATE_KEY: process.env.MARVEL_API_PRIVATE_KEY,
    }
}
module.exports = nextConfig
