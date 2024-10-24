// GET / POST / PATCH / PUT / DELETE .. 이러한 HTTP Method를 정의할 수 있다.
// route.js를 통해 API 를 구축할 수 있게 된다.

export function GET(request) {
	return new Response('hello')
}
