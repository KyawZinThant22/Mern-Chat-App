import { Suspense, lazy, ElementType } from 'react';



const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<h1>Loading....</h1>}>
      <Component {...props} />
    </Suspense>
  );


  //home page 

  export const HomePage = Loadable(lazy(()=>import("../pages/HomePage")))
  export const ChatPage = Loadable(lazy(()=>import("../pages/ChatPage")))
