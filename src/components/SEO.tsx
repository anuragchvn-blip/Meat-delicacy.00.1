import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEO = ({
  title = "Meat Delicacy - Fresh Pork Delivery in 90 Minutes | Premium Quality Meat",
  description = "Order fresh, premium quality pork cuts with 90-minute delivery in Bangalore. Wide selection of pork special cuts, raw cuts, and processed products. Free delivery within 5km radius.",
  keywords = "pork delivery bangalore, fresh meat delivery, pork cuts, meat delicacy, 90 minute delivery, premium pork, online meat shopping, fresh pork bangalore",
  image = "https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/mdc-banner.png",
  url = typeof window !== "undefined" ? window.location.href : "",
  type = "website",
  author = "Meat Delicacy",
  publishedTime,
  modifiedTime,
}: SEOProps) => {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic SEO meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", author);
    updateMetaTag("robots", "index, follow");
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

    // Open Graph meta tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:site_name", "Meat Delicacy", true);
    updateMetaTag("og:locale", "en_IN", true);

    // Twitter Card meta tags
    updateMetaTag("twitter:card", "summary_large_image", true);
    updateMetaTag("twitter:title", title, true);
    updateMetaTag("twitter:description", description, true);
    updateMetaTag("twitter:image", image, true);

    // Article specific tags
    if (publishedTime) {
      updateMetaTag("article:published_time", publishedTime, true);
    }
    if (modifiedTime) {
      updateMetaTag("article:modified_time", modifiedTime, true);
    }
    if (author) {
      updateMetaTag("article:author", author, true);
    }

    // Structured Data for Local Business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Meat Delicacy",
      description:
        "Premium fresh pork delivery service in Bangalore with 90-minute delivery guarantee",
      url: "https://meatdelicacy.com",
      logo: "https://meatdelicacy.com/wp-content/themes/meat-delicacy/assets/images/mdc.svg",
      image: image,
      telephone: "+91-8123959702",
      email: "support@meatdelicacy.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Hommadevanahalli",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        postalCode: "560000",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "12.9716",
        longitude: "77.5946",
      },
      areaServed: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: "12.9716",
          longitude: "77.5946",
        },
        geoRadius: "5000",
      },
      serviceType: "Fresh Meat Delivery",
      priceRange: "₹₹",
      openingHours: "Mo-Su 09:00-21:00",
      paymentAccepted: ["Cash", "Credit Card", "UPI"],
      currenciesAccepted: "INR",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Meat Products",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Product",
              name: "Fresh Pork Cuts",
              category: "Meat Products",
            },
          },
        ],
      },
    };

    // Remove existing structured data
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]',
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [
    title,
    description,
    keywords,
    image,
    url,
    type,
    author,
    publishedTime,
    modifiedTime,
  ]);

  return null;
};

// Hook for easy SEO management
export const useSEO = (seoProps: SEOProps) => {
  useEffect(() => {
    // This will trigger the SEO component update
  }, [seoProps]);

  return <SEO {...seoProps} />;
};
