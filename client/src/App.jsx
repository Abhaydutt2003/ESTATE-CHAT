import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Layout,HomePage,ListPage,SinglePage,Profile,Register,Login,RequireAuth} from './pages';


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
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
    ]
  },{
    path:'/',
    element:<RequireAuth></RequireAuth>,
    children:[
      {
        path:'/profile',
        element:<Profile></Profile>,
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
