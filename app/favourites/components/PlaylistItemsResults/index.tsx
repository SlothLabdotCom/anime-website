"use client";
import React, { useEffect, useState } from "react";
import styles from "./component.module.css";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSearchParams } from "next/navigation";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initFirebase } from "@/app/firebaseApp";
import * as MediaCard from "@/app/components/MediaCards/MediaCard";
import SvgLoading from "@/public/assets/Eclipse-1s-200px.svg";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { BookmarkItem } from "@/app/ts/interfaces/firestoreData";
import { MediaData } from "@/app/ts/interfaces/anilistMediaData";
import { toggleShowLoginModalValue } from "@/app/lib/redux/features/loginModal";

function PlaylistItemsResults({
  params,
}: {
  params?: { format: string; sort: "title_desc" | "title_asc" };
}) {
  const anilistUser = useAppSelector((state) => state.UserInfo.value);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);
  
  const [userBookmarksList, setUserBookmarksList] = useState<BookmarkItem[]>([]);
  const [userFilteredBookmarks, setUserFilteredBookmarks] = useState<BookmarkItem[]>([]);
  
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.size === 0) {
      setUserFilteredBookmarks([]);
    }
  }, [searchParams.size]);

  useEffect(() => {
    if (!loading) {
      if (user || anilistUser) {
        getUserBookmarksList();
      } else {
        dispatch(toggleShowLoginModalValue());
      }
      setIsLoading(false);
    }
  }, [user, anilistUser, loading]);

  useEffect(() => {
    if (params?.format && userBookmarksList.length > 0) {
      const filteredBookmarks = userBookmarksList.filter(
        (media) => media.format === params.format.toUpperCase()
      );
      setUserFilteredBookmarks(filteredBookmarks);
    }
  }, [params?.format, userBookmarksList]);

  useEffect(() => {
    if (!params?.sort) return;

    setUserFilteredBookmarks((prevBookmarks) => {
      const bookmarksToSort = [...prevBookmarks];
      
      if (params.sort === "title_desc") {
        return bookmarksToSort.sort((a, b) =>
          b.title.userPreferred.localeCompare(a.title.userPreferred)
        );
      } else if (params.sort === "title_asc") {
        return bookmarksToSort.sort((a, b) =>
          a.title.userPreferred.localeCompare(b.title.userPreferred)
        );
      }
      return prevBookmarks;
    });
  }, [params?.sort]);

  async function getUserBookmarksList() {
    try {
      setIsLoading(true);
      const db = getFirestore(initFirebase());
      const docRef = doc(db, "users", user?.uid || `${anilistUser?.id}`);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.log("No bookmarks found for user");
        setUserBookmarksList([]);
        setUserFilteredBookmarks([]);
        return;
      }

      const bookmarksList: BookmarkItem[] = docSnap.get("bookmarks") || [];
      setUserBookmarksList(bookmarksList);

      if (!params) {
        setUserFilteredBookmarks([]);
        return;
      }

      let filteredBookmarks = [...bookmarksList];

      if (params.format) {
        filteredBookmarks = filteredBookmarks.filter(
          (item) => item.format === params.format.toUpperCase()
        );
      }

      if (params.sort) {
        if (params.sort === "title_desc") {
          filteredBookmarks.sort((a, b) =>
            b.title.romaji.localeCompare(a.title.romaji)
          );
        } else if (params.sort === "title_asc") {
          filteredBookmarks.sort((a, b) =>
            a.title.romaji.localeCompare(b.title.romaji)
          );
        }
      }

      setUserFilteredBookmarks(filteredBookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      setUserBookmarksList([]);
      setUserFilteredBookmarks([]);
    } finally {
      setIsLoading(false);
    }
  }

  const showNoResults = !isLoading && (
    userFilteredBookmarks.length === 0 || userBookmarksList.length === 0
  );

  const bookmarksToShow = params ? userFilteredBookmarks : userBookmarksList;

  return (
    <React.Fragment>
      {(loading || isLoading) && (
        <div style={{ height: "400px", width: "100%", display: "flex" }}>
          <SvgLoading width={120} height={120} style={{ margin: "auto" }} />
        </div>
      )}

      {!loading && !isLoading && (
        <div id={styles.container}>
          <ul>
            {showNoResults && (
              <p className={styles.no_results_text}>No Results</p>
            )}

            {bookmarksToShow.map((media, key) => (
              <li key={key}>
                <MediaCard.Container onDarkMode>
                  <MediaCard.MediaImgLink
                    hideOptionsButton
                    mediaInfo={media as MediaData}
                    mediaId={media.id}
                    title={media.title.userPreferred}
                    formatOrType={media.format}
                    url={media.coverImage.extraLarge}
                  />
                  <MediaCard.LinkTitle
                    title={media.title.userPreferred}
                    id={media.id}
                  />
                </MediaCard.Container>
              </li>
            ))}
          </ul>
        </div>
      )}
    </React.Fragment>
  );
}

export default PlaylistItemsResults;