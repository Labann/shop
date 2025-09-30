import Hero from "./components/Hero";
import Featured from "./components/Featured";
import Categories from "./components/Categories";
import Products from "./components/Products";
import NewArrivals from "./components/NewArrivals";
import Features from "./components/Features";
import Footer from "./components/Footer"
export default function Home() {
  return (
    <>
      <Hero/>
      <Featured/>
      <Categories/>
      <Products/>
      {/*<NewArrivals/>*/}
      <Features/>
      <Footer/>
    </>
  )
}
