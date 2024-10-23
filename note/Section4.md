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

