import 'tailwindcss/tailwind.css';
import { DefaultSeo } from 'next-seo';
import { Seo } from '../next-seo.config';

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <DefaultSeo {...Seo}/>
      <div className="bg-gray-50">
        <Component {...pageProps} />
      </div>
    </>

  )
}