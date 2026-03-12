import { notFound } from "next/navigation";
import BlogDetailView from "@/components/dashboard/BlogDetailView";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const blogId = Number(id);

  if (Number.isNaN(blogId)) {
    notFound();
  }

  return <BlogDetailView blogId={blogId} />;
}
