import { Navigate, useRoutes } from 'react-router-dom';
import { ChatPage } from './Elements';

export default function Admin() {
   return useRoutes([
      { path: '/', element: <Navigate to="/chat" replace /> },
      {
         path: '/chat',
         element: <ChatPage />,
      },
      { path: '*', element: <Navigate to="/chat" replace /> },
   ]);
}
