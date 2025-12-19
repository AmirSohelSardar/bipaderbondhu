import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex border border-teal-500 p-3 justify-center items-center rounded-tl-3xl rounded-br-3xl flex-col sm:flex-row text-center'>
  <div className='flex-1 justify-center flex flex-col'>
    <h2 className='text-2xl'>
      Explore BipaderBondhu: Serving Humanity with Compassion
    </h2>
    <p className='text-gray-500 my-2'>
      Follow our journey as we work for social welfare, disaster relief, and community support, sharing our initiatives, impact, and commitment to helping those in need.
    </p>
    <a href='/search'>
  <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none rounded-br-xl w-full'>
    Explore BipaderBondhu
  </Button>
</a>
  </div>
  <div className='flex-1 p-4 flex justify-center'>
  <img
  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-full shadow-lg transition duration-300 hover:scale-105"
  src="/images/profile.png"
  alt="Bipader Bondhu"
/>


</div>

</div>

  );
}
