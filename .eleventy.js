module.exports = function (eleventyConfig) {
  // Pass-through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/sitemap.xml");

  // CSS is served directly — passthrough so 11ty copies it untouched
  eleventyConfig.addPassthroughCopy("src/css");

  // A simple shortcode that lets templates render raw HTML from data
  eleventyConfig.addFilter("safe", (val) => val);

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
