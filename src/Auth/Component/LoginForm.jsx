/* eslint-disable react/prop-types */
import iSmartImg from "../assets/Web_Photo_Editor.jpg"
const LoginForm=(props)=>{
    return(
        <>
          {/* This is Main Div  */}

        <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Part: Image Section (Hidden on Small Screens) */}
              <div className="w-full lg:w-1/2 h-64 lg:h-auto flex items-center justify-center bg-gray-200">
                        <img
                        src={iSmartImg}
                        alt="Login"
                        className="w-full h-full object-cover"
                        />
              </div>

      {/* Right Part: Login Form */}



      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-sm text-center">
                <h2 className="text-2xl font-semibold mb-6">{props.heading}</h2>
                  <form className="space-y-4">
                      <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
                      >
                      Login
                      </button>
                  </form>
            </div>
      </div>
    </div>
        </>
    )
}
export default LoginForm