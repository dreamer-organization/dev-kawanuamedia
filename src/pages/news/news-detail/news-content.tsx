import NewsSidebar from "./components/news-detail-sidebar";
import NewsPrevNext from "./components/news-prevnext";
import NewsArticle from "./news-article";

interface Props {
    article: any;
}

export default function NewsContent({
    article,
}: Props) {
    return (
        <section className="container-custom md:container mx-auto px-5 py-24">
            <div className="grid gap-20 xl:grid-cols-[minmax(0,1fr)_360px]">
                <div>
                    <NewsArticle
                        article={article}
                    />
                    
                    <NewsPrevNext
                        currentSlug={article.slug}
                    />
                </div>


                {/* <NewsShare article={article} /> */}


                {/* <NewsRelated
                    currentSlug={article.slug}
                /> */}

                <NewsSidebar />
            </div>
        </section>
    );
}