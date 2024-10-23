// /news/page.jsx -> [Link] -> /news/[slug]/page.jsx
// Link's href = '/news/newsSlug'
// => parmas.slug = newsSlug

import { DUMMY_NEWS } from '@/dummy_data'
import { notFound } from 'next/navigation'

export default function NewsDetailPage({ params: { slug } }) {
	const newsItem = DUMMY_NEWS.find(news => news.slug === slug)

	if (!newsItem) {
		// 만약, newsItem이 존재하지 않는다면, notFound Error를 발생시키고,
		// App Folder 내에 존재하는 가장 가까운 not-found.js를 찾는다.
		notFound()
	}

	const {
		title: newsTitle,
		image: newsImage,
		date: newsDate,
		content: newsContent,
	} = newsItem

	return (
		<article className="news-article">
			<header>
				<img src={`/images/news/${newsImage}`} />
				<h1>{newsTitle}</h1>
				<time dateTime={newsDate}>{newsDate}</time>
			</header>
			<div>{newsContent}</div>
		</article>
	)
}
