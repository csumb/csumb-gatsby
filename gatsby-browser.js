exports.onClientEntry = () => {
  return new Promise((resolve, reject) => {
    window.__polyfillio__ = () => {
      resolve()
    }

    const features = []

    if (!('fetch' in window)) {
      const s = document.createElement('script')
      s.src = `https://cdn.polyfill.io/v2/polyfill.min.js?features=${features.join(
        ','
      )}&rum=1&flags=gated,always&callback=__polyfillio__`
      s.async = true
      s.onerror = reject
      document.head.appendChild(s)
    }
  })
}
