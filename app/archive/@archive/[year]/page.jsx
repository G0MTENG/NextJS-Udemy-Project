import NewsList from '@/components/news-list'
import { getNewsForYear } from '@/lib/news'

export default function FilteredNewsPage({ params: { year } }) {
	const yearNews = getNewsForYear(year)
	return <NewsList news={yearNews} />
}
