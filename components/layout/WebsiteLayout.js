import WebsiteNavbar from './WebsiteNavbar'
import Footer from './Footer'

export default function WebsiteLayout(props) {
  return (
    <>
      <WebsiteNavbar></WebsiteNavbar>
      {props.children}
      <Footer></Footer>
    </>
  )
}
