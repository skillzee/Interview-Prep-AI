import { isAuthenticated } from '@/lib/actions/auth.action';
import React, { ReactNode } from 'react'

const AuthLayout = async ({children} : {children: ReactNode}) => {
    const isUserAuthenticated = await isAuthenticated();
  
    if(isUserAuthenticated) return('/');
  return (
    <div className='auth-layout'>{children}</div>
  )
}

export default AuthLayout