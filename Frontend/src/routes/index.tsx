import { useDispatch } from 'react-redux';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store';
import { useEffect, useState } from 'react';

import Admin from './Admin';
import UnAuth from './unAuth';
import { setAuthUser, setUnAuth } from '../store/reducers/auth';
import axios from 'axios';



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
         if (response.data.success){
            dispatch(setAuthUser({
               user : {
                  id : response.data.data._id,
                  name : response.data.data.name,
                  email : response.data.data.email,
                  pic : response.data.data.pic,
               },
               token : cookieToken || "",
            }))
            setLoading(false)
         }
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

   if (loading) return <h1 className='text-[20rem]' >loading</h1>;

   return auth.authSuccess && auth.user?.id ? < Admin/> : <UnAuth/>
}
