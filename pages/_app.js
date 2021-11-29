import 'tailwindcss/tailwind.css';

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <div className="bg-gray-50">
      <Component {...pageProps} />
    </div>

  )
}