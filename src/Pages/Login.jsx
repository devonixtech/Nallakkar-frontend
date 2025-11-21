import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
     const navigate = useNavigate();
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                    <form className="space-y-4" >
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Email
                            </label>
                            <div className="flex">

                                <input
                                    type="emsil"
                                    placeholder="Enter email"

                                    className={`w-full px-4 py-2 border`}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Password
                            </label>
                            <div className="flex">

                                <input
                                    type="password"
                                    placeholder="Enter password"

                                    className={`w-full px-4 py-2 border `}
                                />
                            </div>
                        </div>

                    </form>

                    <button
                        type="button"
                        onClick={() => {
                            localStorage.setItem("role", "admin");
                            navigate("/admin/dashboard")
                        }}
                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
