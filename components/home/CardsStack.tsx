"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CardsStack = () => {
    const containerRef = useRef(null);

    // Track scroll over a larger container (600vh) to slow down the overall animation (DESKTOP ONLY)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Softened the spring for a slower, buttery-smooth transition
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60,
        damping: 25,
        restDelta: 0.001
    });

    const y1 = useTransform(smoothProgress, [0.0, 0.20], [2000, 0]);
    const y2 = useTransform(smoothProgress, [0.20, 0.40], [2000, 0]);
    const y3 = useTransform(smoothProgress, [0.40, 0.60], [2000, 0]);
    const y4 = useTransform(smoothProgress, [0.60, 0.80], [2000, 0]);

    const yTransforms = [0, y1, y2, y3, y4];

    // Data for the 5 cards
    const cards = [
        {
            id: "01",
            title: "STRATEGY",
            desc: "Analysis and definition of the pillars of communication.",
            color: "bg-[#F97316]", // orange-400
            rotation: 0 // straight
        },
        {
            id: "02",
            title: "ART DIRECTION",
            desc: "Reveal your brand's DNA with every post.",
            color: "bg-[#00522D]", // orange-600 (green as per your code)
            rotation: -5 // tilt left
        },
        {
            id: "03",
            title: "CONTENT CREATION",
            desc: "Photo and video production for your social media.",
            color: "bg-[#F97316]", // orange-500
            rotation: 0 // straight
        },
        {
            id: "04",
            title: "COMMUNITY MANAGEMENT",
            desc: "From account management to post scheduling.",
            color: "bg-[#00522D]", // orange-700 (green as per your code)
            rotation: 5 // tilt right
        },
        {
            id: "05",
            title: "REPORTING & LEARNINGS",
            desc: "Detailed reports and strategic adjustments.",
            color: "bg-[#F97316]", // orange-500
            rotation: 0 // straight
        }
    ];

    return (
        <>
            {/* CSS to hide the scrollbar for the mobile horizontal carousel smoothly */}
            <style>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* ========================================== */}
            {/* DESKTOP VIEW (Visible lg and above)        */}
            {/* ========================================== */}
            <div ref={containerRef} className="hidden lg:block relative h-[500vh] bg-[#FFF0E5]">
                {/* Sticky Wrapper - Pins to the screen while scrolling */}
                <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                    <div className="flex w-full max-w-[1400px] px-4 lg:px-8 items-center justify-between mx-auto">

                        {/* --- LEFT TEXT SECTION --- */}
                        <div className="w-1/3 relative z-40">
                            <h2 className="text-[94px] leading-[0.7] font-beni uppercase font-black">
                                <span className="text-orange-500 block">WE WILL</span>
                                <span className="text-orange-300 block">ALWAYS</span>
                                <span className="text-orange-500 block">PREFER</span>
                                <span className="text-orange-500 block">THIS ORDER.</span>
                            </h2>

                            {/* Floating Emoji Bubble */}
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute right-[0%] lg:right-[-5%] bottom-2 bg-white/90 rounded-2xl p-4 flex items-center shadow-sm rotate-[10deg]"
                            >
                                <span className="text-3xl drop-shadow-sm">⚡</span>
                                <span className="text-3xl drop-shadow-sm">🧠</span>
                            </motion.div>
                        </div>

                        {/* --- CENTER CARDS SECTION --- */}
                        <div className="w-1/3 flex items-center justify-center relative">
                            <div className="relative w-[270px] h-[410px]">
                                {cards.map((card, idx) => (
                                    <motion.div
                                        key={card.id}
                                        style={{
                                            y: yTransforms[idx],
                                            rotate: card.rotation,
                                            zIndex: idx * 10,
                                            willChange: "transform" // Hardware acceleration
                                        }}
                                        className={`absolute inset-0 w-full h-full rounded-3xl ${card.color} flex flex-col items-center justify-between p-8 text-white`}
                                    >
                                        <h3 className="font-beni font-black text-[46px] text-center uppercase leading-8 pt-2">
                                            {card.title}
                                        </h3>

                                        <span className="font-beni font-black text-[216px] leading-none">
                                            {card.id}
                                        </span>

                                        <p className="font-clash text-center text-base font-medium leading-5 w-[95%] pb-2">
                                            {card.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* --- RIGHT TEXT SECTION --- */}
                        <div className="w-1/3 flex justify-start pl-14 z-40">
                            <div className="w-full max-w-[340px]">
                                <h4 className="font-clash font-bold text-orange-600 text-[16px] mb-4 leading-5">
                                    At Foudre, each project follows <br /> a clear and structured process.
                                </h4>
                                <p className="font-clash font-medium text-orange-500 text-[16px] leading-5">
                                    Because effective communication cannot be improvised, we have created a method that combines strategy, creativity and rigor, to guarantee concrete results.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* --- BOTTOM LEFT LABEL --- */}
                    <div className="absolute bottom-8 left-9 z-50">
                        <span className="text-orange-500 font-clash font-regular tracking-wide uppercase text-sm border-b border-orange-500 pb-1">
                            Methodo & Process
                        </span>
                    </div>

                </div>
            </div>

            {/* ========================================== */}
            {/* MOBILE VIEW (Visible below lg)             */}
            {/* ========================================== */}
            <div className="block lg:hidden relative w-full bg-[#FFF0E5] py-10 overflow-hidden">

                {/* --- TOP TEXT SECTION --- */}
                <div className="flex flex-col items-center text-center px-6 relative z-20 w-full max-w-[500px] mx-auto">

                    {/* Floating Emoji Bubble (Adjusted for mobile top-left) */}
                    <motion.div
                        animate={{ y: [-4, 4, -4] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-6 left-[5%] bg-white/90 rounded-2xl p-2.5 flex items-center shadow-sm rotate-[-10deg] z-20"
                    >
                        <span className="text-xl sm:text-2xl drop-shadow-sm">⚡</span>
                        <span className="text-xl sm:text-2xl drop-shadow-sm">🧠</span>
                    </motion.div>

                    <h2 className="text-[60px] sm:text-[75px] leading-[0.75] font-beni uppercase font-black mt-10">
                        <span className="text-orange-500 block">WE WILL</span>
                        <span className="text-orange-300 block">ALWAYS</span>
                        <span className="text-orange-500 block">PREFER</span>
                        <span className="text-orange-500 block">THIS ORDER.</span>
                    </h2>

                    <div className="mt-8 flex flex-col gap-4">
                        <h4 className="font-clash font-bold text-orange-600 text-[15px] sm:text-[16px] leading-tight px-4">
                            At Foudre, each project follows a clear and structured process.
                        </h4>
                        <p className="font-clash font-medium text-orange-500 text-[14px] sm:text-[15px] leading-snug">
                            Because effective communication cannot be improvised, we have created a method that combines strategy, creativity and rigor, to guarantee concrete results.
                        </p>
                    </div>
                </div>

                {/* --- HORIZONTAL CAROUSEL (1.5 Cards) --- */}
                {/* Native CSS scroll snapping used here for zero-lag, ultra-smooth swiping */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 mt-8 pb-8 hide-scrollbar w-full transform-gpu">
                    {cards.map((card, idx) => (
                        <div
                            key={card.id}
                            // 75vw forces 1 full card to show, while leaving 25vw for the next card to peek in
                            className="min-w-[75vw] sm:min-w-[50vw] md:min-w-[40vw] snap-center shrink-0 flex justify-center py-4"
                        >
                            <motion.div
                                style={{ rotate: card.rotation }}
                                className={`relative w-full max-w-[300px] h-[400px] sm:h-[420px] rounded-3xl ${card.color} flex flex-col items-center justify-between p-6 sm:p-8 text-white`}
                            >
                                <h3 className="font-beni font-black text-[40px] sm:text-[38px] text-center uppercase leading-[0.9] pt-2">
                                    {card.title}
                                </h3>

                                <span className="font-beni font-black text-[150px] sm:text-[180px] leading-none">
                                    {card.id}
                                </span>

                                <p className="font-clash text-center text-[13px] sm:text-[14px] font-medium leading-snug w-[95%] pb-2">
                                    {card.desc}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* --- BOTTOM LEFT LABEL --- */}
                <div className="absolute bottom-6 left-6 z-50">
                    <span className="text-orange-500 font-clash font-regular tracking-wide uppercase text-xs sm:text-sm border-b border-orange-500 pb-1">
                        Methodo & Process
                    </span>
                </div>

            </div>
        </>
    );
};

export default CardsStack;