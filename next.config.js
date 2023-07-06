/** @type {import('next').NextConfig} */
const nextConfig = {
  optimizeFonts: false
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
module.exports = withMDX(nextConfig);
