import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabase';
import { BsArrowLeft } from "react-icons/bs";
import { LuType } from "react-icons/lu";
import { PiTextAa } from "react-icons/pi";
import { MdAlternateEmail, MdEmail } from "react-icons/md";
import { PiPasswordLight } from "react-icons/pi";
import { FaQuoteLeft } from "react-icons/fa";
import { useState } from 'react';
import { TbLoader2 } from "react-icons/tb";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);

    async function register() {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
    
        if (error) {
            console.error("Error:", error.message); // Log the error message if any
        } else {
            console.log("User signed in:", data); // Log the success
        }

        const { error: insertError } = await supabase.from('users').update({ is_online: true }).eq('id', data.user.id);
    
        if (insertError) {
            console.error("Error inserting data:", insertError.message); // Log the error message if any
        } else {
            console.log("User online status updated successfully:", insertError); // Log the success
        }

        setLoading(false);
        navigate('/account-summary', { replace: true });
    }
    
    function validateValues() {
        setLoading(true);

        if (!validateEmail(email)) {
            setFormError("Must have valid email address.")
            setLoading(false);
            return;
        } else if (email.trim() === "") {
            setFormError("Fill out all required fields. No spaces allowed.");
            setLoading(false);
            return;
        }

        if (password.trim() === "") {
            setFormError("Fill out all required fields. No spaces allowed.");
            setLoading(false);
            return;
        } else if (password.indexOf(" ") !== -1) {
            setFormError("No spaces allowed in username.");
            setLoading(false);
            return;
        }

        register();
    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    return (
        <div data-theme="dark" className={`flex-1 bg-base-300`}>
            <button onClick={() => navigate('/', { replace: true })} className={`fixed top-5 left-5 px-5 py-1 text-lg rounded-md bg-base-200 border border-neutral flex items-center gap-2 text-white hover:bg-neutral transition-all ease-in-out duration-200`}><BsArrowLeft size={18} color='white' />Back</button>
            <div className={`flex min-h-screen`}>
                <div className={`w-6/12 min-h-screen max-h-screen flex flex-col justify-center items-center bg-base-200`}>
                    <div className={`flex flex-col w-3/4 h-fit`}>
                        <h1 className={`font-bold text-2xl text-white mb-1`}>Welcome Back to Your Portfolio!</h1>
                        <p className={`text-base-content text-lg ${formError === "" ? `mb-5` : `mb-1`}`}>Resume your Journey</p>
                        {formError !== "" && <p className={`text-red-400`}>{formError}</p>}
                        <div className={`w-full flex items-center gap-2 mb-2 shadow`}>
                            <div className={`w-full flex flex-col gap-1`}>
                                <p className={`text-base`}>Email</p>
                                <div className={`relative`}>
                                    <MdEmail size={20} className={`absolute inset-2.5 text-base-content`} />
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' className={`w-full px-4 pl-9 py-2 rounded-md border border-neutral bg-base-200 focus:outline-none focus:border-gray-300`} />
                                </div>
                            </div>
                        </div>
                        <div className={`w-full flex items-center gap-2 mb-4 shadow`}>
                            <div className={`w-full flex flex-col gap-1`}>
                                <p className={`text-base`}>Password</p>
                                <div className={`relative`}>
                                    <PiPasswordLight size={20} className={`absolute inset-2.5 text-base-content`} />
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' className={`w-full px-4 pl-9 py-2 rounded-md border border-neutral bg-base-200 focus:outline-none focus:border-gray-300`} />
                                </div>
                            </div>
                        </div>
                        <button onClick={validateValues} className={`bg-emerald-500 mb-2 bg-opacity-30 text-white text-lg px-4 py-2 border border-emerald-600 hover:bg-opacity-60 hover:border-emerald-500 transition-all duration-200 ease-in-out rounded-md flex items-center justify-center gap-2`}>Login{loading && <TbLoader2 size={23} color='white' className={`animate-spin`} />}</button>
                        <p className={`text-white`}>Don't have an Account? <span onClick={() => navigate('/register', { replace: true })} className={`text-emerald-500 hover:text-opacity-75 cursor-pointer transition-all duration-200 ease-in-out`}>Register Today</span></p>
                    </div>
                </div>
                <div className={`w-6/12 min-h-screen max-h-screen flex justify-center items-center`}>
                    <div className={`w-[70%] h-fit flex items-center justify-center relative`}>
                        <p className={`text-3xl text-white`}>
                            <FaQuoteLeft className={`absolute -inset-10 fill-neutral fill-opacity-30 z-10`} size={70} />
                            <div className={`z-20 opacity-0`}>
                                <span className={`mb-4`}>Over the course of a few weeks, we migrated 125,000 users (email/pw, Gmail, Facebook, Apple logins) from Auth0 to @supabase and have now completed the migration. I'm just glad the migration is done 😅 Went well, besides a few edge cases (duplicate emails/linked accounts)</span>
                                <div className={`flex items-center gap-3 group cursor-pointer`}>
                                    <div className="avatar">
                                        <div className="w-12 rounded-full">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                        </div>
                                    </div>
                                    <p className={`text-xl text-white group-hover:text-emerald-500 transition-all ease-in-out duration-200`}>Daisy UI</p>
                                </div>
                            </div>                            
                            <div className={`z-20 absolute inset-0 flex flex-col gap-0`}>
                                <span className={`mb-4`}>Over the course of a few weeks, we migrated 125,000 users (email/pw, Gmail, Facebook, Apple logins) from Auth0 to @supabase and have now completed the migration. I'm just glad the migration is done 😅 Went well, besides a few edge cases (duplicate emails/linked accounts)</span>
                                <div className={`flex items-center gap-3 group cursor-pointer`}>
                                    <div className="avatar">
                                        <div className="w-12 rounded-full">
                                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                        </div>
                                    </div>
                                    <p className={`text-lg text-white group-hover:text-emerald-500 transition-all ease-in-out duration-200`}>Daisy UI</p>
                                </div>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}