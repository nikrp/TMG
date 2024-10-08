import { supabase } from '../utils/supabase';
import { BsArrowLeft } from "react-icons/bs";

export default function Register() {
    return (
        <div data-theme="dark" className={`flex-1 bg-base-300 p-10`}>
            <button className={`fixed top-5 left-5 px-4 py-1 text-lg rounded-md bg-emerald-500 bg-opacity-35 border border-emerald-500 flex items-center gap-2 text-white hover:bg-opacity-50 transition-all ease-in-out duration-200`}><BsArrowLeft size={18} color='white' />Back</button>
            <div className={`flex `}></div>
        </div>
    )
}