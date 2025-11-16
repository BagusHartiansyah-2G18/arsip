// import Footer from "@/components/landing/Footer";
// import LformIklan from "@/components/landing/iklanForm";
// import Testimonial from "@/components/landing/Testimonial";
import Link from "next/link";
 
export default function Home() {
  return (
    <>
    <div className="gradient-bg min-h-screen overflow-x-hidden relative">
      {/* Animated background shapes */}
      <div className="shape-blob one"></div>
      <div className="shape-blob two"></div>
      <div className="shape-blob"></div>

      {/* Main content */}
      <div className="container px-4 py-16 relative z-10">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-4xl font-bold text-white pulse">
            SI<span className="text-blue-200">ARSIP</span>
          </h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {/* {["Home", "Work", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white hover:text-blue-200 transition duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))} */}
            </ul>
          </nav>
        </header>

        <section className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Selamat Datang  
              <br />
              Sistem Informasi Arsip 
            </h2>
            <p className="text-gray-200 text-lg">
              sistem yang modern, terintegrasi, dan berbasis teknologi untuk mengubah cara mengelola arsip. 
            </p>
            <div className="flex space-x-4">
              <Link href={"/login"} className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300 transform hover:scale-105">
                Login
              </Link>
              <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300 transform hover:scale-105">
                Contact Me
              </button>
            </div>

            <div className="flex items-center space-x-6 pt-8">
              {["twitter", "linkedin", "github"].map((platform, index) => (
                <div
                  key={index}
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center rotate hover:scale-110 transition duration-300"
                >
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    dangerouslySetInnerHTML={{ __html: getIcon(platform) }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative mx-auto lg:mx-0">
                <img
                  src="/info.png"
                  alt="AcodeMaster"
                  className="w-full h-full object-cover"
                />
              <div
                className="absolute inset-0 bg-blue-600 rounded-full opacity-20 rotate"
                style={{ animationDuration: "20s" }}
              ></div>
              <div
                className="absolute inset-4 bg-yellow-500 rounded-full opacity-20 rotate"
                style={{ animationDuration: "25s", animationDirection: "reverse" }}
              ></div>
              {/* <div
                className="absolute inset-8 bg-white rounded-full overflow-hidden border-4 border-white shadow-xl floating"
                style={{ animationDuration: "5s" }}
              >
                <img
                  src="/info.png"
                  alt="AcodeMaster"
                  className="w-full h-full object-cover"
                />
              </div> */}
            </div>

            {/* Decorative animated elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 bg-yellow-300 rounded-full opacity-30 floating" style={{ animationDuration: "7s" }}></div>
            <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-pink-300 rounded-full opacity-30 floating" style={{ animationDuration: "8s" }}></div>
            <div className="absolute top-1/2 -right-12 w-12 h-12 bg-green-300 rounded-full opacity-30 floating" style={{ animationDuration: "6s" }}></div>
          </div>
        </section>

        
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: "20%", left: "10%", size: "w-2 h-2", color: "bg-white", duration: "8s" },
          { top: "80%", left: "20%", size: "w-3 h-3", color: "bg-blue-200", duration: "12s", reverse: true },
          { top: "60%", left: "80%", size: "w-4 h-4", color: "bg-pink-200", duration: "10s" },
          { top: "30%", left: "70%", size: "w-2 h-2", color: "bg-yellow-200", duration: "15s", reverse: true },
          { top: "50%", left: "40%", size: "w-3 h-3", color: "bg-green-200", duration: "9s" },
        ].map((p, i) => (
          <div
            key={i}
            className={`absolute ${p.size} ${p.color} rounded-full opacity-20`}
            style={{
              top: p.top,
              left: p.left,
              animation: `float ${p.duration} infinite linear${p.reverse ? " reverse" : ""}`,
            }}
          ></div>
        ))}
      </div>
    </div> 
    {/* <LformIklan/>
    <Footer/> */}
    </>
  );
}

function getIcon(platform:string) {
  switch (platform) {
    case "twitter":
      return `<path d="M24 4.557c..."/>`;
    case "linkedin":
      return `<path d="M12 0c..."/>`;
    case "github":
      return `<path d="M12 0c..."/>`;
    default:
      return "";
  }
}
