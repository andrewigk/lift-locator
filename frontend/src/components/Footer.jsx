import { FaInstagram } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-title">
        <h4>Andrew Kim © 2024</h4>
      </div>
      <div className="footer-details">
        <h4>Contact</h4>
        <a
          href="https://www.instagram.com/glutes83kg"
          target="_blank"
          rel="noopener noreferrer"
          className="instagram"
        >
          <FaInstagram size={20} />
        </a>
      </div>
    </div>
  )
}
export default Footer
