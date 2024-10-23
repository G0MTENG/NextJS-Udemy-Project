import Link from 'next/link'

export default function MainHeader() {
	return (
		<header>
			<ul>
				<li>
					<Link href="/">Home Page</Link>
				</li>
				<li>
					<Link href="/news">News Page</Link>
				</li>
			</ul>
		</header>
	)
}
