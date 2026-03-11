import prisma from "@/lib/prisma";
import type { BlogCreateInput, BlogUpdateInput } from "@/lib/schemas/blogSchema";

const isPrismaP1001 = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error as { code?: string }).code === "P1001";

const throwDbError = (action: string, error: unknown): never => {
  console.error(`Error ${action}:`, error);
  if (isPrismaP1001(error)) {
    throw new Error(
      "Database is not reachable. Check DATABASE_URL and make sure Postgres is running.",
    );
  }
  throw new Error(`Failed to ${action}`);
};

export const getBlogs = async () => {
  try {
    return await prisma.blog.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  } catch (error) {
    return throwDbError("fetch blogs", error);
  }
};

export const getPublishedBlogs = async (limit?: number) => {
  try {
    return await prisma.blog.findMany({
      where: {
        published: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
      ...(typeof limit === "number" ? { take: limit } : {}),
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  } catch (error) {
    return throwDbError("fetch published blogs", error);
  }
};

export const getPublishedBlogBySlug = async (slug: string) => {
  try {
    return await prisma.blog.findFirst({
      where: {
        slug,
        published: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  } catch (error) {
    return throwDbError("fetch blog by slug", error);
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    return await prisma.blog.findUnique({
      where: {
        slug,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
  } catch (error) {
    return throwDbError("fetch blog by slug", error);
  }
};

export const createBlog = async (
  input: Omit<BlogCreateInput, "categoryName"> & { categoryId: number },
) => {
  try {
    return await prisma.blog.create({
      data: input,
    });
  } catch (error) {
    return throwDbError("create blog", error);
  }
};

export const updateBlog = async (input: BlogUpdateInput) => {
  try {
    const { id, ...payload } = input;
    return await prisma.blog.update({
      where: { id },
      data: payload,
    });
  } catch (error) {
    return throwDbError("update blog", error);
  }
};

export const deleteBlog = async (id: number) => {
  try {
    return await prisma.blog.delete({
      where: { id },
    });
  } catch (error) {
    return throwDbError("delete blog", error);
  }
};
