import React from 'react'
import './styles.css'
import Github from '../../assets/github.svg'
import LinkedIn from '../../assets/linkedin.svg'
import Twitter from '../../assets/twitter.svg'
const Footer = () => {
  return (
    <div class="footer">
      <div class="footer-icons">
        <a
          href="https://github.com"
          target="_blank"
          aria-label="GitHub"
          class="footer-icon"
        >
          <img
            src={Github}
            alt="GitHub"
            class="icon"
          />
          {/* <p>GitHub</p> */}
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          aria-label="LinkedIn"
          class="footer-icon"
        >
          <img
            src={LinkedIn}
            alt="LinkedIn"
            class="icon"
          />
          {/* <p>LinkedIn</p> */}
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          aria-label="Twitter"
          class="footer-icon"
        >
          <img
            src={Twitter}
            alt="Twitter"
            class="icon"
          />
          {/* <p>Twitter</p> */}
        </a>
      </div>
      <div class="footer-text">Made with ❤️ by Deepanshu Sharma</div>
    </div>
  );
}

export default Footer