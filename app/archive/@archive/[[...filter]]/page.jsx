import NewsList from '@/components/news-list'
import {
	getAvailableNewsMonths,
	getNewsForYear,
	getNewsForYearAndMonth,
} from '@/lib/news'
import { getAvailableNewsYears } from '@/lib/news'
import Link from 'next/link'

export default function FilteredNewsPage({ params: { filter } }) {
	// 만약,
	// archive/2024/05로 접근한다면, ['2024', '05']
	// archive로 접근한다면 undefined가 filter에 담기게 된다.

	const [year, month] = filter ?? [undefined, undefined]
	let links = getAvailableNewsYears()

	let filteredNews = null
	if (year) {
		if (month) {
			filteredNews = getNewsForYearAndMonth(year, month)
			links = []
		} else {
			filteredNews = getNewsForYear(year)
			links = getAvailableNewsMonths(year)
		}
	}

	let newsContent = null
	if (filteredNews && filteredNews.length > 0) {
		newsContent = <NewsList news={filteredNews} />
	} else {
		newsContent = <p>No news found for the selected period.</p>
	}

	if (
		(year && !getAvailableNewsYears().includes(Number(year))) ||
		(month && !getAvailableNewsMonths(year).includes(Number(month)))
	) {
		throw new Error('Invalid Filter')
	}

	return (
		<>
			<header id="archive-header">
				<nav>
					<ul>
						{links.map(link => {
							const href = year
								? `/archive/${year}/${link}`
								: `/archive/${link}`
							return (
								<li key={link}>
									<Link href={href}>{link}</Link>
								</li>
							)
						})}
					</ul>
				</nav>
			</header>
			{newsContent}
		</>
	)
}
