import {Button} from "@material-tailwind/react";

const LimitedEditionSection = () => {
    return (
        <section className="bg-[#fff5f5] py-12 px-6 text-center rounded-2xl mt-10">
            <h2 className="text-2xl font-bold uppercase mb-4">Édition Limitée</h2>
            <p className="text-gray-700 max-w-xl mx-auto mb-6">
                Découvrez notre nouvelle huile de parfum en édition limitée, infusée de safran rare et de bois précieux. Disponible jusqu’à épuisement des stocks.
            </p>
            <Button color="black" ripple={false} className="px-6 py-3 text-white rounded-full hover:scale-105 transition">
                Explorer l’édition
            </Button>
        </section>
    );
};


export default  LimitedEditionSection;
