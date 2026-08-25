import { motion } from "framer-motion";

interface Props {
    article: {
        title: string;
        description: string;
        content: string;
        image: string;
        tags: string[];
    };
}

export default function NewsArticle({
    article,
}: Props) {
    return (
        <motion.article
            initial={{
                opacity: 0,
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{
                once: true,
                amount: .15,
            }}
            transition={{
                duration: .6,
            }}
            className="w-full"
        >
            {/* Cover */}

            <img
                src={article.image}
                alt={article.title}
                className="
                    h-130
                    w-full
                    rounded-md
                    object-cover
                "
            />

            {/* Intro */}

            <p
                className="
                    mt-10
                    text-[19px]
                    leading-9
                    text-[#A9B3BC]
                "
            >
                {article.description}
            </p>

            {/* Content */}

            <div
                className="article-content ck-content"
                dangerouslySetInnerHTML={{
                    __html: article.content,
                }}
            />

            {/* Tags */}

            <div className="mt-14 flex flex-wrap gap-3">

                {article.tags.map((tag) => (
                    <button
                        key={tag}
                        className="
                            rounded-full
                            border
                            border-[#2E3945]
                            px-5
                            py-2.5
                            text-sm
                            text-[#C6A15B]
                            transition
                            hover:border-[#C6A15B]
                            hover:bg-[#C6A15B]
                            hover:text-[#081119]
                        "
                    >
                        {tag}
                    </button>
                ))}

            </div>

        </motion.article>
    );
}