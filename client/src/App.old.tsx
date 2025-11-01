import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './layouts/MainLayout';
import Home from './components/Home';
import PostList from './components/Blog';
import Post from './components/Post';
import Bookmarks from './components/Bookmarks';
import Snippets from './components/Snippets';
import Snippet from './components/Snippet';
import ContactForm from './components/Contact';
import NotFound from './components/NotFound';
import BlogLayout from './layouts/blog/BlogLayout';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<BlogLayout />}>
					<Route path="/posts" element={<PostList />} />
					<Route path="/post/:slug" element={<Post />} />
					<Route path="/snippets" element={<Snippets />} />
					<Route path="/snippet/:slug" element={<Snippet />} />
					<Route path="/favoritos" element={<Bookmarks />} />
				</Route>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/contato" element={<ContactForm />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
