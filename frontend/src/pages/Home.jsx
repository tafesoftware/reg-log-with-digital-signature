export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-blue-700 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Digital Signature Webapp</h1>
          <p className="text-blue-200 text-lg">
            Secure digital signing platform for college students
          </p>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            This web application allows college students to create, store, and manage
            their digital signatures securely. Whether you need to sign documents,
            approve forms, or authenticate your identity, our platform provides a
            simple and reliable solution.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-5 rounded-lg text-center">
              <div className="text-3xl mb-2">✍️</div>
              <h3 className="font-semibold text-gray-800">Create Signature</h3>
              <p className="text-gray-600 text-sm mt-1">
                Draw your signature using mouse or touch on our signature pad.
              </p>
            </div>
            <div className="bg-blue-50 p-5 rounded-lg text-center">
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-gray-800">Secure Storage</h3>
              <p className="text-gray-600 text-sm mt-1">
                Signatures are stored securely and only accessible by you.
              </p>
            </div>
            <div className="bg-blue-50 p-5 rounded-lg text-center">
              <div className="text-3xl mb-2">📋</div>
              <h3 className="font-semibold text-gray-800">Easy Access</h3>
              <p className="text-gray-600 text-sm mt-1">
                Access your signature anytime from your personalized dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
