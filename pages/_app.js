import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import Layout from '../components/layout/Layout'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Component {...pageProps} />
    </div>

  )
}