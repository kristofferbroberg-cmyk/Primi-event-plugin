// packages/components/src/utils/strings.ts
import removeAccents from "remove-accents";
import { paramCase } from "change-case";
var ALL_UNICODE_DASH_CHARACTERS = new RegExp(/[\u007e\u00ad\u2053\u207b\u208b\u2212\p{Pd}]/gu);
var normalizeTextString = (value) => {
  return removeAccents(value).normalize("NFKC").toLocaleLowerCase().replace(ALL_UNICODE_DASH_CHARACTERS, "-");
};
function kebabCase(str) {
  let input = str?.toString?.() ?? "";
  input = input.replace(/['\u2019]/, "");
  return paramCase(input, {
    splitRegexp: [
      /(?!(?:1ST|2ND|3RD|[4-9]TH)(?![a-z]))([a-z0-9])([A-Z])/g,
      // fooBar => foo-bar, 3Bar => 3-bar
      /(?!(?:1st|2nd|3rd|[4-9]th)(?![a-z]))([0-9])([a-z])/g,
      // 3bar => 3-bar
      /([A-Za-z])([0-9])/g,
      // Foo3 => foo-3, foo3 => foo-3
      /([A-Z])([A-Z][a-z])/g
      // FOOBar => foo-bar
    ]
  });
}
function escapeRegExp(string) {
  return string.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}
export {
  escapeRegExp,
  kebabCase,
  normalizeTextString
};
//# sourceMappingURL=strings.mjs.map
