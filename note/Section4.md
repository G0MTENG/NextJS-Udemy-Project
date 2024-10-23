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