import CallToAction from '../components/CallToAction';

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About BipaderBondhu
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
<p>
  Welcome to <strong>BipaderBondhu</strong>! BipaderBondhu is a non-profit organization established to serve humanity with compassion, responsibility, and commitment. We work to support individuals and communities affected by poverty, natural disasters, and social hardships.
</p>

<p>
  At BipaderBondhu, our focus is on humanitarian relief, social welfare initiatives, and community support programs. Through collective efforts and volunteer participation, we strive to provide timely assistance, raise awareness, and create a positive and lasting impact in society.
</p>

<p>
  BipaderBondhu represents a strong commitment to humanity — from emergency relief and welfare activities to long-term community development. It is a platform that brings people together to serve, support, and uplift those in need while promoting kindness, dignity, and social responsibility.
</p>

<p>
  <strong>Director:</strong> Tariful Mia<br />
  <strong>Email:</strong> narayanpurbipaderbondhu@gmail.com<br />
  <strong>Phone:</strong> +91 9733725202<br />
  <strong>Location:</strong> Narayan Pur, Nadia, West Bengal, India
</p>



          </div>
        </div>
        <div className='mt-10'>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}