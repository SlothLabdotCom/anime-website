import React from "react";
import styles from "./footerComponent.module.css";
import Link from "next/link";
import FooterHeading from "./components/footerHeading";
import NavLinks from "./components/navLinks";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id={styles.footer}>
      <section id={styles.info_container}>
        <FooterHeading />

        <span id={styles.span_border1}></span>

        <NavLinks />
      </section>

      <section id={styles.copyright_section}>
        <div className="center display_flex_row">
          <div>
            <small>
              AnimeAbyss does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
            </small>
            <small>
              &copy; {currentYear} <a href="https://animeabyss.to/" target="_blank" style={{ color: 'inherit', textDecoration: 'none', fontSize: 13, fontWeight: 'bold' }}>AnimeAbyss.to</a>. All Rights Reserved.
            </small>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
