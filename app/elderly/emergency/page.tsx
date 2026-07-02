'use client';

export default function ElderlyEmergencyPage() {
  return (
    <div className="min-h-screen bg-red-50">
      {/* Large Red Warning Banner */}
      <div className="bg-red-600 py-10 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="text-5xl">⚠️</span>
            <h1 className="text-5xl font-bold text-white">I AM LOST</h1>
            <span className="text-5xl">⚠️</span>
          </div>
          <p className="text-xl text-red-100 mt-3">Please help me contact my family</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Personal Information Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Photo Section */}
          <div className="bg-gray-50 p-8 flex flex-col items-center border-b border-gray-100">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow mb-3">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">Photo of Elderly Person</p>
          </div>

          {/* Information Grid */}
          <div className="p-6 space-y-4">
            {/* Name */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="text-xl font-bold text-gray-900">Suti</p>
              </div>
            </div>

            {/* Age */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Age</p>
                <p className="text-xl font-bold text-gray-900">69 Years</p>
              </div>
            </div>

            {/* Home Address */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Home Address</p>
                <p className="text-xl font-bold text-gray-900">Jl. Sukarno No.70</p>
              </div>
            </div>

            {/* Family Contact */}
            <div className="bg-red-50 rounded-lg p-4 flex items-center gap-4 border border-red-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Family Contact</p>
                <p className="text-xl font-bold text-red-600">0812-3456-7890</p>
              </div>
            </div>

            {/* Medical Notes */}
            <div className="bg-yellow-50 rounded-lg p-4 flex items-center gap-4 border border-yellow-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Medical Notes</p>
                <p className="text-xl font-bold text-yellow-700">Mild Dementia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call Family Button */}
        <div className="mt-6">
          <button className="w-full py-6 px-6 bg-red-600 text-white text-2xl font-bold rounded-xl shadow-lg hover:bg-red-700 transition-colors">
            <div className="flex items-center justify-center gap-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>CALL FAMILY</span>
            </div>
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            If you find this person, please press the button above to contact their family.
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Information is automatically synchronized with the SafeElder system.
          </p>
        </div>
      </div>
    </div>
  );
}
