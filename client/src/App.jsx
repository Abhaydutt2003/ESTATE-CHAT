import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Layout,HomePage,ListPage,SinglePage} from './pages';


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
      },
      {
        path:'/:id',
        element:<SinglePage></SinglePage>
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
