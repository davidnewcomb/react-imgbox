import 'bootstrap/dist/css/bootstrap.css'
import './page.css'

export const metadata = {
  title: "React-ImgBox",
  description: "Draws a box over an image",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
