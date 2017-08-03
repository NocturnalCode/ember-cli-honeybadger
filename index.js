/* eslint-env node */
'use strict';
const fs = require('fs');

const Funnel = require('broccoli-funnel');
const map = require('broccoli-stew').map;
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-honeybadger',
  included: function(app) {
    this._super.included.apply(this, arguments);
    app.import('vendor/honeybadger.js');
  },
  treeForVendor: function(defaultTree) {
    const app = this._findHost();
    const assetPath =__dirname + '/' + app.bowerDirectory + '/honeybadger.js/';

    if (fs.existsSync(assetPath)) {
      let jquerymin = new Funnel(assetPath, {
        files: ['honeybadger.js']});
      jquerymin = map(jquerymin,
        (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);
      return new mergeTrees([defaultTree, jquerymin]);
    } else {
      return defaultTree;
    }
  }
};
