import { Reveal } from "@/components/Reveal";
import { homeContent } from "@/content/home";

export function RecentUpdates() {
  return (
    <section
      className="section-pad border-t border-deep/10 bg-background page-gutter"
      aria-labelledby="updates-heading"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 max-w-2xl">
          <p className="label-caps mb-4">From the studio</p>
          <h2
            id="updates-heading"
            className="font-heading heading-section text-deep"
          >
            Latest work & updates
          </h2>
        </Reveal>
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {homeContent.posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.05} as="li">
              <article className="border-t border-deep/15 pt-6">
                <h3 className="font-heading text-2xl text-deep">{post.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                  {post.text}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
