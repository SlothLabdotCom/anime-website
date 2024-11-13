import Link from "next/link";
import React, { Suspense } from "react";
import animesGenres from "@/app/data/animeGenres.json";
import styles from "../../footerComponent.module.css";
import AiringThisWeek from "./airingThisWeek";

function NavLinks() {
  return (
    <div id={styles.nav_links_container}>
      <div className={styles.list_container}>
        <h5>Categories</h5>

        <ul className={`${styles.grid_template} display_grid`}>
          {animesGenres.map((media) => (
            <li key={media.value}>
              <Link href={`/search?genre=[${media.value}]`}>{media.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <Suspense
        fallback={
          <div className={`${styles.list_container} ${styles.placeholder}`}>
            <span className={styles.heading_placeholder}></span>

            <ul
              className={`${styles.grid_template} ${styles.list_placeholder} display_grid`}
            >
              {Array.from({ length: 11 - (0 + 1) }, (_, i) => i).map((key) => (
                <li key={key} className={styles.list_item_placeholder}></li>
              ))}
            </ul>
          </div>
        }
      >
        <AiringThisWeek />
      </Suspense>

      <div className="display_flex_row">
        <span id={styles.span_border2}></span>

        <div id={styles.div_custom_margin}>
          <h5>Quick Links</h5>

          <ul>
            <li>
              <Link
                href="mailto://animeabyss@tuta.io"
                target="_blank"
              >
               Contact
              </Link>
            </li>
            <li>
              <Link href="/terms">
                Terms of Service
              </Link>
            </li>

            <li>
              <Link
                href="/dmca"
              >
               DMCA
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavLinks;
