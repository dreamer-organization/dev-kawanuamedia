import NewsPage from '@/pages/news'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_news/berita')({
  component: RouteComponent,
})

function RouteComponent() {
  return <NewsPage />
}
