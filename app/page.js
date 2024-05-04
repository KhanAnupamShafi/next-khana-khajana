import Aside from "@/components/home/landing/Aside";
import Featured from "@/components/home/landing/Featured";
import Hero from "@/components/home/landing/Hero";
import { getAllRecipes } from "@/db/queries";

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
          <Featured recipes={recipes} />
        </div>
      </section>
    </main>
  );
}
