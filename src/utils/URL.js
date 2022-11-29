class URLUtil {
  static getQueryParams(paramNames) {
    const url = window.location.href;

    const Url = new URLSearchParams(url.substring(url.indexOf('?')));

    let obj = {};

    paramNames.forEach(name => {
      obj[name] = Url.get(name);
    });

    return obj;
  }

  static getQueryParam(paramName) {
    const url = window.location.href;

    const Url = new URLSearchParams(url.substring(url.indexOf('?')));

    return Url.get(paramName);
  }
}

export default URLUtil;
