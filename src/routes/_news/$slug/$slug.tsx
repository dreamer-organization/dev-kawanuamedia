// import NewsDetailPage from '@/pages/news/news-detail/news-detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_news/$slug/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  return <></>
  // return <NewsDetailPage slug={slug}/>
}