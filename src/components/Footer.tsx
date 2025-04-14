import { Facebook,Instagram } from 'lucide-react';
const Footer = () => {
    return (
        <footer className="bg-black text-white py-10 px-6 mt-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div>
                    <h3 className="font-semibold mb-2">La Maison</h3>
                    <ul>
                        <li>Notre histoire</li>
                        <li>Engagements</li>
                        <li>Ingrédients</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Support</h3>
                    <ul>
                        <li>Contact</li>
                        <li>Livraison</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Suivez-nous</h3>
                    <div className="flex gap-4">
                        <a href="#"><Facebook  className="h-5 w-5" /></a>
                        <a href="#"><Instagram  className="h-5 w-5" /></a>
                    </div>
                </div>
            </div>
            <p className="text-center mt-6 text-xs text-gray-400">© {new Date().getFullYear()} JORYCIA. Tous droits réservés.</p>
        </footer>
    );
};
export default Footer;