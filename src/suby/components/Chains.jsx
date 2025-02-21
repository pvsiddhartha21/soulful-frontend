import React, { useState, useEffect } from 'react';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";
import { MagnifyingGlass } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const RESTAURANT_API = "https://random-data-api.com/api/restaurant/random_restaurant?size=10";
const UNSPLASH_API = "https://source.unsplash.com/400x300/?restaurant,food"; // ✅ Real food images

const Chains = () => {
    const [vendorData, setVendorData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch restaurant data
    const vendorFirmHandler = async () => {
        try {
            const response = await fetch(RESTAURANT_API);
            const newData = await response.json();

            // Assign a random Unsplash image to each restaurant
            const updatedData = newData.map((restaurant) => ({
                ...restaurant,
                image: `${UNSPLASH_API}&random=${Math.random()}`
            }));

            setVendorData(updatedData);
            console.log("Fetched Restaurants:", updatedData);
            setLoading(false);
        } catch (error) {
            alert("Failed to fetch data");
            console.error("Failed to fetch data:", error);
            setLoading(true);
        }
    };

    useEffect(() => {
        vendorFirmHandler();
    }, []);

    // Scroll handler for left/right buttons
    const handleScroll = (direction) => {
        const gallery = document.getElementById("chainGallery");
        const scrollAmount = 500;

        if (direction === "left") {
            gallery.scrollTo({ left: gallery.scrollLeft - scrollAmount, behavior: "smooth" });
        } else {
            gallery.scrollTo({ left: gallery.scrollLeft + scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="mediaChainSection">
            {/* Loader Section */}
            <div className="loaderSection">
                {loading && (
                    <>
                        <div className="loader">Your 🍔 is Loading...</div>
                        <MagnifyingGlass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="magnifying-glass-loading"
                            glassColor="#c0efff"
                            color="#e15b64"
                        />
                    </>
                )}
            </div>

            {/* Scroll Buttons */}
            <div className="btnSection">
                <button onClick={() => handleScroll("left")}>
                    <FaRegArrowAltCircleLeft className="btnIcons" />
                </button>
                <button onClick={() => handleScroll("right")}>
                    <FaRegArrowAltCircleRight className="btnIcons" />
                </button>
            </div>

            <h3 className="chainTitle">Top Restaurants near you 🧡</h3>

            {/* Restaurant List */}
            <section className="chainSection" id="chainGallery">
                {vendorData.map((restaurant, index) => (
                    <div className="vendorBox" key={index}>
                        <Link to={`/restaurants/${restaurant.name}`} className="link">
                            <div className="firmImage">
                                <img src={restaurant.image} className="topimg" alt={restaurant.name} />
                            </div>
                        </Link>
                        <h4>{restaurant.name}</h4>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Chains;
