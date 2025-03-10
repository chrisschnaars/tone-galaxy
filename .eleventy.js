import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "src/assets/icons/": "./assets/icons" });
    eleventyConfig.addPassthroughCopy({ "src/css/": "./" });
    eleventyConfig.addWatchTarget('./src/js/');
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin)
};

export const config = {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    pathPrefix: "tone-galaxy",

    dir: {
        input: 'src',
        output: '_site',
    },
}