const fetchWithTimeout = (url, options = {}, timeout = 10000) =>
    new Promise((resolve, reject) => {
        const controller = new AbortController()
        const id = setTimeout(() => controller.abort(), timeout)

        fetch(url, { ...options, signal: controller.signal })
            .then(resolve)
            .catch(reject)
            .finally(() => clearTimeout(id))
    })

export default fetchWithTimeout
