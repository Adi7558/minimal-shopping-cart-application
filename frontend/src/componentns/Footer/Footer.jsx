
import React from "react";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

function Footer() {
    return (
        <footer className="bg-dark text-white pt-4 pb-2 mt-5">
            <div className="container text-center">
                <div className="mb-3">
                    <a href="https://facebook.com" className="text-white mx-2">
                        <BsFacebook size={24} />
                    </a>
                    <a href="https://twitter.com" className="text-white mx-2">
                        <BsTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" className="text-white mx-2">
                        <BsInstagram size={24} />
                    </a>
                </div>
                <p className="mb-0">&copy; 2025 My Shopping Cart. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
