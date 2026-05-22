export default function Location() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Location</h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          Our digital services are available online from anywhere, but our
          administrative office is located at the university campus.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Campus Address
          </h2>
          <p className="text-gray-600 leading-relaxed">
            University Main Campus
            <br />
            College of Computer Science
            <br />
            123 University Avenue
            <br />
            Academic City, 110001
            <br />
            India
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mt-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Office Hours
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Monday - Friday: 9:00 AM - 5:00 PM
            <br />
            Saturday: 10:00 AM - 2:00 PM
            <br />
            Sunday: Closed
          </p>
        </div>
      </div>
    </div>
  );
}
