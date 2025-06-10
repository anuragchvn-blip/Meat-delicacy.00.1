import { getFeaturedBlogs } from "../../data/blogs";
import { Button } from "../ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";

export const BlogSection = () => {
  const featuredBlogs = getFeaturedBlogs();

  return (
    <section className="bg-[#FCF3E8] py-20">
      <div className="max-w-7xl mx-auto px-3">
        {/* Section Header */}
        <div className="flex flex-wrap -mx-3 mb-12">
          <div className="w-full px-3 text-center">
            <h2 className="text-[#C72C41] font-oswald text-5xl font-semibold tracking-wider leading-tight mb-4 uppercase">
              From Our Kitchen
            </h2>
            <p className="text-[#262729]/60 font-medium max-w-2xl mx-auto">
              Discover delicious recipes, cooking tips, and expert insights into
              the world of premium pork cuts and culinary excellence.
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredBlogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-[#262729]/60 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={blog.publishedAt}>
                      {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#262729] mb-3 group-hover:text-[#C72C41] transition-colors">
                  <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                </h3>

                <p className="text-[#262729]/70 text-sm leading-relaxed mb-4">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-[#C72C41]/10 text-[#C72C41] text-xs font-medium rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#C72C41] hover:text-[#C72C41]/80 hover:bg-[#C72C41]/10 p-0"
                    asChild
                  >
                    <a
                      href={`/blog/${blog.slug}`}
                      className="flex items-center gap-1"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            className="bg-[#C72C41] text-white font-bold px-8 py-3 hover:bg-[#C72C41]/90 transition-all duration-300"
            asChild
          >
            <a href="/blog" className="flex items-center gap-2">
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
