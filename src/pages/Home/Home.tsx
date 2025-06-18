import { FlipWordsDemo } from '../../components/ui/Flipwords'
import './Home.css'

const Home = () => {
  return (
    <div className=' page'>
      <video
        autoPlay
        loop
        muted
        playsInline
        className='fixed top-0 left-0 w-screen h-screen object-cover z-0 overflow-hidden'
      >
        <source src="/video.mp4" type="video/mp4" />
        <source src="/video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className='fixed top-0 left-0  z-10 flex flex-col items-center justify-center w-screen h-screen bg-black/50  p-8  shadow-2xl text-center'>
        <img src="/logo.svg" className='w-[30em] h-[30em]' />
        <FlipWordsDemo  />
        <p className='text-center text-gray-200 mt-4 px-4 font-medium'>
          This platform is designed to help you manage your inventions, patents, and innovation projects efficiently.
          Explore the features and start your journey towards innovation today!
        </p>
        <div className='mt-8'>
          <a href="/login" className='bg-blue-900 hover:bg-blue-700  font-bold py-2 px-4 rounded shadow-lg text-[#D1D703] transition-colors duration-300 font-[Roboto]'>
            Get Started
          </a>
        </div>
      </div>
    </div>
  )
}

export default Home