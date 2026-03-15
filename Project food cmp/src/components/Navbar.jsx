import home from './assets/home.png';
import home_activated from './assets/home_activated.png';
import about_activated from './assets/information_activated.png';
import logo from '/images/logo.png';
import Category from './assets/category.png';
import Category_activated from './assets/category_activated.png';
import about from './assets/information.png';

const Navbar = ({page,setPage}) => {
    return(
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 text-black w-20 h-screen flex flex-col shadow-lg">
            {/* Logo */}
            <div className="flex flex-col items-center justify-center h-20 mt-10 p-3">
           <img src={logo} alt="home" className='h-15 w-15 ' />
           <p className='text-orange-400 font-bold'>CraveX</p>
           </div>
           
           <div className="flex flex-col items-center justify-center h-screen">
            {/* Dashboard */}
            <div className="flex flex-row w-full mb-5">
           <div className="flex flex-col w-full items-center justify-center h-20 " onClick={() => setPage("home")}>
           <img src={page==="home" ? home_activated:home} alt="home" className='h-7 w-7' />
            <p className={`mt-1.5 transition duration-300 ${
               page === "home"
               ? "text-orange-400"
               : "" }`}>Home</p>
               </div>
              <div className={` h-full w-1 bg-amber-500 transition duration-300 ${
               page === "home"
               ? ""
               : "hidden" }`}/>

           </div>

             {/* Browse */}
             <div className="flex flex-row w-full mb-5">
           <div className="flex flex-col w-full items-center justify-center h-20 " onClick={() => setPage("browse")}>
           <img src={page==="browse"? Category_activated:Category} alt="home" className='h-7 w-7'/>
            <p className={`mt-1.5 transition duration-300 ${
               page === "browse"
               ? "text-orange-400"
               : "" }`}>Browse</p>
               </div>
              <div className={` h-full w-1 bg-amber-500 transition duration-300 ${
               page === "browse"
               ? ""
               : "hidden" }`}/>

           </div>
            {/* About */}
            <div className="flex flex-row w-full mb-5">
           <div className="flex flex-col w-full items-center justify-center h-20 " onClick={() => setPage("about")}>
           <img src={page==="about"? about_activated:about} alt="home" className='h-7 w-7' />
            <p className={`mt-1.5 transition duration-300 ${
               page === "about"
               ? "text-orange-400"
               : "" }`}>About</p>
               </div>
              <div className={` h-full w-1 bg-amber-500 transition duration-300 ${
               page === "about"
               ? ""
               : "hidden" }`}/>

           </div>



           
           </div>
    </div>
    )
}
export default Navbar;
