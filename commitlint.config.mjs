/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Disable line-length constraints on body and footer.
    // Long URLs in squash-merge descriptions and co-author/signed-off-by
    // trailers would otherwise trigger false positives.
    'body-max-line-length': [0, 'always', Infinity],
    'footer-max-line-length': [0, 'always', Infinity],
  },
};
