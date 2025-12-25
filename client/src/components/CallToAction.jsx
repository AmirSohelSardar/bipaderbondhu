import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl my-4 max-w-4xl mx-auto group hover:shadow-2xl transition-all duration-500'>
      {/* Animated gradient border effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl'></div>
      
      {/* Floating particles animation */}
      <div className='absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-50'></div>
      <div className='absolute top-20 right-20 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-50' style={{animationDelay: '1s'}}></div>
      <div className='absolute bottom-10 left-20 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-50' style={{animationDelay: '2s'}}></div>
      
      <div className='relative flex flex-col-reverse lg:flex-row items-center gap-6 p-6 lg:p-8 bg-gradient-to-br from-transparent via-purple-50/30 to-pink-50/30 dark:via-purple-900/10 dark:to-pink-900/10'>
        {/* Image Section with 3D effect */}
        <div className='flex-shrink-0 perspective-1000'>
          <div className='relative group/img'>
            {/* Rotating gradient ring */}
            <div className='absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full opacity-75 blur group-hover/img:opacity-100 animate-spin-slow'></div>
            
            {/* Pulse effect */}
            <div className='absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 animate-pulse'></div>
            
            <img
              className='relative w-32 h-32 lg:w-36 lg:h-36 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-2xl transform transition-all duration-500 group-hover/img:scale-110 group-hover/img:rotate-6'
              src='/images/profile.png'
              alt='Bipader Bondhu'
            />
            
            {/* Heart beat indicator */}
            {/* <div className='absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg animate-pulse'>
              <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
              </svg>
            </div> */}
          </div>
        </div>

        {/* Content Section */}
        <div className='flex-1 space-y-4 text-center lg:text-left'>
          <div className='space-y-2'>
            <div className='inline-block animate-bounce'>
              <span className='inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-xs font-semibold text-purple-700 dark:text-purple-300'>
                <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                Actively Serving
              </span>
            </div>
            
            <h2 className='text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight'>
              Join Our Mission of
              <span className='block bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mt-1 bg-[length:200%_auto] animate-gradient'>
                Hope & Humanity
              </span>
            </h2>
            <p className='text-sm text-gray-600 dark:text-gray-300 leading-relaxed'>
              Discover our impactful initiatives in social welfare, emergency relief, and community empowerment.
            </p>
          </div>

          {/* Animated Stats Cards */}
          <div className='flex flex-wrap justify-center lg:justify-start gap-3 py-2'>
            <div className='group/card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 px-4 py-2 rounded-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-purple-200 dark:border-purple-700'>
              <div className='text-lg font-bold text-purple-600 dark:text-purple-400 group-hover/card:scale-110 transition-transform'>2500+</div>
              <div className='text-xs text-purple-700 dark:text-purple-300'>Blood Donors</div>
            </div>
            
            <div className='group/card bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 px-4 py-2 rounded-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-pink-200 dark:border-pink-700'>
              <div className='text-lg font-bold text-pink-600 dark:text-pink-400 group-hover/card:scale-110 transition-transform'>300+</div>
              <div className='text-xs text-pink-700 dark:text-pink-300'>Financial Aid</div>
            </div>
            
            {/* <div className='group/card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 px-4 py-2 rounded-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-purple-200 dark:border-purple-700'>
              <div className='text-lg font-bold text-purple-600 dark:text-purple-400 group-hover/card:scale-110 transition-transform'>50+</div>
              <div className='text-xs text-purple-700 dark:text-purple-300'>Projects</div>
            </div> */}
            
            <div className='group/card bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/30 dark:to-pink-800/30 px-4 py-2 rounded-xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-pink-200 dark:border-pink-700'>
              <div className='text-lg font-bold text-pink-600 dark:text-pink-400 group-hover/card:scale-110 transition-transform'>24/7</div>
              <div className='text-xs text-pink-700 dark:text-pink-300'>Support</div>
            </div>
          </div>

          {/* Animated CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 justify-center lg:justify-start'>
            <a href='/search' className='group/btn relative overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300'></div>
              <Button 
                gradientDuoTone='purpleToPink' 
                size='sm'
                className='relative w-full sm:w-auto hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl'
              >
                <span className='flex items-center gap-2 text-sm font-semibold'>
                  Discover Our Impact
                  <svg className='w-4 h-4 transform group-hover/btn:translate-x-2 group-hover/btn:scale-125 transition-all duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M13 7l5 5m0 0l-5 5m5-5H6' />
                  </svg>
                </span>
              </Button>
            </a>
            
            <a href='/about' className='group/btn2'>
              <Button 
                color='light'
                size='sm'
                className='w-full sm:w-auto border-2 border-purple-500 dark:border-purple-400 bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 hover:!bg-purple-600 hover:!text-white dark:hover:!bg-purple-500 hover:border-purple-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg font-bold'
              >
                <span className='text-sm font-semibold flex items-center gap-2'>
                  Learn Our Story
                  <svg className='w-4 h-4 transform group-hover/btn2:rotate-12 transition-transform duration-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                  </svg>
                </span>
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}