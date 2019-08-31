/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = path => reg.test(path);

const Storage = {
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    return JSON.parse(window.localStorage.getItem(key));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

export { isUrl, Storage };
