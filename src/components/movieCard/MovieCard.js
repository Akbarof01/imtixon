import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { IMG_URL } from "../../apis/movieDpApi";
import BookmarkBtn from "../bookmarkBtn/BookmarkBtn";
import styles from "./MovieCard.module.scss";
import movieIcon from "../../assets/icon-category-movie.svg";
import seriesIcon from "../../assets/icon-category-tv.svg";
import playIcon from "../../assets/icon-play.svg";

import DetailsModal from "../detailsModal/DetailsModal";

const TrendingCard = (props) => {
  const [showModal, setShowModal] = useState(false);

  const [bookmarked, setBookmarked] = useState(false);

  if (!props.data.backdrop_path) return;

  return (
    <div
      className={`${styles.card} ${
        props.class === "big" ? styles.big : styles.small
      }`}
    >
      <div className={styles.img_box}>
        <img
          className={styles.card__img}
          src={`${IMG_URL}${props.data.backdrop_path}`}
          alt=""
        />

        <div
          onClick={() => setShowModal(true)}
          className={styles.hover_container}
        >
          <button className={styles.hover_btn}>
            <img className={styles.play_icon} src={playIcon} alt="play" />
            Play
          </button>
        </div>
      </div>

      <div className={styles.bookmark}>
        <BookmarkBtn
          bookmarked={bookmarked}
          setBookmarked={setBookmarked}
          data={props.data}
        />
      </div>

      <div className={styles.details}>
        <div className={styles.info}>
          <div className={styles.release_date}>
            {props.data.release_date
              ? props.data.release_date
                ? props.data.release_date.slice(0, 4)
                : props.data.release_date
              : props.data.first_air_date
              ? props.data.first_air_date.slice(0, 4)
              : props.data.first_air_date}
          </div>

          <div className={styles.category}>
            <img
              className={styles.category__icon}
              src={`${props.data.release_date ? movieIcon : seriesIcon}`}
              alt=""
            />
            <p className={styles.category__name}>
              {props.data.release_date ? "movie" : "tv"}
            </p>
          </div>

          <div className={styles.age_limit}>{`${
            props.data.adult ? "18+" : "PG"
          }`}</div>
        </div>

        <div className={styles.title}>
          {props.data.release_date
            ? props.data.original_title
            : props.data.name}
        </div>
      </div>
      <AnimatePresence exitBeforeEnter>
        {showModal ? (
          <DetailsModal setShowModal={setShowModal} data={props.data} />
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default TrendingCard;
