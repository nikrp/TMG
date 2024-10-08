import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { BsArrowLeft } from "react-icons/bs";
import { LuType } from "react-icons/lu";
import { PiTextAa } from "react-icons/pi";
import { MdAlternateEmail } from "react-icons/md";
import { PiPasswordLight } from "react-icons/pi";

export default function Register() {
    const navigate = useNavigate();

    return (
        <div data-theme="dark" className={`flex-1 bg-base-300`}>
            <button onClick={() => navigate('/', { replace: true })} className={`fixed top-5 left-5 px-5 py-1 text-lg rounded-md bg-base-200 border border-neutral flex items-center gap-2 text-white hover:bg-neutral transition-all ease-in-out duration-200`}><BsArrowLeft size={18} color='white' />Back</button>
            <div className={`flex min-h-screen`}>
                <div className={`w-1/2 min-h-screen max-h-screen flex flex-col justify-center items-center`}>
                    <div className={`flex flex-col w-3/4 h-[70%] max-h-full`}>
                        <h1 className={`font-bold text-2xl text-white mb-5`}>Join the Curve Today!</h1>
                        <div className={`w-full flex items-center gap-2 mb-2`}>
                            <div className={`w-1/2 flex flex-col gap-1`}>
                                <p className={`text-base`}>First Name</p>
                                <div className={`relative`}>
                                    <LuType size={20} className={`absolute inset-2.5 text-base-content`} />
                                    <input type='text' className={`w-full px-4 pl-9 py-2 rounded-md border border-neutral bg-base-200 focus:outline-none focus:border-gray-300`} />
                                </div>
                            </div>
                            <div className={`w-1/2 flex flex-col gap-1`}>
                                <p className={`text-base`}>Last Name</p>
                                <div className={`relative`}>
                                    <LuType size={20} className={`absolute inset-2.5 text-base-content`} />
                                    <input type='text' className={`w-full px-4 pl-9 py-2 rounded-md border border-neutral bg-base-200 focus:outline-none focus:border-gray-300`} />
                                </div>
                            </div>
                        </div>
                        <div className={`w-full flex items-center gap-2 mb-2`}>
                            <div className={`w-full flex flex-col gap-1`}>
                                <p className={`text-base`}>Username</p>
                                <div className={`relative`}>
                                    <PiTextAa size={20} className={`absolute inset-2.5 text-base-content`} />
                                    <input type='text' className={`w-full px-4 pl-9 py-2 rounded-md border border-neutral bg-base-200 focus:outline-none focus:border-gray-300`} />
                                </div>
                            </div>
                        </div>
                        <div className={`w-full flex items-center gap-2 mb-2`}>
                            <div className={`w-full flex flex-col gap-1`}>
                                <p className={`text-base`}>Email</p>
                                <div className={`relative`}>
                                    <MdAlternateEmail size={20} className={`absolute inset-2.5 text-base-content`} />
                                    <input type='email' className={`w-full px-4 pl-9 py-2 rounded-md border border-neutral bg-base-200 focus:outline-none focus:border-gray-300`} />
                                </div>
                            </div>
                        </div>
                        <div className={`w-full flex items-center gap-2 mb-4`}>
                            <div className={`w-full flex flex-col gap-1`}>
                                <p className={`text-base`}>Password</p>
                                <div className={`relative`}>
                                    <PiPasswordLight size={20} className={`absolute inset-2.5 text-base-content`} />
                                    <input type='Password' className={`w-full px-4 pl-9 py-2 rounded-md border border-neutral bg-base-200 focus:outline-none focus:border-gray-300`} />
                                </div>
                            </div>
                        </div>
                        <button className={`w-full bg-emerald-500 text-black px-4 py-2 hover:bg-opacity-75 transition-all duration-200 ease-in-out rounded-md`}>Register</button>
                        <div className={`h-px bg-gray-400 rounded-full w-full my-4`}></div>
                        {/* Add google OAuth button Here */}
                    </div>
                </div>
                <div className={`w-1/2 min-h-screen max-h-screen`}></div>
            </div>
        </div>
    )
}