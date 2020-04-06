const bcd = require('mdn-browser-compat-data');

// 检测是否有子属性
function childrenProperties (property) {
  return Object.keys(property).length > 1;
}

// 兼容数据-没有真实值的属性
function noneValueCompatData ({ property, prev }) {
  const browsers = property.support;

  for (let browserskey in browsers) {
    const browser = browsers[browserskey];

    if (Array.isArray(browser)) {
      // 此时表示有前缀和无前缀的兼容性不一样
      for (let i = 0; i < browser; i++) {
        const added = browser[i]['version_added'];
        const removed = browser[i]['version_removed'];

        if (added === null || added === true || removed === null || removed === true) {
          console.log(prev + ' -> ' + browserskey, browser[i]);
        } 
      }

    } else {
      const added = browser['version_added'];
      const removed = browser['version_removed'];

      if (added === null || added === true || removed === null || removed === true) {
        console.log(prev + ' -> ' + browserskey, browser);
      }

    }
  }
}

// 兼容数据-浏览器
function browserCompatData ({ property, prev, browserName, version }) {
  const browsers = property.support;

  for (let browserskey in browsers) {
    if (browserskey !== browserName) {
      continue;
    }

    const browser = browsers[browserskey];

    if (Array.isArray(browser)) {
      // 此时表示有前缀和无前缀的兼容性不一样
      for (let i = 0; i < browser; i++) {
        const added = browser[i]['version_added'];
        const removed = browser[i]['version_removed'];

        // if (added !== true && added !== null && added !== false && Number(added) <= Number(version)) {
        if (added !== null && added !== false && (added === true || Number(added) <= Number(version))) {
          console.log(prev + ' -> ' + browserskey, browser[i], property.mdn_url);
        } 
      }

    } else {
      const added = browser['version_added'];
      const removed = browser['version_removed'];

      // if (added !== true && added !== null && added !== false && Number(added) <= Number(version)) {
      if (added !== null && added !== false && (added === true || Number(added) <= Number(version))) {
        console.log(prev + ' -> ' + browserskey, browser, property.mdn_url);
      }

    }
  }
}

// 递归
function loop (properties, prev) {
  for (let propertieskey in properties) {
    // debugger;
    const property = properties[propertieskey];

    if (propertieskey === '__compat') {
      browserCompatData({ property, prev, browserName: 'ie', version: '9' });

    // } else if (childrenProperties(property)) {
    } else {
      // debugger;
      loop(property, prev === undefined ? propertieskey : (prev + ' -> ' + propertieskey));

    }
  }
}

// 执行递归
// loop(bcd.css);
loop(bcd.javascript);
// loop(bcd.html);

/*
api
-- browsers
css
html
http
javascript
mathml
svg
webdriver
webextensions
xpath
xslt
*/

debugger;