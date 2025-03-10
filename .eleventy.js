
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "src/assets/icons/": "./assets/icons" });
    eleventyConfig.addPassthroughCopy({ "src/css/": "./" });
    eleventyConfig.addWatchTarget('./src/js/');
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    
    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',

        dir: {
            input: 'src',
            output: '_site',
        },
    };
};