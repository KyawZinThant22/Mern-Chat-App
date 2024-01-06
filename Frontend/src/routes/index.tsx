import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { useEffect, useState } from 'react';

import Admin from './Admin';
import UnAuth from './unAuth';
import { setUnAuth } from '../store/reducers/auth';
import axios from 'axios';
import { HomePage } from './Elements';


export default function Routes() {
   const dispatch = useDispatch();
   const auth = useAppSelector((state: RootState) => state.auth);
   const [loading, setLoading] = useState<boolean>(false);

   const cookieToken = localStorage.getItem('token');



   const checkAuth = async (token: any) => {
    console.log("valid token " , token)
      try {
         const response = await axios.get('http://localhost:8080/api/user/me', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         console.log(response.data);
      } catch (error) {
         console.error(error);
      }
   };
   

   useEffect(() => {
      if (cookieToken !== null) {
         checkAuth(cookieToken);
      } else if (auth.authSuccess === false && cookieToken !== null) {
         dispatch(setUnAuth());
         setLoading(false);
      } else {
         dispatch(setUnAuth());
         setLoading(false);
      }
   }, [cookieToken]);

   if (loading) return <h1>loading</h1>;

   return <HomePage/>
}
