import { DUMMY_NEWS } from '@/dummy_data'
import { notFound } from 'next/navigation'

export default function ImagePage({ params: { slug } }) {
	const newsItem = DUMMY_NEWS.find(news => news.slug === slug)

	if (!newsItem) {
		notFound()
	}

	const { image: newsImage, title: newsTitle } = newsItem

	return (
		<div className="fullscreen-image">
			<img src={`/images/news/${newsImage}`} alt={newsTitle} />
		</div>
	)
}
