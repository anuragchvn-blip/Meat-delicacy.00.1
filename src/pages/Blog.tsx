import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "../components/ui/navigation";
import { Footer } from "../components/ui/Footer";
import { SEO } from "../components/SEO";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { blogPosts, blogCategories } from "../data/blogs";
import { Search, Clock, Calendar, User, Filter } from "lucide-react";

const Blog = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#262729]">
      <SEO
        title="Blog | Meat Delicacy - Cooking Tips, Recipes & Meat Education"
        description="Discover expert cooking tips, meat preparation guides, nutrition facts, and delicious recipes. Learn from professional chefs and meat experts."
        keywords="meat cooking tips, pork recipes, butcher guide, meat nutrition, cooking techniques, food blog"
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-[#262729] to-[#363739]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1
                className="font-oswald text-5xl md:text-6xl font-bold mb-6"
                style={{
                  background:
                    "linear-gradient(90.01deg, #F8E3C9 0.01%, rgba(226, 209, 187, 0.64) 105.98%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                OUR BLOG
              </h1>
              <p className="text-white/70 text-xl mb-8">
                Expert tips, recipes, and insights from our kitchen to yours.
                Learn the art of meat preparation and cooking from professional
                chefs and butchers.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#363739] border-gray-600 text-white placeholder-gray-400 focus:border-[#F8E3C9]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 text-white/70 hover:text-white"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <span className="text-white/70 text-sm">
                  {filteredPosts.length} article
                  {filteredPosts.length !== 1 ? "s" : ""} found
                </span>
              </div>

              {/* Category Filters */}
              <div
                className={`flex flex-wrap gap-2 ${
                  showFilters ? "block" : "hidden lg:flex"
                }`}
              >
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
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-white text-xl mb-4">No articles found</h3>
                <p className="text-white/60 mb-6">
                  Try adjusting your search or category filter
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="bg-[#F8E3C9] text-[#262729]"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className={`bg-[#363739] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group cursor-pointer ${
                      index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`${
                        index === 0 ? "flex flex-col lg:flex-row" : ""
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden ${
                          index === 0 ? "lg:w-1/2 h-64 lg:h-auto" : "h-48"
                        }`}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-[#C72C41] text-white text-xs font-bold">
                            {post.category}
                          </Badge>
                        </div>
                        {index === 0 && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-black/50 text-white text-xs">
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className={`p-6 ${index === 0 ? "lg:w-1/2" : ""}`}>
                        <h2
                          className={`text-white font-bold mb-3 hover:text-[#F8E3C9] transition-colors cursor-pointer line-clamp-2 ${
                            index === 0 ? "text-xl lg:text-2xl" : "text-lg"
                          }`}
                          onClick={() => navigate(`/blog/${post.slug}`)}
                        >
                          {post.title}
                        </h2>
                        <p
                          className={`text-white/60 mb-4 line-clamp-3 ${
                            index === 0 ? "text-base" : "text-sm"
                          }`}
                        >
                          {post.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="flex items-center gap-4 text-white/50 text-xs mb-4">
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
                            <span>{post.readTime} min read</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-gray-600 text-gray-400 text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button
                          onClick={() => navigate(`/blog/${post.slug}`)}
                          className={`bg-[#F8E3C9] text-[#303132] font-bold hover:bg-[#F8E3C9]/90 transition-all duration-300 ${
                            index === 0 ? "text-base px-6" : "text-sm"
                          }`}
                        >
                          Read More
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-[#363739]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-[#F8E3C9] text-3xl font-bold mb-4">
              Never Miss a Recipe
            </h3>
            <p className="text-white/70 text-lg mb-8">
              Subscribe to our newsletter for weekly cooking tips, exclusive
              recipes, and special offers on premium meat cuts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-[#262729] border-gray-600 text-white placeholder-gray-400 focus:border-[#F8E3C9]"
              />
              <Button className="bg-[#C72C41] text-white hover:bg-[#C72C41]/90 px-8">
                Subscribe
              </Button>
            </div>
            <p className="text-white/50 text-sm mt-3">
              Get 10% off your first order when you subscribe!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
