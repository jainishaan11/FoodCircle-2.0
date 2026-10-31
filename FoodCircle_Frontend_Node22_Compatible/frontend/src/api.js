// Central API configuration for the deployed n8n workflows.
// Override VITE_API_BASE_URL when deploying to a different n8n instance.
const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

export const API_BASE_URL = (
  configuredBaseUrl ||
  'https://n8n-csqpur4fxb8c31rqg3fz8jlt.78.47.76.115.nip.swatantra.cloud/webhook'
).replace(/\/+$/, '')

export function apiUrl(path = '') {
  return `${API_BASE_URL}/${String(path).replace(/^\/+/, '')}`
}
