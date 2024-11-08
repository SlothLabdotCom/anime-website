import styles from "./page.module.css";
import Link from "next/link";
import React from "react";
import HeroCarousel from "./components/HomePage/HeroCarouselHomePage";
import anilist from "./api/anilist/anilistMedias";
import NavigationThroughMedias from "./components/HomePage/NavigationThroughMedias";
import parse from "html-react-parser";
import NewestMediaSection from "./components/HomePage/NewestMediaSection";
import MediaRankingSection from "./components/HomePage/MediaRankingSection";
import { AiringMediaResult, MediaData } from "./ts/interfaces/anilistMediaData";
import { Metadata } from "next";
import * as AddToPlaylistButton from "./components/Buttons/AddToFavourites";
import { checkDeviceIsMobile } from "./lib/checkMobileOrDesktop";
import { cookies, headers } from "next/headers";
import KeepWatchingSection from "./components/HomePage/KeepWatchingSection";
import PopularMediaSection from "./components/HomePage/PopularMediaSection";

export const revalidate = 21600; // revalidate cached data every 6 hours

export const metadata: Metadata = {
  title: "Home | AniProject",
  description:
    "A anime platform that showcases popular and trending animes, mangas and movies. Explore the latest releases, keep watching your favorites, and discover what's popular in the anime world.",
  keywords: [
    "Aniproject",
    "Ani project",
    "Ani project github",
    "Animes",
    "Anime Reviews",
    "Latest Anime Releases",
    "Anime Genres",
    "Popular Anime Series",
    "Anime News",
    "Anime Characters",
    "Manga Recommendations",
    "Anime Community",
    "Anime Events",
    "Subbed Anime",
    "Dubbed Anime",
    "Classic Anime",
    "Anime Trailers",
    "Anime Forums",
    "Anime Art",
    "Anime Culture",
  ],
};

export default async function Home() {
  const isOnMobileScreen = checkDeviceIsMobile(headers());
  const accessTokenCookie = cookies().get("access_token")?.value;
  const userAuthorization = accessTokenCookie
    ? JSON.parse(accessTokenCookie).accessToken
    : undefined;

  try {
    // section 3 - Trending Anime
    const listAnimesTrending = (await anilist.getMediaForThisFormat({
      type: "ANIME",
      accessToken: userAuthorization,
    })) || [];

    // section 1 - Trending Anime with Background
    const listAnimesTrendingWithBackground = listAnimesTrending.filter(
      (item) => item?.bannerImage
    );

    // section 2 - Releasing Anime by Popularity
    const listAnimesReleasingByPopularity = await anilist
      .getNewReleases({
        type: "ANIME",
        showAdultContent: false,
        status: "RELEASING",
        page: 1,
        perPage: 12,
        accessToken: userAuthorization,
      })
      .then((res) => res as MediaData[] || []);

    // section 3 - Banner Section Media
    const listMediasToBannerSection = await anilist
      .getMediaForThisFormat({
        type: "ANIME",
        sort: "SCORE_DESC",
        accessToken: userAuthorization,
      })
      .then((res) => {
        if (!res) return [];
        return (res as MediaData[]).filter((item) => item?.isAdult === false);
      });

    const randomIndexForBannerSection = Math.min(
      Math.floor(Math.random() * (listMediasToBannerSection.length || 1)),
      listMediasToBannerSection.length - 1
    );

    // section 4 - Released Today
    const listMediasReleasedToday = await anilist
      .getReleasingByDaysRange({
        type: "ANIME",
        days: 1,
        perPage: 11,
        accessToken: userAuthorization,
      })
      .then((res) => {
        if (!res) return [];
        return (res as AiringMediaResult[])
          .sort((a, b) => (b.media?.popularity || 0) - (a.media?.popularity || 0))
          .map((item) => item.media);
      });

    const selectedBannerMedia = listMediasToBannerSection[randomIndexForBannerSection];

    return (
      <main id={styles.container} className={styles.main}>
        {/* HERO */}
        <HeroCarousel
          animesList={listAnimesTrendingWithBackground}
          isOnMobileScreen={isOnMobileScreen || false}
        />

        {/* Keep Watching  */}
        <KeepWatchingSection />

        {/* POPULAR MEDIA SECTION*/}
        <PopularMediaSection animesList={listAnimesReleasingByPopularity} />

        {/* SECTION => SHOWS MEDIA RELEASED BY A SELECTED TIME */}
        <section className={styles.medias_sections_container}>
          <NavigationThroughMedias
            headingTitle={"Latest Releases"}
            route={"#"}
            sortBy="RELEASE"
            isFetchByDateButtonsOnScreen
            isResultsSortedByTrending
          />
        </section>

        {/* SECTION => Media Banner With Trailer Embedded  */}
        {selectedBannerMedia && (
          <section
            id={styles.media_banner_container}
            style={{
              background: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${selectedBannerMedia.bannerImage})`,
            }}
          >
            <div>
              <div id={styles.media_info}>
                <h3>
                  <Link href={`/media/${selectedBannerMedia.id}`}>
                    {selectedBannerMedia.title.romaji}
                  </Link>
                </h3>

                {selectedBannerMedia.description && (
                  <span>
                    {parse(
                      selectedBannerMedia.description.replace(
                        new RegExp(`<br[^>]*>|<\/br>`, "gi"),
                        " "
                      )
                    )}
                  </span>
                )}

                <div className={styles.item_buttons}>
                  <Link href={`/media/${selectedBannerMedia.id}`}>
                    WATCH NOW
                  </Link>

                  <AddToPlaylistButton.Button mediaInfo={selectedBannerMedia} />
                </div>
              </div>

              <div id={styles.player_button_container}>
                {selectedBannerMedia.trailer && (
                  <iframe
                    className="yt_embed_video"
                    src={`https://www.youtube.com/embed/${selectedBannerMedia.trailer.id}?controls=0&showinfo=0`}
                    frameBorder={0}
                    title={`${selectedBannerMedia.title.romaji} Trailer`}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope;"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </section>
        )}

        {/* SECTION => SHOWS MEDIAS SORTED BY FAVOURITES */}
        <section
          className={`${styles.medias_sections_container} ${styles.dark_background}`}
        >
          <NavigationThroughMedias
            headingTitle={"All Time Favorites"}
            route={"#"}
            sortBy={"FAVOURITES_DESC"}
            onDarkBackground
          />
        </section>

        {/* Additional sections remain unchanged */}
        <section className={`${styles.medias_sections_container}`}>
          <NavigationThroughMedias
            headingTitle={"Show Me Something New"}
            route={"#"}
            sortBy={"UPDATED_AT_DESC"}
            isLayoutInverted
          />
        </section>

        <section className={styles.background}>
          <section
            className={`${styles.medias_sections_container} ${styles.transparent_background}`}
          >
            <NavigationThroughMedias
              headingTitle={"Best Rated Mangas"}
              route={"#"}
              mediaFormat="MANGA"
              sortBy={"FAVOURITES_DESC"}
              onDarkBackground
            />
          </section>

          <div id={styles.media_ranks_container}>
            <MediaRankingSection initialAnimesList={listAnimesTrending} />
            <NewestMediaSection initialAnimesList={listMediasReleasedToday} />
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    // You might want to return a error page or fallback UI here
    return (
      <main id={styles.container} className={styles.main}>
        <div className="text-center p-4">
          <h2>Unable to load content</h2>
          <p>Please try again later</p>
        </div>
      </main>
    );
  }
}