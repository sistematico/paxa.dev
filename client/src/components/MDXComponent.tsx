import { MDXProvider } from "@mdx-js/react"

function MDXComponent({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-4 prose max-w-4xl ">
      <MDXProvider>{children}</MDXProvider>
    </section>
  )
}

export default MDXComponent
