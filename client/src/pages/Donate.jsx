import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';

export default function Donate() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-3xl mx-auto p-3'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold my-7'>
            Donate & Support Bipader Bondhu
          </h1>

          <div className='text-md text-gray-600 flex flex-col gap-6'>

            {/* MONEY DONATION */}
            <section>
              <h2 className='text-2xl font-semibold text-green-700 mb-3'>
                💚 Donate Money
              </h2>

              <p>
                Your financial support helps <strong>Bipader Bondhu</strong> provide
                emergency relief, food distribution, medical assistance, education
                support, and welfare programs for underprivileged communities.
              </p>

              <p className='italic text-gray-500'>
                “A small contribution from you can bring a big change in someone’s life.”
              </p>

              {/* BANK DETAILS */}
              <div className='mt-4 bg-gray-100 rounded-lg p-4 text-left'>
                <h3 className='font-semibold mb-2'>🏦 Bank Account Details</h3>
                <p><strong>Account Name:</strong> Narayanpur Bipader Bondhu Welfare Society</p>
                <p><strong>Account Number:</strong> 0332200100021066</p>
                <p><strong>Bank:</strong> Punjab National Bank</p>
                <p><strong>IFSC:</strong> PUNB0033220</p>
                <p><strong>Branch:</strong> Nazirpur</p>
              </div>

              {/* QR CODE */}
              <div className='mt-4 flex flex-col items-center gap-2'>
                <h3 className='font-semibold'>📱 Scan & Pay (UPI)</h3>
                <img
                  src='/images/donation-qr.png'
                  alt='Donation QR Code'
                  className='w-48 h-48 object-contain border rounded'
                />
                <p className='text-sm text-gray-500'>
                  Google Pay / PhonePe / Paytm / UPI
                </p>
              </div>
            </section>

            {/* BLOOD DONATION */}
            <section className='mt-10'>
              <h2 className='text-2xl font-semibold text-red-700 mb-3'>
                🩸 Donate Blood – Save Lives
              </h2>

              <p>
                Blood donation is one of the most noble acts of humanity.
                A single unit of blood can save up to three lives.
                <strong> Bipader Bondhu</strong> actively supports blood donation
                awareness and emergency blood support.
              </p>

              <p className='italic text-gray-500'>
                “Donate blood today, give someone a chance to live tomorrow.”
              </p>

              {/* WHO CAN DONATE */}
              <div className='mt-4 bg-red-50 rounded-lg p-4'>
                <h3 className='font-semibold mb-2'>✅ Who Can Donate Blood?</h3>
                <ul className='list-disc list-inside text-sm text-gray-700'>
                  <li>Age between 18 – 60 years</li>
                  <li>Weight above 50 kg</li>
                  <li>Physically healthy</li>
                  <li>No serious illness or infection</li>
                  <li>Minimum 3 months gap from last donation</li>
                </ul>
              </div>

              {/* BLOOD GROUP COMPATIBILITY */}
              <div className='mt-4 bg-yellow-50 rounded-lg p-4 text-left'>
                <h3 className='font-semibold mb-2'>🧬 Blood Group Compatibility</h3>

                <ul className='list-disc list-inside text-sm text-gray-700'>
                  <li><strong>O−</strong> → Can donate to all | Receives from O− only</li>
                  <li><strong>O+</strong> → Donate to O+, A+, B+, AB+ | Receives from O+, O−</li>
                  <li><strong>A−</strong> → Donate to A−, A+, AB−, AB+ | Receives from A−, O−</li>
                  <li><strong>A+</strong> → Donate to A+, AB+ | Receives from A+, A−, O+, O−</li>
                  <li><strong>B−</strong> → Donate to B−, B+, AB−, AB+ | Receives from B−, O−</li>
                  <li><strong>B+</strong> → Donate to B+, AB+ | Receives from B+, B−, O+, O−</li>
                  <li><strong>AB−</strong> → Donate to AB−, AB+ | Receives from all negative groups</li>
                  <li><strong>AB+</strong> → Donate to AB+ only | Receives from all blood groups</li>
                </ul>
              </div>

              {/* WHO CAN RECEIVE */}
              <div className='mt-4 bg-green-50 rounded-lg p-4'>
                <h3 className='font-semibold mb-2'>🩺 Who Needs Blood?</h3>
                <ul className='list-disc list-inside text-sm text-gray-700'>
                  <li>Accident victims</li>
                  <li>Pregnant women</li>
                  <li>Surgery patients</li>
                  <li>Thalassemia & anemia patients</li>
                  <li>Emergency medical cases</li>
                </ul>
              </div>

              {/* CONTACT BUTTON */}
              <div className='mt-6 text-center'>
                <Link
                  to='/contact'
                  className='inline-block px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition'
                >
                  Contact Us for Blood Donation
                </Link>
              </div>
            </section>

          </div>
        </div>

        {/* CTA */}
        <div className='mt-10'>
          <CallToAction />
        </div>
      </div>
    </div>
  );
}
