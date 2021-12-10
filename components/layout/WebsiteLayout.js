import WebsiteNavbar from './WebsiteNavbar'
import Footer from './Footer'

export default function WebsiteLayout(props) {
  return (
    <div className="bg-gray-50">
      <WebsiteNavbar></WebsiteNavbar>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {props.children}
      </div>
      <Footer></Footer>
    </div>
  )
}
