// /news/page.jsx -> [Link] -> /news/[slug]/page.jsx
// Link's href = '/news/newsSlug'
// => parmas.slug = newsSlug

import { DUMMY_NEWS } from '@/dummy_data'

export default function NewsDetailPage({ params: { slug } }) {
	const newsItem = DUMMY_NEWS.find(news => news.slug === slug)
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
