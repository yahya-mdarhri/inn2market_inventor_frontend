
import './Home.css'

const Home = () => {
  return (
    <div className='flex flex-col w-screen h-screen flex items-center justify-center bg-gray-900 text-white'>
      
      <img src="/logo.svg" className='w-[30em] h-[30em]' />
      <h1 className='font-[Roboto] text-7xl'>welcome to the inventor Platform</h1>
      <p className='text-center text-gray-400 mt-4'>
        This platform is designed to help you manage your inventions, patents, and innovation projects efficiently.
        Explore the features and start your journey towards innovation today!
      </p>
      <div className='mt-8'>
        <a href="/login" className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Get Started
        </a>
        </div>
    </div>
  )
}

export default Home

