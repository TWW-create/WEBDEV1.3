import { Link } from "react-router-dom";

const DropdownMenu = ({ items, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="absolute left-0 top-full w-full bg-black text-white shadow-lg z-50 px-12">
                <div className="py-10 flex flex-col gap-3 items-start justify-start">
                    {items?.map((category, index) => (
                        <div key={index} className=" flex items-center gap-5">
                            <h3 className="font-bold text-lg">{category.title}:</h3>
                            <ul className=" flex items-center gap-4">
                                {category.links.map((link, linkIndex) => (
                                    <Link to={`/${category.parent}/${link.href}`} key={linkIndex}>
                                        <a href={link.href} className="hover:underline">
                                            {link.text}
                                        </a>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
        </div>
    );
};

export default DropdownMenu;
