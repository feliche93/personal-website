import '../styles/global.css'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';
import proilePic from '../public/profilePic.png'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()
  const host = `https://${process.env.NEXT_PUBLIC_URL}` || 'http://localhost:3000'

  console.log(proilePic)
  console.log(process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000')

  return getLayout(
    <>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FZ9XDW8NMK"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FZ9XDW8NMK', { page_path: window.location.pathname });
            `,
          }}
        />
      </Head>
      <DefaultSeo
        titleTemplate='Cryptoneur | %s'
        defaultTitle='Cryptoneur'
        description='Welcome to my personal website! Check out my portofolio projects, browse through my blog posts or get in touch with me for freelance work.'
        openGraph={{
          title: 'Cryptoneur',
          type: 'website',
          locale: 'en_US',
          url: `https://www.cryptoneur.xyz${router.pathname}`,
          site_name: 'Cryptoneur',
          images: [
            {
              url: `${host}${proilePic.src}`,
              width: proilePic.width,
              height: proilePic.height,
              alt: 'Cryptoneur Pfofile',
            }]
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