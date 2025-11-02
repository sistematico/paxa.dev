import {createBrowserRouter, RouterProvider, Outlet} from 'react-router';
import Layout from './layouts/MainLayout';
import Home from './components/Home';
import PostList from './components/Blog';
import Post from './components/Post';
import Bookmarks from './components/Bookmarks';
import Snippets from './components/Snippets';
import Snippet from './components/Snippet';
import ContactForm from './components/Contact';
import NotFound from './components/NotFound';
import {usePageTracking} from './hooks/usePageTracking';

// Componente wrapper que usa o hook DENTRO do Router
function RootLayout() {
  usePageTracking(); // Agora está dentro do contexto do Router!
  return <Outlet/>;
}

const router = createBrowserRouter([
  {
    element: <RootLayout/>, // Hook é chamado aqui
    children: [
      {
        path: "/",
        element: <Layout/>,
        children: [
          {index: true, element: <Home/>},
          {path: "/contato", element: <ContactForm/>},
          {path: "/posts", element: <PostList/>},
          {path: "/post/:slug", element: <Post/>},
          {path: "/snippets", element: <Snippets/>},
          {path: "/snippet/:slug", element: <Snippet/>},
          {path: "/favoritos", element: <Bookmarks/>},
          {path: "*", element: <NotFound/>},
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App;