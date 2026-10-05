import React, { useEffect, useState } from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Notavailable from "./Notavailable";

const News = (props) => {
    const { apiKey, category, setProgress, pageSize, } = props;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitaliseFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Fetch first page
    const updateNews = async () => {
        setProgress(0);
        setLoading(true);

        const apiurl = `${apiKey}/${category}?page=1`;

        try {
            setProgress(30);

            const data = await fetch(apiurl);

            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }

            const parsedData = await data.json();

            setProgress(70);

            if (!parsedData || !parsedData.articles) {
                throw new Error("Invalid data format received from API.");
            }

            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults || 0);
            setPage(1);

            setProgress(100);

            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } catch (error) {
            console.error("Error fetching news:", error);
            setArticles([]);
            setProgress(100);
        } finally {
            setLoading(false);
        }
    };

    // Fetch next page
    const fetchMoreData = async () => {
        const nextPage = page + 1;

        const apiurl = `${apiKey}/${category}?page=${nextPage}`;

        try {
            setLoadingMore(true);

            const data = await fetch(apiurl);

            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }

            const parsedData = await data.json();

            if (!parsedData || !parsedData.articles) {
                throw new Error("Invalid data format received from API.");
            }

            setArticles((prevArticles) => [
                ...prevArticles,
                ...parsedData.articles,
            ]);

            setTotalResults(parsedData.totalResults || 0);
            setPage(nextPage);
        } catch (error) {
            console.error("Error fetching more news:", error);
        } finally {
            setLoadingMore(false);
        }
    };

    // Change document title
    useEffect(() => {
        document.title = capitaliseFirstLetter(category);
    }, [category]);

    // Initial API call
    useEffect(() => {
        updateNews();
    }, [category]);

    return (
        <div className="newsreader mt-16 lg:mt-10">

            {/* Spinner */}
            {loading && <Spinner />}

            {/* Infinite Scroll */}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
            // loader={<Spinner />}
            >
                <div className="container mx-auto px-4 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {articles.length > 0 ? (
                            articles.map((element) => (
                                <div
                                    className="my-3"
                                    key={element.url}
                                >
                                    <Card
                                        images={element.urlToImage}
                                        title={
                                            element.title ||
                                            "TITLE NOT AVAILABLE"
                                        }
                                        description={
                                            element.description ||
                                            "DESCRIPTION NOT AVAILABLE"
                                        }
                                        newsurl={element.url}
                                        sourcename={
                                            element.source?.name ||
                                            "SOURCE NOT AVAILABLE"
                                        }
                                        author={
                                            element.author ||
                                            "AUTHOR NOT AVAILABLE"
                                        }
                                        publishedAt={
                                            element.publishedAt ||
                                            "TIME NOT AVAILABLE"
                                        }
                                        content={
                                            element.content ||
                                            "CONTENT NOT AVAILABLE"
                                        }
                                    />
                                </div>
                            ))
                        ) : (
                            !loading && (
                                <Notavailable
                                    category={capitaliseFirstLetter(category)}
                                />
                            )
                        )}

                    </div>
                    {loadingMore && <Spinner />}
                </div>
            </InfiniteScroll>
        </div>
    );
};

News.defaultProps = {
    country: "us",
    pageSize: 6,
    category: "general",
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
};

export default News;
