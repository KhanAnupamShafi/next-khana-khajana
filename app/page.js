import Aside from "@/components/home/landing/Aside";
import Featured from "@/components/home/landing/Featured";
import Hero from "@/components/home/landing/Hero";
import Loader from "@/components/spinner/Loader";
import { getAllRecipes } from "@/db/queries";
import { Suspense } from "react";

export default async function Home() {
  const recipes = await getAllRecipes();
  return (
    <main>
      <section className='container'>
        <Hero />
      </section>
      <section className='container py-8'>
        <div className='grid grid-cols-12 py-4'>
          <Aside />
          <Suspense fallback={<Loader />}>
            <Featured recipes={recipes} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
