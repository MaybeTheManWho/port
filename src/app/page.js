import Hero from '@/components/home/Hero'
import Featured from '@/components/home/Featured'
import { getAllProjects } from '@/lib/api' // Assuming you have this function
import PageTransition from '@/components/layout/PageTransition'

export default function Home() {
  // You can fetch data here or pass mock data
  const projects = []; // Replace with actual data loading when ready
  
  return (
    <PageTransition>
      <Hero />
      <Featured projects={projects} />
    </PageTransition>
  )
}