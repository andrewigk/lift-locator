import { FaInstagram } from 'react-icons/fa6'
import IconButton from '@mui/material/IconButton'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-title">
        <h5>Andrew Kim © 2024</h5>
      </div>
      <div className="footer-details">
        <h5>Contact</h5>

        <IconButton
          href="https://www.instagram.com/glutes83kg"
          target="_blank"
          rel="noopener noreferrer"
          size="small"
        >
          <FaInstagram />
        </IconButton>
      </div>
    </div>
  )
}
export default Footer
