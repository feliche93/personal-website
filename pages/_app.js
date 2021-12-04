import 'tailwindcss/tailwind.css';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()
  console.log(router)

  return getLayout(
    <>
      <DefaultSeo
        titleTemplate = 'Cryptoneur | %s'
        defaultTitle = 'Cryptoneur'
        description="Welcome to my personal website! Check out my portofolio projects, browse through my blog posts or get in touch with me for freelance work."
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: `https://www.cryptoneur.xyz${router.pathname}`,
          site_name: 'Cryptoneur',
        }}
        twitter={{
          handle: '@FelixVemmer',
          site: '@FelixVemmer',
          cardType: 'summary_large_image',
        }}
      />
      <div className="bg-gray-50">
        <Component {...pageProps} />
      </div>
    </>

  )
}