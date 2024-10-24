# 라우팅 및 페이지 렌더링 - 심층 분석
### 135. 모듈 소개
### 과제

요구사항
- [X] /news -> show a list of news item links
- [X] /news/<id> -> show a detail page for a news item
- [X] MainHeader Component
  - have two links that link to "Home" page and "News" page

### 138. 연습 솔루션 2부

⭐️ MainHeader Component를 개발하며 느낀점
> MainHeader 컴포넌트를 개발하며 평소 같았으면 div로 Wrapping 했을거 같은데
> SEO를 위해 Header 컴포넌트는 div -> header를 사용하는 것이 좋은 습관인거 같다.

+ 추가적으로 Link들을 배치할 때도 ul > li 태그로 하는 것도 확실히 list를 나타낼 때 사용하는 것이 좋을거 같다.

```jsx
// ⛔️
<>
  <Link></Link>
  <Link></Link>
  <Link></Link>
  <Link></Link>
</>

// ✅
// 시멘틱 -> 웹 접근성을 높일 수 있음
<ul>
  <li>
    <Link></Link>
  </li>
  <li>
    <Link></Link>
  </li>
  <li>
    <Link></Link>
  </li>
</ul>
```

### 140. "Not Found" 오류 처리 및 "Not Found" 페이지 표시하기

> NextJS에서 Not Found 페이지를 보여주기 위해서는 특수한 파일인 not-found.jsx 파일을 app folder 내에 사용하면 된다.

### 141. 병렬 라우트 설정 및 사용

이번 챕터에서 할 일
- news 라우트와 병렬적으로 존재하는 archive라는 라우트를 만들 것임
- archive 라우트는 두 가지를 보여주는데
  - 연도와 월로 탐색할 수 있는 뉴스 아카이브
  - 최신 뉴스 목록

```jsx
// layout.jsx
// @something1 @something2
// 다음과 같이 병렬 라우트로 설정한 것들의 폴더 이름 `something1` `something2`를 인자로 받을 수 있음

export default function Layout({something1, something2}) {
  return (<div>
    <div>{something1}</div>
    <div>{something2}</div>
  </div>)
}
```

### 142. 병렬 라우트 및 중첩 라우트로 작업하기

다음과 같이 병렬 라우트를 설정했다
- app
 - archive
  - @archive
    - [year]
  - @latest

그리고 /archive/2024로 들어가면 not-found error가 발생한다.

왜 그럴까 ??
=> 병렬 라우트는 각 라우트를 병렬적으로 처리하기 때문이다.
=> @latest는 /year에 대한 처리를 하지 않았고, 때문에 not-found error가 발생하는 것이다.

어떻게 해결할 수 있을까 ?
@latest/[year]로 똑같이 라우트를 처리하면 될것이다.
하지만, @latest에서 [year]는 필요하지 않다.

따라서, 다른 방법을 적용할 수 있다.

#### default.jsx
page.jsx -> default.jsx로 수정한다.

default.jsx로 수정하면, /archive/year과 같이 구체적인 라우트를 설정하지 않아도 fallback UI로 처리가 되어 기본적으로 보여지게 된다.

### 143. Catch-All 라우트 설정

현재 프로젝트의 문제점

- archive 페이지에서 archive/2024로 네비게이팅하면 연도 선택 nav바가 사라짐

sol 1 ) layout.jsx을 사용한다.

> 이 부분은 강의에서 다루지 않지만, `0f4149f (HEAD -> main) layout.js를 통한 네비게이팅 사용` 커밋으로 직접 해결해봄

sol 2 ) catch-all 사용하기

[[...something]]
=> 다음과 같이 catch-all을 사용할 수 있다.

- @archive
  - page.jsx
  - [[...filter]]
    - page.jsx

다음과 같이 구성한다면, catch-all은 /archive 이후 모든 라우트에 대해 처리하기 때문에
@archive/page.jsx와 @archive/[[...filter]]/page.jsx는 충돌을 일으키게 된다.

따라서, archive/page.jsx는 삭제하고, @archive/[[...filter]]/page.jsx에 archive/page.jsx 기능들을 추가해주면 된다.

=> 이렇게 함으로써 archive/year/month 이런 것도 catch-all로 [[...dateFilter]] 이렇게 처리할 수 있게 된다.

