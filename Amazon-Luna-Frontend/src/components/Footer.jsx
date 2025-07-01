import React from 'react'
import '../CSS/footer.css'
import footerimage from '../assets/image/footerimage.webp'

function Footer() {
  return (
    <div className='footer'>
      <span>Questions or concerns? Leave feedback</span>
      <div className="footer-columns">
        <div className='footer-columns-item'>
          <h4>About Luna</h4>
          <a href="#">Discover</a>
          <a href="#">Download Luna</a>
          <a href="#">Luna Controller</a>
          <a href="#">Compatible Controllers</a>
          <a href="#">Compatible Devices</a>
        </div>

        <div className='footer-columns-item'>
          <h4>Support</h4>
          <a href="#">Getting Started</a>
          <a href="#">Device Troubleshooting</a>
          <a href="#">Network Issues</a>
          <a href="#">Help and Customer Service</a>
          <a href="#">Developers</a>
        </div>

        <div className='footer-columns-item'>
          <h4>Settings</h4>
          <a href="#">Parental Controls</a>
          <a href="#">Language Settings</a>
          <a href="#">Payment Settings</a>
          <a href="#">Manage Subscriptions</a>
        </div>

        <div className='footer-columns-item'>
          <h4>Follow Luna</h4>
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">X (formerly Twitter)</a>
          <a href="#">TikTok</a>
          <a href="#">Reddit</a>
        </div>
      </div>

      <div className="footer-links">
        <a href="#">Amazon Luna Terms of Use</a>
        <a href="#">Amazon Luna Legal Notices</a>
        <a href="#">Amazon Conditions of Use</a>
        <a href="#">Amazon Privacy Notice</a>
      </div>
      <span><img src={footerimage} alt="" /></span>
      <span>© 1996-2025, Amazon.com, Inc or its affiliates</span>
    </div>
  )
}

export default Footer