export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          The Digital Signature Webapp is designed specifically for college
          students to simplify document signing and identity verification.
          Our mission is to replace traditional pen-and-paper signatures with a
          secure, digital alternative that can be used anytime, anywhere.
        </p>
        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
          Our Mission
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          We aim to provide every college student with a reliable digital
          signature solution that is easy to use, secure, and accessible from
          any device. By digitizing signatures, we reduce paperwork, save time,
          and help protect the environment.
        </p>
        <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
          Why Choose Us?
        </h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Secure storage with encrypted data transmission</li>
          <li>User-friendly signature pad supporting mouse and touch</li>
          <li>Personal dashboard to manage your profile and signature</li>
          <li>24/7 availability from any device with internet access</li>
          <li>Designed exclusively for college students and institutions</li>
        </ul>
      </div>
    </div>
  );
}
