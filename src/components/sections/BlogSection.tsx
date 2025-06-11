import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { blogPosts, blogCategories } from "../../data/blogs";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";

export const BlogSection = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = blogPosts[0]; // First post as featured
  const otherPosts = filteredPosts.slice(activeCategory === "All" ? 1 : 0, 4); // Show 3 more posts

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="bg-[#262729] py-20">
      <div className="max-w-7xl mx-auto px-3">
        {/* Section Header */}
        <div className="flex flex-wrap -mx-3 mb-12">
          <div className="w-full px-3 flex items-end justify-between">
            <div>
              <h2
                className="font-oswald text-5xl font-semibold tracking-wider leading-tight mb-4 uppercase"
                style={{
                  background:
                    "linear-gradient(90.01deg, #F8E3C9 0.01%, rgba(226, 209, 187, 0.64) 105.98%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Latest from our blog
              </h2>
              <p className="text-white/60 font-medium max-w-2xl">
                Discover expert tips, recipes, and insights about meat
                preparation, cooking techniques, and nutrition. Stay updated
                with the latest from our kitchen to yours.
              </p>
            </div>
            <button
              onClick={() => navigate("/blog")}
              className="flex items-center gap-2 text-[#F8E3C9] font-semibold hover:text-white transition-colors"
            >
              View all posts
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 px-3">
          {blogCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#C72C41] text-white"
                  : "bg-[#363739] text-white/70 hover:bg-[#C72C41]/80 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          {activeCategory === "All" && featuredPost && (
            <div className="lg:row-span-2">
              <div className="bg-[#363739] rounded-lg overflow-hidden h-full hover:transform hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div
                  className="relative h-64 lg:h-80 overflow-hidden"
                  onClick={() => navigate(`/blog/${featuredPost.slug}`)}
                >
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#C72C41] text-white text-xs font-bold">
                      Featured
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-black/50 text-white text-xs">
                      {featuredPost.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className="text-white font-bold text-xl mb-3 hover:text-[#F8E3C9] transition-colors cursor-pointer line-clamp-2"
                    onClick={() => navigate(`/blog/${featuredPost.slug}`)}
                  >
                    {featuredPost.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center gap-4 text-white/50 text-xs mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{featuredPost.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{featuredPost.readTime} min read</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate(`/blog/${featuredPost.slug}`)}
                    className="bg-[#F8E3C9] text-[#303132] font-bold text-sm hover:bg-[#F8E3C9]/90 transition-all duration-300"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Other Posts */}
          <div
            className={`space-y-6 ${
              activeCategory === "All" ? "" : "lg:col-span-2"
            }`}
          >
            {otherPosts.map((post) => (
              <div
                key={post.id}
                className="bg-[#363739] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row">
                  <div
                    className="sm:w-48 h-48 sm:h-auto overflow-hidden flex-shrink-0"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-[#C72C41] text-white text-xs">
                        {post.category}
                      </Badge>
                    </div>

                    <h3
                      className="text-white font-bold text-lg mb-2 hover:text-[#F8E3C9] transition-colors cursor-pointer line-clamp-2"
                      onClick={() => navigate(`/blog/${post.slug}`)}
                    >
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center gap-3 text-white/50 text-xs mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate(`/blog/${post.slug}`)}
                      variant="ghost"
                      className="text-[#F8E3C9] hover:text-white text-sm p-0 h-auto font-medium"
                    >
                      Read More →
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-[#363739] rounded-lg p-8">
            <h3 className="text-[#F8E3C9] text-2xl font-bold mb-4">
              Want More Cooking Tips?
            </h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly recipes, cooking tips, and
              exclusive offers on premium meat cuts. Plus, get 10% off your
              first order!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded bg-[#262729] text-white border border-gray-600 focus:border-[#F8E3C9] focus:outline-none"
              />
              <Button className="bg-[#C72C41] text-white hover:bg-[#C72C41]/90 px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
