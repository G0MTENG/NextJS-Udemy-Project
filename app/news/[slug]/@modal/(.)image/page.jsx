import ModalBackdrop from '@/components/modal-backdrop'
import { DUMMY_NEWS } from '@/dummy_data'
import { notFound } from 'next/navigation'

export default function InterceptedImagePage({ params: { slug } }) {
	const newsItem = DUMMY_NEWS.find(news => news.slug === slug)

	if (!newsItem) {
		notFound()
	}

	const { image: newsImage, title: newsTitle } = newsItem

	return (
		<>
			<ModalBackdrop />
			<dialog className="modal" open>
				<div className="fullscreen-image">
					<img src={`/images/news/${newsImage}`} alt={newsTitle} />
				</div>
			</dialog>
		</>
	)
}
