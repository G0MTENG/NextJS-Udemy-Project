'use client'

import { DUMMY_NEWS } from '@/dummy_data'
import { notFound } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function InterceptedImagePage({ params: { slug } }) {
	const newsItem = DUMMY_NEWS.find(news => news.slug === slug)
	const router = useRouter()

	const handleClickModalBackdrop = () => {
		router.back()
	}

	if (!newsItem) {
		notFound()
	}

	const { image: newsImage, title: newsTitle } = newsItem

	return (
		<>
			<div className="modal-backdrop" onClick={handleClickModalBackdrop} />
			<dialog className="modal" open>
				<div className="fullscreen-image">
					<img src={`/images/news/${newsImage}`} alt={newsTitle} />
				</div>
			</dialog>
		</>
	)
}
