import "dotenv/config";
import prisma from "../lib/prisma";

const categories = [
  { name: "Social Media", slug: "social-media" },
  { name: "Branding", slug: "branding" },
  { name: "Creative Direction", slug: "creative-direction" },
];

const longFormContent = JSON.stringify({
  blocks: [
    {
      heading: "The Local Coffee Revolution",
      content: `When we first partnered with Brew Haven Cafe in early 2025, they were a hidden gem tucked away in a quiet neighborhood corner. The coffee was exceptional, the atmosphere inviting, but their social media presence was virtually non-existent. Fast forward six months, and they've become a local phenomenon with over 100,000 engaged followers and a waiting list for their weekend brunch slots.

This case study breaks down the exact social media playbook we used to transform their digital presence, drive foot traffic, and create a community of loyal brand advocates. Every strategy outlined here is practical, repeatable, and designed for small businesses with limited budgets but unlimited creativity.`,
      embeds: [],
      images: [],
    },
    {
      heading: "Understanding the Foundation",
      content: `Before launching any campaign, we spent two weeks immersed in the cafe experience. We interviewed the owners about their vision, talked to regular customers about what they loved, and analyzed the competitive landscape. This research revealed three core differentiators that would become our content pillars.

First, their sourcing story was compelling—direct relationships with coffee farmers, seasonal bean rotations, and a commitment to ethical practices. Second, the cafe had become an unofficial community hub where freelancers, students, and creatives naturally gathered. Third, their pastry chef created Instagram-worthy desserts that tasted as good as they looked.

These insights shaped our entire content strategy. We weren't just selling coffee; we were telling the story of a community, celebrating craftsmanship, and showcasing the artistry behind every cup and pastry.`,
      embeds: [],
      images: ["/assets/choose1.avif"],
    },
    {
      heading: "Building the Content Pillars",
      content: `We structured content around three pillars: Menu Stories, People & Community, and Place & Atmosphere. Each pillar served a specific purpose in the customer journey while maintaining aesthetic consistency.

Menu Stories focused on the products themselves—close-ups of latte art, videos of brewing processes, and narratives about ingredient sourcing. These posts satisfied curiosity and showcased quality, often featuring educational captions that taught followers about coffee varieties and brewing methods.

People & Community content highlighted customers, staff, and the relationships formed within the cafe walls. We featured regular customers (with permission), shared barista profiles, and documented community events. This pillar humanized the brand and made followers feel part of something bigger than a transaction.

Place & Atmosphere posts captured the cafe's aesthetic—morning light streaming through windows, cozy corner nooks, and the warm ambiance that made the space special. These posts tapped into aspirational lifestyle content while remaining authentic to the cafe's genuine character.`,
      embeds: [],
      images: [],
    },
    {
      heading: "The Power of Consistent Reels",
      content: `While static posts built the aesthetic foundation, Reels drove exponential growth. We committed to posting three Reels per week, each serving a distinct purpose in our content ecosystem.

Tutorial Reels taught followers something valuable—how to create latte art at home, coffee brewing techniques, or the story behind specialty beans. These performed exceptionally well because they provided genuine value beyond promotional content. People saved and shared them, extending our organic reach.

Behind-the-Scenes Reels satisfied curiosity about cafe operations—early morning prep routines, pastry creation processes, and the choreography of busy weekend service. These authentic glimpses built connection and trust while showcasing the hard work behind every cup.

Entertainment Reels tapped into trending audio and formats while staying true to brand identity. We didn't follow every trend, but when we found trends that aligned with cafe culture—relaxed weekend vibes, coffee addiction humor, or aesthetic food content—we adapted them creatively.`,
      embeds: [],
      images: ["/assets/choose2.avif"],
    },
    {
      heading: "Creator Collaborations That Converted",
      content: `Rather than pursuing expensive influencer partnerships, we focused on micro-influencers and nano-creators within the local community. This strategy proved far more effective than working with larger accounts with broader but less engaged audiences.

We identified local food bloggers, lifestyle creators, and community advocates who genuinely aligned with the cafe's values. Instead of paying for posts, we invited them for complimentary experiences and let authentic enthusiasm drive content creation. Most shared their experiences organically because they genuinely loved the cafe.

We also created a "Creator Friendly Space" initiative, offering free WiFi, power outlets, and a special creator discount in exchange for occasional mentions. This turned the cafe into a preferred workspace for local content creators who naturally featured it in their content, generating consistent organic exposure.

The results were remarkable. Each creator collaboration introduced the cafe to new micro-communities, and because the endorsements felt authentic rather than sponsored, conversion rates far exceeded traditional advertising metrics.`,
      embeds: [],
      images: [],
    },
    {
      heading: "Weekly Offers and Strategic Promotions",
      content: `We implemented a "Feature Friday" concept where every Friday introduced a special menu item, discount, or experience. This created anticipation and gave followers a reason to check the account regularly.

Each Feature Friday was announced with a teaser on Wednesday and revealed on Friday morning, creating a mini-event that drove both social engagement and foot traffic. The offers ranged from seasonal drink launches to "bring a friend" discounts, always encouraging sharing and community building.

We tracked which offers drove the most engagement and foot traffic, refining our approach based on data. Surprisingly, experiential offers—like "Meet the Roaster" events or latte art workshops—often outperformed pure discounts in terms of community building and long-term customer value.`,
      embeds: [],
      images: ["/assets/choose3.avif"],
    },
    {
      heading: "Measuring Success Beyond Vanity Metrics",
      content: `While follower count grew impressively, we focused on metrics that directly correlated with business outcomes. Engagement rate, profile visits, and website clicks mattered more than raw follower numbers.

We implemented a simple tracking system where customers could mention how they discovered the cafe. This qualitative data revealed that about 60% of new customers found them through social media, with Instagram Reels and creator collaborations driving the majority of discovery.

Foot traffic increased 240% during the campaign period, with weekend reservations consistently booked days in advance. More importantly, the cafe built a genuine community of regulars who identified with the brand and actively promoted it within their own networks.

The ROI extended beyond immediate revenue. The cafe's social presence became a recruitment tool, attracting talented baristas who wanted to work somewhere with cultural cache. It also facilitated partnerships with local businesses and event opportunities that further expanded their reach.`,
      embeds: [],
      images: [],
    },
    {
      heading: "Lessons Learned and Key Takeaways",
      content: `This campaign reinforced that authenticity outperforms polish in local business marketing. Followers connected with real moments—messy morning rushes, staff laughing during prep, and genuine customer interactions—more than staged, perfect content.

Consistency mattered more than production value. Our most successful content often came from iPhone videos shot during natural moments rather than elaborate productions. The key was maintaining a consistent posting rhythm and aesthetic cohesion.

Community building should be the primary goal, with sales as a natural byproduct. By focusing on creating genuine connections and providing value through content, the cafe built customer loyalty that translated to sustained business growth.

For small businesses with limited budgets, creator collaborations and community-focused content offer the highest ROI. You don't need expensive campaigns when you have authentic stories, quality products, and a willingness to engage genuinely with your audience.`,
      embeds: [],
      images: [],
    },
    {
      heading: "Implementing This Playbook for Your Business",
      content: `Start by identifying your unique differentiators—what makes your business special beyond the products or services you offer. These differentiators become your content pillars and messaging foundation.

Commit to consistency over perfection. Three high-quality posts per week outperform daily mediocre content. Find a rhythm that's sustainable for your team and stick to it.

Invest in relationships rather than advertisements. Build connections with local creators, engage authentically with your community, and create content that serves your audience's interests beyond just promoting your business.

Track what matters. Monitor metrics that correlate with business outcomes—foot traffic, customer acquisition sources, and engagement quality—rather than vanity metrics that don't impact your bottom line.

Most importantly, remember that social media success for local businesses is about building community, not just building followers. Focus on creating genuine connections, and growth will follow naturally.`,
      embeds: [],
      images: ["/assets/middle2.png"],
    },
  ],
});