> 개인적으로는 확장성이 좋아진거 같긴함.

추가적인 내 생각.
=> 결국엔 default.js와 catch-all은 모두 폴백에 대한 처리임

defaut.js -> 정적인 경로일 때 폴백 처리
catch-all -> 동적인 경로에 대한 폴백 처리
이렇게 사용하는 것으로 이해하면 좋은거 같음.

### 144. catch-all 폴백 라우트 및 여러 경로 세그먼트 처리하기

catch-all을 적용하고 현재 문제는 

archive/2024/05에 대한 처리가 안 됨.

```jsx
export default function Page({params: { filter } }) {
  const yearNews = getNewsForYear(filter)
}
```

이렇게 데이터를 가져오고 있기 때문임.
filter는 undefined | Array<string>의 타입을 가지고 있음.

따라서, filter는 array임. 이에 대한 데이터를 가져와야 함.

근데 보면 archive/2024는 잘 동작함 ...

### 이상한 javascript ...

```js
console.log(+['2024'])
// 2024
```

이렇게 동작하기 때문에 잘 동작하고 있음...

### 145. Throwing (라우트 관련) 오류

```js
throw new Error('something')
```

다음과 같이 오류를 발생시킬 수 있다.

### 146. 오류 페이지로 오류 처리하기

error.jsx 특수 파일이 이를 캐치할 수 있다.

또한, error.jsx는 클라이언트 컴포넌트로 해야 한다.

```jsx
'use client'

export default function FilterError({ error }) {
	return (
		<div id="error">
			<h2>An error occurred!</h2>
			<p>{error.message}</p>
		</div>
	)
}
```

### 147. 서버 vs 클라이언트 컴포넌트

서버 컴포넌트 -> 서버에서 렌더링
클라이언트 컴포넌트 -> 클라이언트에서 렌더링

특별한 이유가 존재하지 않는다면 NextJS에서는 서버 컴포넌트를 클라이언트 컴포넌트로 전환하면 안 된다.
서버에서 하는 것이 뭐든 좋기 때문이다.

=> 음 ,,, 강의에서는 이렇게 설명했는데 분명 CSR과 SSR의 장단점은 분명하다고 생각한다. 이건 좀 과장된 이야기 같다고 생각한다.

** 면접에서 나왔던 질문 **
서버 컴포넌트로 개발하다가 클라이언트 컴포넌트로 전환해야 할 때 어덯게 할 수 있을까 ?

```jsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MainHeader() {
	const path = usePathname()

	return (
		<header id="main-header">
			<div id="logo">
				<Link href="/">NextNews</Link>
			</div>
			<nav>
				<ul>
					<li>
						<Link
							href="/news"
							className={path.startsWith('/news') ? 'active' : undefined}
						>
							News
						</Link>
					</li>
					<li>
						<Link
							href="/archive"
							className={path.startsWith('/archive') ? 'active' : undefined}
						>
							Archive
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	)
}
```

현재 MainHeader 컴포넌트는 클라이언트 컴포넌트가 되었다. usePathname을 사용하기 때문이다.

이렇게 전체적으로 클라이언트 컴포넌트로 전환하게 되었는데 어떻게 할 수 있을까 ??
=> 아웃소싱 !

현재 usePathname을 사용하고 있는 코드는

```jsx
<Link
  href="/archive"
  className={path.startsWith('/archive') ? 'active' : undefined}
></Link>
```

> 이 부분이다. 따라서, 가능한 서버 컴포넌트로 할 수 있는 부분은 유지한 후 
> 작은 Link 컴포넌트만 따로 아웃소싱을 통해 클라이언트 컴포넌트로 분리하는 방법이 존재한다.

### 148. 동적 라우트 안에 중첩된 라우트

이번에는 `인터셉팅 라우트`에 대해 알아본다.

news/[slug]/page.jsx에서 img를 클릭하면, 그 어떤 페이지든 이미지가 전체 화면으로 보이도록 개발할 것이다.

그 전에 중첩 라우팅을 이용해서 먼저 구현해보면

news/[slug]/image/page.jsx에 다음과 같이 개발할 수 있다.
```jsx
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
```

그리고 Link를 통해 라우팅 시키면 된다.

### 149. 내비게이션 가로채기 및 가로채기 라우트 사용

인터셉트 라우트는 특정 라우트로 진입 시 가로채기를 통해 다른 라우트로 라우팅 시키는 기술이다.

