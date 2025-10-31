import { useParams } from 'react-router';

function Blog() {
	const { slug } = useParams();

	return <h1>Blog {slug}</h1>;
}

export default Blog;
