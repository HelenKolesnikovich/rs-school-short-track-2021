/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const subdomains = [];
  for (let i = 0; i < domains.length; i++) {
    subdomains[i] = domains[i].split('.');
  }
  for (let i = 0; i < subdomains.length; i++) {
    subdomains[i].reverse();
    for (let j = 0; j < subdomains[i].length; j++) {
      if (j === 0) {
        subdomains[i][j] = '.'.concat(`${subdomains[i][j]}`);
      } else {
        subdomains[i][j] = subdomains[i][j - 1].concat('.', `${subdomains[i][j]}`);
      }
    }
  }
  const DNSCollection = new Map();
  for (let i = 0; i < subdomains.length; i++) {
    for (let j = 0; j < subdomains[i].length; j++) {
      const key = subdomains[i][j];
      if (DNSCollection.has(key)) {
        const value = DNSCollection.get(key);
        DNSCollection.set(key, value + 1);
      } else {
        DNSCollection.set(key, 1);
      }
    }
  }

  return Object.fromEntries(DNSCollection);
}

module.exports = getDNSStats;