/news/[slug]/image로 진입하는 것을 가로채보면

/news/[slug]/(.)image => . (<- sibling folder)의 image (<- image route로 가는 것을 가로챈다) 라는 의미이다.

따라서 /news/[slug]/image로 Link를 통해 진입하면 라우팅을 가로채고, /news/[slug]/(.)image/page.jsx가 보여지게 된다.

하지만, 여기서 하드로딩을 시도하면 /news/[slug]/image의 원래 경로로 들어갈 수 있다.

이러한 인터셉팅 라우트는 모달 등에서 많이 사용된다.

### 150. 병렬 및 언터셉트 라우트 결합하기

한 번에 많은 것들이 변경되고 그래서 어떤 것들을 변경했는지에 대해 정리한다.

우선, 기존 개발했던 코드는 Link를 통해 /news/[slug]/image로 라우팅하여 이미지에 대해 접근하는데
intercepting route를 통해 modal을 띄우는 방식이다.

하지만, 다음과 같은 방식을 사용하면 그 인터셉트 페이지로 갈 뿐 원래 페이지에 대한 접근을 할 수 없다.
때문에 layout으로 modal을 올려서 사용하는 방법을 사용한다.

/news/[slug]/layout.jsx를 생성하고 다음과 같이 사용한다.

```jsx
export default function NewsDetailLayout({ children, modal }) {
	return (
		<>
			{modal}
			{children}
		</>
	)
}
```

즉, @modal 폴더를 만들어야 하며, 그 인터셉트 라우트가 들어가야 하기 때문에 다음과 같은 라우팅 구조를 가지게 된다.

- news/[slug]
	- @modal
		- (.)image
			- page.jsx
	- image
		- page.jsx
	- page.jsx
	- layout.jsx
	- not-found.jsx

하지만, modal은 항상 있는 것이 아니다. 인터셉트 라우트. 즉, Link를 클릭한 경우에만 동작하기 때문에 이에 대해 처리를 해줘야 한다.

/news/[slug]/@modal/default.jsx
```jsx
export default function ModalDefaultPage() {
	return null
}
```

default.jsx 파일을 만들어 기본적으로 인터셉트 라우트가 나오기 전에는 null을 return 해주어 UI에 표시를 안 하면 된다.

> 원래는 page.jsx로 했는데 이게 나중에 /news/[slug]/image로 URL을 통해 들어가면 충돌을 해서 default.jsx로 수정해주었다.

### 152. 프로그램 방식으로 탐색하기

modal-backdrop을 클릭했을 때 다시 뒤로 돌아가기 위해서 어떻게 할 수 있는지에 대해 다룬다.

하지만, 이 부분은 먼저 구현해봐서 따로 정리는 하지 않는다.

프로그램 방식으로 탐색한다는 것이 `useRoute` 훅으로 라우팅하는 것을 의미한다.

### 153. 라우트 그룹 사용 및 이해

라우트 그룹은 (something) 다음과 같은 폴더로 이 폴더 내부에 있는 폴더들은 라우팅이 일어나지만,
(something)은 라우팅이 되지 않는다.

그동안 라우트 그룹은 도메인 별로 묶으며 관심사를 묶는데 주로 사용했다.

하지만, 여기서 이번 강의에서는 그 이상의 가치를 알려주는 것 같다.

(content)와 (marketing) 라우트 그룹을 만든다. 그리고 두 라우트 그룹마다 layout.jsx를 만든다.

솔직히 처음 이 부분에서는 이러면 "두 레이아웃이 충돌하지 않을까"라는 걱정을 했지만
천천히 생각해보면 잘 동작한다는 것을 알 수 있다.

layout -> page 를 호출하는데 (content)에는 page.jsx를 두지 않으면 그 layout은 page.jsx를 호출하지 않고
충돌을 일으키지 않는다.

즉, (content) 에서 사용되는 layout은 그 하위 라우트에 대한 layout을 제공하는 역할을 할 수 있다.

### 154. 라우트 핸들러로 API 구축하기

라우트 핸들러에 대해 다룬다.

라우트 핸들러를 통해 페이지 렌더링뿐만 아니라 API도 개발할 수 있다.

/api/route.js
```js
export default function GET(request) {
	return new Response('hello')
}
```