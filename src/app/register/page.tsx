'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import registerUser from "@/libs/registerUser";

function RegisterUser() {
    const [formData, setFormData] = useState({
        name: "",
        telephone: "",
        email: "",
        password: ""
    });

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        const result = await registerUser(formData);
        if (result.success) {
            alert("Registration successful!");
            setFormData({ name: "", telephone: "", email: "", password: "" });
        } else {
            alert(`Error: ${result.message}`);
        }
    }

    return (
        <main className="w-full min-h-screen bg-gradient-to-b from-cyan-600 to-green-500 text-white flex flex-col items-center py-12 px-6">
            <div className="text-3xl font-extrabold drop-shadow-lg mb-8">
                User Registration
            </div>
            <div className="text-md text-white text-center mb-8">
                Fill in the details below to create an account
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white/90 text-black rounded-xl shadow-lg space-y-6">
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Name" 
                    required 
                    className="w-full p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400"
                />
                <input 
                    type="text" 
                    name="telephone" 
                    value={formData.telephone} 
                    onChange={handleChange} 
                    placeholder="Telephone" 
                    required 
                    className="w-full p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400"
                />
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email" 
                    required 
                    className="w-full p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400"
                />
                <input 
                    type="password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    placeholder="Password (min. 6 characters)" 
                    required 
                    className="w-full p-3 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-400"
                />
                <button 
                    className="block w-full rounded bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 shadow-md transition-all duration-300 ease-in-out"
                    type="submit">
                    Register
                </button>
            </form>
        </main>
    );
}

export default RegisterUser;
