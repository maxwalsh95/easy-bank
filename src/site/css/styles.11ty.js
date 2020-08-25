const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const postcssNormalize = require('postcss-normalize');
const postcssCustomMedia = require('postcss-custom-media');

// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const fileName = 'styles.css';

module.exports = class {
  async data() {
    const rawFilepath = path.join(
      __dirname,
      `../_includes/postcss/${fileName}`
    );
    return {
      permalink: `css/${fileName}`,
      rawFilepath,
      rawCss: await fs.readFileSync(rawFilepath),
    };
  }

  async render({ rawCss, rawFilepath }) {
    return await postcss([
      // require('postcss-comment'),
      require('precss'),
      require('postcss-import'),
      require('postcss-mixins'),
      require('postcss-color-mix'),
      require('postcss-nested'),
      require('postcss-current-selector'),
      require('cssnano'),
      require('postcss-custom-media'),
      postcssNormalize(),
    ])
      .process(rawCss, { from: rawFilepath })
      .then((result) => result.css);
  }
};
