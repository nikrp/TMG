import { useNavigate } from "react-router-dom"

export default function PageNotFound() {
    const navigate = useNavigate();

    return (
        <div data-theme="dark" className={`flex-1 bg-base-200 flex items-center justify-center flex-col`}>
            <h1 className={`text-5xl font-black text-white`}>Page Not Found</h1>
            <p className={`my-5 text-base-content text-xl`}>The page you're searching for is not available.</p>
            <button onClick={() => navigate('/account-summary', { replace: true })} className={`btn btn-success rounded-btn text-base`}>Return to Account Summary</button>
        </div>
    )
}