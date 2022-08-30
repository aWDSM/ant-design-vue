/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
const cheerio = require("cheerio");

module.exports = function (source) {
  const $ = cheerio.load(source, { xmlMode: true });
  $("[fill],[stroke]").each((_, it) => {
    if (it.tagName.toLowerCase() !== "mask" && !$(it).data("norc")) {
      if (!(it.tagName.toLowerCase() === "svg" && $(it).attr("fill") === "none")) {
        $(it).attr("fill") && $(it).attr("fill", "currentColor");
        $(it).attr("stroke") && $(it).attr("stroke", "currentColor");
      }
    }
  });
  return $.html();
};
