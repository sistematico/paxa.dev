// import { useParams } from 'react-router';

// function Blog() {
// 	const { slug } = useParams();

// 	return <h1>Blog {slug}</h1>;
// }

// export default Blog;


import { useState, useEffect } from 'react'
import { Link } from 'react-router'

interface Post {
	slug: string;
	title: string;
}

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch from the Hono API endpoint
        const response = await fetch(`http://localhost:3000/api/posts`); 
        console.log('Fetched posts response:', response)
        const data = await response.json();
        setPosts(data.posts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>
	if (!posts || posts.length === 0) return <div>No posts available.</div>

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            {/* Link to the individual post page */}
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;

