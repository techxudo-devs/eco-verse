import { PrismaClient } from "../app/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Create a category first
  const category = await prisma.category.upsert({
    where: { slug: "sustainability" },
    update: {},
    create: {
      name: "Sustainability",
      slug: "sustainability",
    },
  });

  console.log("Created category:", category);

  // Create a comprehensive blog post with lots of content
  const blogContent = {
    blocks: [
      {
        heading: "The Future of Sustainable Marketing",
        content: `In an era where environmental consciousness shapes consumer behavior, brands must reimagine their marketing strategies. The traditional approaches that prioritized growth at any cost are giving way to sustainable practices that balance profitability with planetary health.

Modern consumers are more informed than ever before. They scrutinize supply chains, question corporate commitments, and demand transparency. This shift presents both challenges and opportunities for marketing professionals who must navigate the delicate balance between authentic messaging and commercial objectives.

The rise of digital platforms has democratized information, making it impossible for brands to hide behind greenwashing tactics. Social media amplifies both successes and failures, creating an environment where authenticity isn't just preferred—it's required.`,
        embeds: [],
        images: [],
      },
      {
        heading: "Understanding the Green Consumer",
        content: `Today's environmentally conscious consumer represents a growing demographic with significant purchasing power. These individuals don't just buy products; they invest in values, support missions, and champion causes that align with their worldview.

Research indicates that over 73% of millennials are willing to pay more for sustainable products. This isn't a passing trend but a fundamental shift in consumer psychology. The green consumer seeks transparency, demands accountability, and rewards brands that demonstrate genuine commitment to environmental stewardship.

However, this demographic is also highly skeptical. Years of corporate greenwashing have created a trust deficit that brands must overcome through consistent action and measurable impact. Words without evidence fall flat; data without narrative feels cold. The winning formula combines compelling storytelling with verifiable results.`,
        embeds: [],
        images: ["/assets/choose1.avif"],
      },
      {
        heading: "Building Authentic Brand Narratives",
        content: `Authenticity in sustainable marketing isn't about perfection—it's about honesty. Brands that acknowledge their journey, including setbacks and challenges, often resonate more deeply than those claiming flawless sustainability credentials.

The most effective brand narratives weave environmental commitment into the company's origin story and future vision. They don't treat sustainability as a marketing add-on but as a core value that influences every business decision. This integration creates coherence between messaging and action, building trust through consistency.

Consider Patagonia's approach: they openly share their environmental impact data, encourage customers to repair rather than replace products, and invest profits in environmental causes. Their marketing doesn't just talk about sustainability; it embodies it at every touchpoint.`,
        embeds: [],
        images: [],
      },
      {
        heading: "The Role of Data and Transparency",
        content: `In sustainable marketing, data serves as the bridge between claims and credibility. Consumers increasingly expect brands to quantify their environmental impact, providing specific metrics rather than vague commitments.

Carbon footprint calculators, supply chain transparency reports, and lifecycle assessments have moved from nice-to-haves to essential components of environmental marketing. These tools don't just inform consumers; they hold brands accountable and create benchmarks for continuous improvement.

However, data presentation matters as much as data collection. Numbers without context can overwhelm or bore audiences. The challenge lies in translating complex environmental metrics into accessible insights that resonate emotionally while maintaining scientific accuracy.`,
        embeds: [],
        images: ["/assets/choose2.avif", "/assets/choose3.avif"],
      },
      {
        heading: "Digital Innovation in Sustainable Marketing",
        content: `Digital technologies are revolutionizing how brands communicate their sustainability efforts. Virtual reality experiences can transport consumers to factory floors, showing sustainable production processes firsthand. Augmented reality apps help shoppers understand product origins and environmental impact at the point of purchase.

Blockchain technology enables unprecedented supply chain transparency, allowing consumers to trace products from raw materials to finished goods. These innovations transform abstract sustainability claims into tangible, verifiable experiences that build trust and engagement.

Social media platforms amplify sustainable messaging but also create challenges. The fast-paced nature of digital content demands constant innovation while maintaining message consistency. Brands must balance trending topics with timeless values, creating content that feels current without compromising core principles.`,
        embeds: [],
        images: [],
      },
      {
        heading: "Measuring Impact Beyond Profit",
        content: `Traditional marketing metrics focus on conversion rates, engagement, and revenue. Sustainable marketing requires additional frameworks that measure environmental and social impact alongside financial performance.

Triple bottom line accounting—evaluating people, planet, and profit—provides a more holistic view of marketing effectiveness. This approach recognizes that long-term brand value depends on more than quarterly earnings, encompassing environmental stewardship and social responsibility.

B Corp certification and similar frameworks offer standardized methods for measuring and communicating sustainable business practices. These certifications provide third-party validation that strengthens marketing claims and builds consumer confidence.`,
        embeds: [],
        images: [],
      },
      {
        heading: "Collaborations and Partnerships",
        content: `No brand can solve environmental challenges alone. Strategic partnerships between companies, NGOs, and government organizations amplify impact and credibility. These collaborations demonstrate commitment beyond marketing, showing that sustainability efforts extend throughout the business ecosystem.

Co-marketing initiatives with environmental organizations lend authority to sustainability claims while supporting important causes. However, these partnerships must be genuine and substantial. Token donations or superficial associations risk backlash from increasingly sophisticated consumers who can spot inauthentic alliances.

Industry-wide initiatives, such as sustainable packaging coalitions or carbon-neutral shipping programs, create systemic change that benefits all participants. These collective efforts often achieve more than individual brand initiatives, demonstrating leadership while building industry-wide standards.`,
        embeds: [],
        images: ["/assets/middle2.png"],
      },
      {
        heading: "The Psychology of Sustainable Choice",
        content: `Understanding why consumers choose sustainable products requires insight into behavioral psychology and decision-making processes. Environmental concern alone doesn't guarantee sustainable purchasing behavior—convenience, price, and perceived quality often override good intentions.

Effective sustainable marketing addresses these friction points, making green choices easier and more attractive. This might involve highlighting cost savings from durable products, emphasizing health benefits of natural materials, or creating convenient subscription models for sustainable alternatives.

Social proof plays a crucial role in normalizing sustainable consumption. When marketing showcases widespread adoption of eco-friendly practices, it shifts sustainability from niche preference to mainstream expectation, accelerating behavior change at scale.`,
        embeds: [],
        images: [],
      },
      {
        heading: "Navigating Regulatory Landscapes",
        content: `Environmental marketing claims face increasing regulatory scrutiny worldwide. Greenwashing lawsuits and regulatory penalties make compliance essential, but regulations also provide clarity and level the playing field for honest actors.

Understanding regional differences in environmental marketing regulations is crucial for global brands. What's acceptable in one market may violate regulations in another. This complexity requires sophisticated legal review and localized marketing strategies that maintain brand consistency while respecting local requirements.

Forward-thinking brands view regulations not as constraints but as opportunities to differentiate through verified compliance. Third-party certifications and standardized eco-labels help navigate regulatory complexity while building consumer trust through independent validation.`,
        embeds: [],
        images: [],
      },
      {
        heading: "Looking Ahead: The Next Decade",
        content: `The future of sustainable marketing will likely see even greater integration of environmental considerations into all aspects of brand strategy. As climate change impacts become more pronounced, consumer expectations for corporate responsibility will intensify.

Emerging technologies like artificial intelligence and machine learning will enable more sophisticated personalization of sustainable messaging, matching environmental appeals to individual values and preferences. However, this personalization must respect privacy concerns and avoid manipulative practices.

The brands that thrive will be those that view sustainability not as a marketing challenge but as a business opportunity. They'll innovate products, reimagine business models, and create entirely new categories that make sustainable living easier, more affordable, and more desirable.

Ultimately, the most successful sustainable marketing won't feel like marketing at all—it will simply be how responsible businesses operate, communicate, and create value in a world that demands better from the companies that shape our future.`,
        embeds: [],
        images: ["/assets/choose1.avif"],
      },
    ],
  };

  const blog = await prisma.blog.upsert({
    where: { slug: "sustainable-marketing-future" },
    update: {
      content: JSON.stringify(blogContent),
    },
    create: {
      title: "The Complete Guide to Sustainable Marketing in 2026",
      slug: "sustainable-marketing-future",
      description:
        "Explore how modern brands are reshaping their marketing strategies to align with environmental values and consumer expectations. A comprehensive deep dive into the future of conscious commerce.",
      coverImage: "/assets/choose1.avif",
      content: JSON.stringify(blogContent),
      tags: [
        "Sustainability",
        "Marketing",
        "Brand Strategy",
        "Green Business",
        "Digital Innovation",
        "Consumer Psychology",
      ],
      published: true,
      categoryId: category.id,
    },
  });

  console.log("Created blog:", blog);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
