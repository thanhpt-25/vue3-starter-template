/**
 * Some axios external config
 */
export default {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}
