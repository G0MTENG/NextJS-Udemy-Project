import { DUMMY_NEWS } from '@/dummy_data'
import { notFound } from 'next/navigation'

export default function InterceptedImagePage({ params: { slug } }) {
	const newsItem = DUMMY_NEWS.find(news => news.slug === slug)

	if (!newsItem) {
		notFound()
	}

	console.log('object')

	const { image: newsImage, title: newsTitle } = newsItem

	return (
		<>
			<h2>Intercepted</h2>
			<div className="fullscreen-image">
				<img src={`/images/news/${newsImage}`} alt={newsTitle} />
			</div>
		</>
	)
}
