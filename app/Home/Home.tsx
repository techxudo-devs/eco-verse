import CardsFlipScrollAnimation from '@/components/home/CardsFlipScrollAnimation'
import Expertise from '@/components/home/Expertise'
import Hero from '@/components/home/Hero'
import Navbar from '@/components/home/Navbar'

const page = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            {/* <CardsFlipScrollAnimation /> */}
            <Expertise />
        </div>
    )
}

export default page
