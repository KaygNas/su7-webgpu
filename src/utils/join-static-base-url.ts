export function joinStaticBaseUrl(path: string) {
  const baseUrl = new URL('../', import.meta.url)
  const relativePath = `.${new URL(path, baseUrl).pathname}`
  const joinedUrl = new URL(relativePath, baseUrl)
  return joinedUrl.pathname
}
