import Image from "next/image";

export default function AppDownloadSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Download Our App
            </h2>
            <h3 className="text-2xl text-gray-600 mb-4">
              Book and manage services on the go with our mobile app
            </h3>
            <p className="text-lg text-gray-500 mb-6">
              Experience seamless service booking with our feature-rich mobile application
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center">
                {/* <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3v18h18V3H3zm10.71 14.28c-.19.2-.45.31-.73.31-.27 0-.52-.11-.71-.29-.19-.19-.3-.44-.3-.71 0-.28.11-.53.3-.72.19-.19.44-.3.71-.3.28 0 .54.11.73.3.19.19.3.45.3.73 0 .27-.11.52-.3.7zm-5.6-5.51L12 8.32l3.89 6.45H8.11zm5.92-4.57c-.17-.26-.39-.46-.66-.6-.27-.14-.57-.21-.89-.21-.32 0-.62.07-.89.21-.27.14-.49.34-.66.6L7.42 15h9.16l-3.15-5.28z"/>
                </svg> */}
                <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50"
                style={{fill: "#ffffff"}}>
                <path d="M 7.125 2 L 28.78125 23.5 L 34.71875 17.5625 L 8.46875 2.40625 C 8.03125 2.152344 7.5625 2.011719 7.125 2 Z M 5.3125 3 C 5.117188 3.347656 5 3.757813 5 4.21875 L 5 46 C 5 46.335938 5.070313 46.636719 5.1875 46.90625 L 27.34375 24.90625 Z M 36.53125 18.59375 L 30.1875 24.90625 L 36.53125 31.1875 L 44.28125 26.75 C 45.382813 26.113281 45.539063 25.304688 45.53125 24.875 C 45.519531 24.164063 45.070313 23.5 44.3125 23.09375 C 43.652344 22.738281 38.75 19.882813 36.53125 18.59375 Z M 28.78125 26.3125 L 6.9375 47.96875 C 7.300781 47.949219 7.695313 47.871094 8.0625 47.65625 C 8.917969 47.160156 26.21875 37.15625 26.21875 37.15625 L 34.75 32.25 Z"></path>
                </svg>
                <div className="text-left">
                  <span className="text-xs">Download on the</span>
                  <div className="font-semibold">Google Play</div>
                </div>
              </button>
              
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center">
                <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" style={{fill: "#ffffff"}}>
                  <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                  </svg>
                <div className="text-left">
                  <span className="text-xs">Download on the</span>
                  <div className="font-semibold">App Store</div>
                </div>
              </button>
            </div>
          </div>

          {/* App Preview Image with Phone Frame */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gray-900 rounded-[40px] shadow-2xl transform rotate-1" />
              <Image
                src="/app-preview.webp"
                width={320}
                height={650}
                alt="App preview"
                className="relative z-10 rounded-[32px] border-8 border-gray-900"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
