import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './layouts/MainLayout';
import Home from './components/Home';
import Blog from './components/Blog';
import Post from './components/Post';
import NotFound from './components/NotFound';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="/posts" element={<Blog />} />
					<Route path="/post/:slug" element={<Post />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
