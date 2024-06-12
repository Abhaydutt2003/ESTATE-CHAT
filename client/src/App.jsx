import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Layout,HomePage,ListPage} from './pages';


const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout></Layout>,
    children:[
      {
        path:'/',
        element:<HomePage></HomePage>
      },
      {
        path:'/list',
        element:<ListPage></ListPage>
      }
    ]
  }
]);

function App() {
  return(
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
