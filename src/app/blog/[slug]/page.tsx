export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = (slug)
 
  return (
    <div>
      <h1>{post}</h1>
      <p>{post}</p>
    </div>
  )
}