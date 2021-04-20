export default function useAnalytics() {
  if (typeof window !== 'undefined') {
    return window.analytics
  }
}
