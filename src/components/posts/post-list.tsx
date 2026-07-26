import { PostCard } from "@/components/posts/post-card";
import type { PostListItem } from "@/types/post";

export function PostList({ posts }: { posts: PostListItem[] }) {
  return (
    <div className="divide-y divide-border/40">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
