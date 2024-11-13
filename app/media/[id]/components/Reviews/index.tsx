import Image from "next/image";
import React from "react";
import styles from "./component.module.css";
import { MediaDataFullInfo } from "@/app/ts/interfaces/anilistMediaData";
import parse from "html-react-parser";
import QuoteSvg from "@/public/assets/quote.svg";
function Reviews({
  reviews,
}: {
  reviews: MediaDataFullInfo["reviews"]["nodes"];
}) {
  return (
    <section id={styles.reviews_container}>
      <h2 className={styles.heading_style}>REVIEWS</h2>
      <ul>
        {reviews.slice(0, 3).map((review) => (
          <li key={review.user.id} className={styles.review_container}>
            <div className={styles.review_heading}>
              <div>
                <Image
                  src={review.user.avatar.medium}
                  alt={review.user.name}
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h3>{review.user.name}</h3>
              </div>
            </div>
            <div className={styles.review_body}>
              <small>{review.summary}</small>
              <div className={styles.review_text_container}>
                <span className={styles.quote_svg_container}>
                  <QuoteSvg />
                </span>
                <p>{parse(review.body) || "No review"}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Reviews;