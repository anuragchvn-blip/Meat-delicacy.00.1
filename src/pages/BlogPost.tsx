import { useParams, useNavigate } from "react-router-dom";
import { getBlogPost, getRelatedBlogs } from "../data/blogs";
import { Navigation } from "../components/ui/navigation";
import { Footer } from "../components/ui/Footer";
import { SEO } from "../components/SEO";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Clock, Calendar, User, Tag } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  if (!slug) {
    navigate("/blog");
    return null;
  }

  const post = getBlogPost(slug);
  const relatedPosts = getRelatedBlogs(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#262729]">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-white text-2xl mb-4">Blog post not found</h1>
            <Button
              onClick={() => navigate("/blog")}
              className="bg-[#F8E3C9] text-[#262729]"
            >
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#262729]">
      <SEO
        title={post.seo.metaTitle}
        description={post.seo.metaDescription}
        keywords={post.seo.keywords.join(", ")}
        image={post.featuredImage}
        type="article"
        author={post.author.name}
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
      />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16">
          <div className="max-w-4xl mx-auto px-4">
            {/* Back Button */}
            <Button
              onClick={() => navigate("/blog")}
              variant="ghost"
              className="text-white hover:text-[#F8E3C9] mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>

            {/* Article Header */}
            <div className="mb-8">
              <Badge className="bg-[#C72C41] text-white mb-4">
                {post.category}
              </Badge>
              <h1 className="text-[#F8E3C9] text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-gray-300 text-xl mb-6">{post.excerpt}</p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-12">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div
                  className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-[#F8E3C9] 
                  prose-p:text-gray-300 prose-p:leading-relaxed
                  prose-a:text-[#F8E3C9] prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white
                  prose-ul:text-gray-300 prose-ol:text-gray-300
                  prose-li:text-gray-300
                  prose-blockquote:border-l-[#F8E3C9] prose-blockquote:text-gray-300
                  prose-code:text-[#F8E3C9] prose-code:bg-gray-800
                  prose-pre:bg-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: post.content.replace(/\n/g, "<br />"),
                  }}
                />

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-gray-600">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm font-medium">
                      Tags:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="border-gray-600 text-gray-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Author Bio */}
                <div className="mt-12 p-6 bg-[#363739] rounded-lg">
                  <div className="flex items-start gap-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-[#F8E3C9] font-bold text-lg mb-2">
                        About {post.author.name}
                      </h3>
                      <p className="text-gray-300">{post.author.bio}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  {/* Related Posts */}
                  {relatedPosts.length > 0 && (
                    <div className="bg-[#363739] p-6 rounded-lg">
                      <h3 className="text-[#F8E3C9] font-bold text-lg mb-4">
                        Related Articles
                      </h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <div key={relatedPost.id} className="group">
                            <button
                              onClick={() =>
                                navigate(`/blog/${relatedPost.slug}`)
                              }
                              className="block text-left w-full"
                            >
                              <img
                                src={relatedPost.featuredImage}
                                alt={relatedPost.title}
                                className="w-full h-24 object-cover rounded mb-2"
                              />
                              <h4 className="text-white text-sm font-medium group-hover:text-[#F8E3C9] transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <p className="text-gray-400 text-xs mt-1">
                                {relatedPost.readTime} min read
                              </p>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="bg-[#C72C41] p-6 rounded-lg mt-6">
                    <h3 className="text-white font-bold text-lg mb-2">
                      Order Fresh Meat
                    </h3>
                    <p className="text-white/90 text-sm mb-4">
                      Get premium quality pork delivered to your door in 90
                      minutes!
                    </p>
                    <Button
                      onClick={() => navigate("/")}
                      className="w-full bg-[#F8E3C9] text-[#262729] hover:bg-[#F8E3C9]/90"
                    >
                      Order Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
