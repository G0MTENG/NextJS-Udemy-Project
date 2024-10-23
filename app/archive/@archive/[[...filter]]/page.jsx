import NewsList from '@/components/news-list'
import { getNewsForYear } from '@/lib/news'
import { getAvailableNewsYears } from '@/lib/news'
import Link from 'next/link'

export default function FilteredNewsPage({ params: { filter } }) {
	// 만약,
	// archive/2024/05로 접근한다면, ['2024', '05']
	// archive로 접근한다면 undefined가 filter에 담기게 된다.

	const links = getAvailableNewsYears()
	const yearNews = getNewsForYear(filter)

	return (
		<>
			<header id="archive-header">
				<nav>
					<ul>
						{links.map(link => (
							<li key={link}>
								<Link href={`/archive/${link}`}>{link}</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
			<NewsList news={yearNews} />
		</>
	)
}
