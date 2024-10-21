/** @type {import('next').NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: `
  //             default-src 'self'; 
  //             script-src 'self' 'unsafe-inline'; 
  //             style-src 'self'; 
  //           `.replace(/\s{2,}/g, ' ').trim(),
  //         },
  //       ],
  //     },
  //   ]
  // },
}

export default nextConfig;
