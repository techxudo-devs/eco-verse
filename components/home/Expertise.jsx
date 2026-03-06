"use client"

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Expertise = () => {
    const containerRef = useRef(null);

    // Track scroll progress across the 300vh container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [activeIndex, setActiveIndex] = useState(0);

    // Update state based on scroll section. 
    // This single state will now power BOTH the accordion and the image carousel perfectly.
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.33) setActiveIndex(0);
        else if (latest < 0.66) setActiveIndex(1);
        else setActiveIndex(2);
    });

    // --- NEW: Smoothly scroll to the corresponding section when clicked ---
    const handleItemClick = (index) => {
        if (!containerRef.current) return;
        
        const containerTop = containerRef.current.offsetTop;
        const windowHeight = window.innerHeight;
        
        // Calculate the exact scroll distance for each index (0vh, 100vh, 200vh)
        const targetScroll = containerTop + (index * windowHeight);
        
        window.scrollTo({
            top: targetScroll,
            behavior: "smooth"
        });
    };

    // --- SMOOTH DISCRETE ANIMATION LOGIC ---
    // Instead of scrubbed scrolling, we calculate the relative position of each card.
    // 0 = Center (Active)
    // 1 = Right (Next)
    // 2 = Left (Previous)
    const getCardAnimation = (index) => {
        const position = (index - activeIndex + 3) % 3;

        if (position === 0) {
            // Front / Active Card
            return {
                x: 0,
                scale: 1,
                rotate: 0,
                zIndex: 30,
                opacity: 1,
                filter: "brightness(1)",
            };
        } else if (position === 1) {
            // Right Card
            return {
                x: 40,
                scale: 0.85,
                rotate: 3,
                zIndex: 20,
                opacity: 0.9,
                filter: "brightness(0.7)", // Slightly dims background cards for depth
            };
        } else {
            // Left Card
            return {
                x: -40,
                scale: 0.85,
                rotate: -3,
                zIndex: 10,
                opacity: 0.9,
                filter: "brightness(0.7)",
            };
        }
    };

    const rightContent =[
        {
            title: "SOCIAL MEDIA STRATEGY",
            pills:["Analysis of the current situation", "Benchmark", "Creation of an art direction", "Defining a social media strategy"]
        },
        {
            title: "CONTENT CREATION",
            pills:["Videos", "Photos", "Instagram Reels", "Interview", "Corporate", "Studio recording", "YouTube", "TikTok"]
        },
        {
            title: "COMMUNITY MANAGEMENT",
            pills:["Editorial planning", "Posting", "Creating stories", "Daily moderation", "Reporting & Learnings", "Project management"]
        }
    ];

    const images =[
        "https://www.agencefoudre.com/media/site/3c742bb01f-1767612914/foudre-@agence.foudre-57-600x-q80.avif",
        "https://www.agencefoudre.com/media/site/b224aefda4-1767612789/shooting-foudre-600x-q80.avif",
        "https://www.agencefoudre.com/media/site/750b347a6e-1764266386/foudre-5-600x-q80.avif"
    ];

    return (
        <div ref={containerRef} className="relative h-[300vh] bg-[#00522D]">
            {/* Sticky Scroll Container */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                <div className="flex w-full max-w-[1400px] px-8 lg:px-8 items-center justify-between">

                    {/* --- LEFT SECTION --- */}
                    <div className="w-full max-w-[400px] relative z-40">
                        <h1 className="text-[4rem] lg:text-[94px] leading-[0.7] font-beni font-black uppercase">
                            <span className="text-orange-500 block">REASONING</span>
                            <span className="text-orange-500 block">TO BETTER:</span>
                            <span className="block text-orange-300">RESONATING.</span>
                        </h1>

                        <p className="font-clash text-orange-500 mt-5 text-lg font-semibold w-[85%] leading-6">
                            Foudre is a social media agency founded on three strong areas of expertise.
                        </p>

                        {/* Floating Emoji Box */}
                        <motion.div
                            animate={{ y:[-8, 8, -8] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-20 top-[70%] bg-[#FCE6D5] rounded-2xl px-3 py-5 flex items-center shadow-sm rotate-[-5deg]"
                        >
                            <span className="text-3xl drop-shadow-sm">👀</span>
                            <span className="text-3xl drop-shadow-sm">📱</span>
                            <span className="text-3xl drop-shadow-sm">📊</span>
                        </motion.div>
                    </div>

                    {/* --- MIDDLE IMAGES SECTION --- */}
                    <div className="relative w-[250px] h-[400px] flex-shrink-0 mx-8 flex items-center justify-center">
                        {images.map((src, index) => (
                            <motion.img
                                key={index}
                                src={src}
                                // State-based animation properties
                                initial={false}
                                animate={getCardAnimation(index)}
                                // Butter-smooth Spring transition
                                transition={{
                                    type: "spring",
                                    stiffness: 150,
                                    damping: 20,
                                    mass: 1
                                }}
                                className="absolute inset-0 w-full h-full object-cover rounded-3xl origin-center"
                                // Offload to GPU
                                style={{ willChange: "transform, z-index" }}
                            />
                        ))}
                    </div>

                    {/* --- RIGHT ACCORDION SECTION --- */}
                    <div className="w-full max-w-[400px] flex flex-col justify-center relative z-40">
                        {rightContent.map((item, i) => (
                            <div key={i} className="flex flex-col border-b border-white last:border-0 py-4">
                                <h3
                                    onClick={() => handleItemClick(i)} // Added click event
                                    className={`cursor-pointer font-beni font-black tracking-[0.5] text-[46px] uppercase leading-none transition-colors duration-500 ${activeIndex === i ? "text-orange-500" : "text-white"
                                        }`}
                                >
                                    {item.title}
                                </h3>

                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: activeIndex === i ? "auto" : 0,
                                        opacity: activeIndex === i ? 1 : 0,
                                        marginTop: activeIndex === i ? 20 : 0,
                                    }}
                                    className="overflow-hidden"
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                >
                                    <div className="flex flex-wrap gap-1">
                                        {item.pills.map((pill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-orange-500 text-white rounded-lg px-4 py-2 text-sm font-clash font-medium tracking-wide"
                                            >
                                                {pill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* --- BOTTOM LEFT LABEL --- */}
                <div className="absolute bottom-8 left-0 lg:left-9 z-50">
                    <span className="text-orange-500 font-clash font-regular uppercase text-sm border-b border-orange-500">
                        Experts
                    </span>
                </div>

            </div>
        </div>
    );
};

export default Expertise;