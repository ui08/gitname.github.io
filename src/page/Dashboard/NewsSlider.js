import {
  faAngleLeft,
  faAngleRight,
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useMemo, useState } from "react";
import "./NewsSlider.css"; // Import CSS for styling

const NewsSlider = ({ addcss, type }) => {
  // console.log(type,"type");
  const [news, setNews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(""); // Added error state

  const apiKey = "crtpmvhr01qv68qhoo50crtpmvhr01qv68qhoo5g"; // Replace with your actual API key

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://finnhub.io/api/v1/news?category=business&token=${apiKey}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch news.");
      }
      const data = await response.json();
      setNews(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length); // Loop back to the first item
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length); // Loop back to the last item
  };

  const currentNews = useMemo(() => news[currentIndex], [news, currentIndex]);

  if (loading) {
    return <div className="p-3">Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="news-slider">
      <div
        className={type = "rm" ? "rm-news-content": "news-content"}
        style={{
          backgroundImage: `url(${currentNews.image})`,
        }}
      >
        <div className= {type = "rm" ? "rm-text-overlay": "text-overlay" }>
          <small className="news-headline">{currentNews.headline}</small>&nbsp;
          <a
            href={currentNews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more"
          >
            Read more
          </a>
        </div>
      </div>
      <div className="navigation">
        {currentIndex !== 0 && (
          <button
            className={`${addcss}btn ${addcss}Previousbtn btn`}
            onClick={goToPrevious}
          >
            <FontAwesomeIcon
              icon={faCircleChevronLeft}
              style={{
                color: "#38479B",
                fontSize: "2rem",
              }}
            />
          </button>
        )}
        <button
          className={`${addcss}btn ${addcss}Nextbtn btn`}
          onClick={goToNext}
        >
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            style={{ color: "#38479B", fontSize: "2rem" }}
          />
        </button>
      </div>
    </div>
  );
};

export default NewsSlider;
