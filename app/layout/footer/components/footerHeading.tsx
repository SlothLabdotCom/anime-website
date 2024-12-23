import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../footerComponent.module.css";

function FooterHeading() {
  return (
    <div id={styles.social_links_container} className="display_flex_row">
      <Link id={styles.img_container} href="/">
        <Image
          src="/logo.png"
          alt="AnimeAbyss.to"
          width={115}
          height={0}
        ></Image>
      </Link>
    </div>
  );
}

export default FooterHeading;
