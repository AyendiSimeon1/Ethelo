export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-6">
            <div className="flex justify-between items-center">
                <div className="text-sm">
                    &copy; 2024 Ethelo. All rights reserved.
                </div>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-400">Facebook</a>
                    <a href="#" className="hover:text-gray-400">Twitter</a>
                    <a href="#" className="hover:text-gray-400">LinkedIn</a>
                </div>
                <div className="text-sm">
                    <a href="#" className="hover:text-gray-400">Contact Us</a>
                </div>
            </div>
        </footer>
)};