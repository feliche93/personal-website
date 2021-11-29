import WebsiteNavbar from './WebsiteNavbar'

export default function WebsiteLayout(props) {
  return (
    <>
      <WebsiteNavbar></WebsiteNavbar>
      {props.children}
    </>
  )
}
