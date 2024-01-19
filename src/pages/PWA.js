import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthContext'

export default function PWA() {

    const {getCurrentUser} = useAuth();
    const navigate = useNavigate()

    async function initPWA(){
        if(await getCurrentUser()){
            navigate("/home")
        }else{
            navigate("/")
        }
    }

    useEffect(() => {
        initPWA()
    },[])

  return (
    <Loading />
  )
}
