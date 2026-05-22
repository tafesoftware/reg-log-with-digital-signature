export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          Have questions or need assistance? Reach out to us through any of
          the following channels. We are here to help you.
        </p>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Email</h2>
            <p className="text-gray-600">
              support@digitalsignature.edu
              <br />
              admissions@digitalsignature.edu
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Phone</h2>
            <p className="text-gray-600">
              +91 12345 67890
              <br />
              +91 98765 43210
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Address
            </h2>
            <p className="text-gray-600">
              College of Computer Science
              <br />
              123 University Avenue
              <br />
              Academic City, 110001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
