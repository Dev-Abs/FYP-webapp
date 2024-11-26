'use client'
export default function Hero() {

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Track and Manage Mental Well-being Through EEG
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Upload your EEG data and gain insights into stress, depression, and anxiety levels.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Upload EEG Data
              </a>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
