import React from 'react'

const TestComponent = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Test Component
          </div>
          <p className="mt-2 text-gray-500">
            If you can see this with proper styling, Tailwind CSS is working correctly!
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Test Button
          </button>
        </div>
      </div>
    </div>
  )
}

export default TestComponent