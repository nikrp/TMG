export default function ProfileProfile() {
    return (
            <div className={`bg-base-300 p-10 flex-1`}>
                <div className={`flex gap-5 items-center mb-8`}>
                    <div className="avatar placeholder">
                        <div className="bg-neutral text-4xl text-neutral-content w-28 rounded-full">
                            <span>NP</span>
                        </div>
                    </div>
                    <div className={`w-full`}>
                        <p className={`text-2xl font-bold text-base-content mb-2`}>Nikhil Pellakuru</p>
                        <div className={`flex items-center gap-3`}>
                            <button className={`px-2.5 py-1.5 rounded-md border border-emerald-500 h-fit bg-emerald-500 text-black hover:bg-opacity-75 hover:border-opacity-75 transition-all ease-in-out duration-200`}>Change Picture</button>
                            <button className={`px-2.5 py-1.5 rounded-md border border-neutral h-fit text-red-500 hover:bg-neutral transition-all ease-in-out duration-200`}>Delete Picture</button>
                        </div>
                    </div>
                </div>
                <div className={`flex items-center gap-4 w-2/3 mb-2`}>
                    <div className={`w-1/2`}>
                        <p className={`text-base-content font-normal mb-1.5`}>First Name</p>
                        <input type="text" value={`John`} className={`px-2.5 py-1.5 focus:outline-none focus:border-base-100 w-full bg-base-300 rounded-md border border-neutral shadow`} />
                    </div>
                    <div className={`w-1/2`}>
                        <p className={`text-base-content font-normal mb-1.5`}>Last Name</p>
                        <input type="text" value={`Smith`} className={`px-2.5 py-1.5 focus:outline-none focus:border-base-100 w-full bg-base-300 rounded-md border border-neutral shadow`} />
                    </div>
                </div>
                <div className={`w-2/3 mb-2`}>
                    <div className={`w-full`}>
                        <p className={`text-base-content font-normal mb-1.5`}>Username</p>
                        <input type="text" value={`john_smith_123`} className={`px-2.5 py-1.5 focus:outline-none focus:border-base-100 w-full bg-base-300 rounded-md border border-neutral shadow`} />
                    </div>
                </div>
                <div className={`w-2/3 mb-2`}>
                    <div className={`w-full`}>
                        <p className={`text-base-content font-normal mb-1.5`}>Email</p>
                        <input type="email" value={`john_smith@gmail.com`} className={`px-2.5 py-1.5 focus:outline-none focus:border-base-100 w-full bg-base-300 rounded-md border border-neutral shadow`} />
                    </div>
                </div>
                <div className={`w-2/3 mb-8`}>
                    <div className={`w-full`}>
                        <p className={`text-base-content font-normal mb-1.5`}>Password</p>
                        <input type="password" value={`thisisarandompassword`} className={`px-2.5 py-1.5 focus:outline-none focus:border-base-100 w-full bg-base-300 rounded-md border border-neutral shadow`} />
                    </div>
                </div>
                <button className={`border border-emerald-500 hover:bg-emerald-500 hover:bg-opacity-15 text-emerald-500 transition-all duration-200 ease-in-out px-2.5 py-1.5 rounded-md`}>Save Changes</button>
            </div>
    )
}