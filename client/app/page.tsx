"use client"
import Hero from "./components/Hero";
import Featured from "./components/Featured";
import Categories from "./components/Categories";
import Products from "./components/Products";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/redux";
import { getMe } from "./store/authSlice";

export default function Home() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(token){
      dispatch(getMe())
    }
  }, [token, dispatch])
  return (
    <>
      <Hero/>
      <Featured/>
      <Categories/>
      
      {/*<NewArrivals/>*/}
      {/*Featured*/}
      <Products/>
      
      
    </>
  )
}
