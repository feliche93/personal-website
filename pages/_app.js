import 'tailwindcss/tailwind.css'
import Link from 'next/link'
import Layout from '../components/layout/Lyout'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}