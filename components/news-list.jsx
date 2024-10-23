// migration: news/page.jsx unordered list Links to NewsList that seperate component

import Link from 'next/link'

export default function NewsList({ news }) {
	return (
		<ul className="news-list">
			{news.map(newsItem => {
				const {
					id: newsId,
					slug: newsSlug,
					title: newsTitle,
					image: newsImage,
				} = newsItem

				return (
					<li key={newsId}>
						<Link href={`/news/${newsSlug}`}>
							<img src={`/images/news/${newsImage}`} alt={newsTitle} />
							<span>{newsTitle}</span>
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
