import { DUMMY_NEWS } from '@/dummy_data'
import Link from 'next/link'

export default function NewsPage() {
	return (
		<>
			<h1>News Page</h1>
			<ul className="news-list">
				{DUMMY_NEWS.map(newsItem => {
					const {
						id: newsId,
						slug: newsSlug,
						title: newsTitle,
						image: newsImage,
						data: newsDate,
						content: newsContent,
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
		</>
	)
}
