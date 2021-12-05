import WebsiteNavbar from './WebsiteNavbar'
import Footer from './Footer'

export default function WebsiteLayout(props) {
  return (
    <div className="bg-gray-50">
      <WebsiteNavbar></WebsiteNavbar>
      {props.children}
      <Footer></Footer>
    </div>
  )
}
