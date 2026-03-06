"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CardsStack = () => {
    const containerRef = useRef(null);

    // Track scroll over a larger container (600vh) to slow down the overall animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Softened the spring for a slower, buttery-smooth transition
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 60, // Lowered from 100 to make it feel less fast/snappy
        damping: 25,   // Lowered from 30
        restDelta: 0.001
    });

    // Mapping stops at 0.8 instead of 1.0 so the 5th card doesn't hit the "page bottom" deadzone,
    // ensuring it animates at the exact same speed as the others.
    const y1 = useTransform(smoothProgress, [0.0, 0.20], [2000, 0]);
    const y2 = useTransform(smoothProgress, [0.20, 0.40], [2000, 0]);
    const y3 = useTransform(smoothProgress, [0.40, 0.60], [2000, 0]);
    const y4 = useTransform(smoothProgress, [0.60, 0.80], [2000, 0]);

    // Card 0 is fixed at 0. The others slide in based on scroll progress.
    const yTransforms = [0, y1, y2, y3, y4];

    // Data for the 5 cards, alternating shades of orange for depth, and specific rotations
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
            color: "bg-[#00522D]", // orange-600
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
            color: "bg-[#00522D]", // orange-700
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
        <div ref={containerRef} className="relative h-[500vh] bg-[#FFF0E5]">
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
    );
};

export default CardsStack;