import "dotenv/config";
import prisma from "../lib/prisma";

const categories = [
  { name: "Social Media", slug: "social-media" },
  { name: "Branding", slug: "branding" },
  { name: "Creative Direction", slug: "creative-direction" },
];

const blogs = [
  {
    title: "How We Scaled a Cafe Brand to 100K Local Reach",
    slug: "scaled-cafe-brand-to-100k-local-reach",
    description: "A practical social media playbook we used for a local cafe launch.",
    coverImage:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80",
    content:
      "This campaign focused on hyper-local storytelling, consistent reels, and weekly offers tied to creator collaborations. We designed content pillars around menu stories, people, and place. The result was predictable growth and stronger conversion from social channels.",
    tags: ["social media", "growth", "content strategy"],
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