const blogs = [
  {
    title: "How We Scaled a Cafe Brand to 100K Local Reach",
    slug: "scaled-cafe-brand-to-100k-local-reach",
    description: "A practical social media playbook we used for a local cafe launch. Learn the exact strategies that drove 240% foot traffic growth and built a genuine community of brand advocates.",
    coverImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    content: longFormContent,
    tags: ["social media", "growth", "content strategy", "local business", "community building"],
    categorySlug: "social-media",
  },
  {
    title: "The Visual System Behind a Boutique Hotel Refresh",
    slug: "visual-system-behind-boutique-hotel-refresh",
    description: "A breakdown of how design consistency increased engagement for a hotel.",
    coverImage:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    content:
      "We rebuilt the brand feed with a stronger visual language: repeatable templates, consistent color hierarchy, and editorial photo direction. This created stronger recognition and better retention while keeping production simple for the in-house team.",
    tags: ["branding", "design", "hospitality"],
    categorySlug: "branding",
  },
  {
    title: "Content Production Framework for Fast-Moving Teams",
    slug: "content-production-framework-fast-moving-teams",
    description: "A lightweight framework to keep social content shipping every week.",
    coverImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1400&q=80",
    content:
      "We split production into three tracks: core campaign assets, weekly reactive pieces, and evergreen educational posts. A tight review loop and shared shot list reduced delays and improved quality across formats.",
    tags: ["content creation", "workflow", "marketing"],
    categorySlug: "creative-direction",
  },
  {
    title: "From Random Posting to Strategic Social Storytelling",
    slug: "random-posting-to-strategic-social-storytelling",
    description: "Turning fragmented content into a coherent narrative people follow.",
    coverImage:
      "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1400&q=80",
    content:
      "The key shift was planning monthly narrative arcs instead of isolated posts. We paired audience pain points with repeatable content formats and stronger captions. Engagement improved because each post connected to a bigger brand story.",
    tags: ["storytelling", "social media", "strategy"],
    categorySlug: "social-media",
  },
  {
    title: "Creative Direction Checklist Before You Hit Publish",
    slug: "creative-direction-checklist-before-you-hit-publish",
    description: "A pre-publish checklist to keep quality and brand voice consistent.",
    coverImage:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1400&q=80",
    content:
      "Before publish, we verify visual consistency, message clarity, and CTA placement. We also test thumbnail readability and first-frame hooks for short-form video. This simple checklist helps teams avoid avoidable performance drops.",
    tags: ["creative direction", "quality", "publishing"],
    categorySlug: "creative-direction",
  },
];

async function seedBlogs() {
  const categoryMap = new Map<string, number>();

  for (const category of categories) {
    const savedCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: category,
    });
    categoryMap.set(category.slug, savedCategory.id);
  }

  for (const blog of blogs) {
    const categoryId = categoryMap.get(blog.categorySlug);
    if (!categoryId) {
      throw new Error(`Missing category for slug: ${blog.categorySlug}`);
    }

    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {
        title: blog.title,
        description: blog.description,
        coverImage: blog.coverImage,
        content: blog.content,
        tags: blog.tags,
        published: true,
        categoryId,
      },
      create: {
        title: blog.title,
        slug: blog.slug,
        description: blog.description,
        coverImage: blog.coverImage,
        content: blog.content,
        tags: blog.tags,
        published: true,
        categoryId,
      },
    });
  }

  console.log(`Seeded ${blogs.length} blogs and ${categories.length} categories.`);
}

seedBlogs()
  .catch((error) => {
    console.error("Failed to seed blogs:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
