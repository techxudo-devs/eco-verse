"use client";

import React from "react";
import { motion } from "framer-motion";

const HowToOrder: React.FC = () => {
  return (
    <section className="relative w-full bg-[#fff8f6] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-[1250px] px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-clash font-semibold text-3xl md:text-5xl text-zinc-900">
            How to <span className="text-orange-500">Order?</span>
          </h2>
          <p className="mt-4 text-zinc-500 font-clash text-sm md:text-lg leading-relaxed">
            Here&apos;s a quick rundown of how you can start your project with our
            team in 3 simple steps.
          </p>
        </motion.div>

        <div className="relative mt-12 md:mt-16">
          <svg
            className="hidden md:block absolute left-0 right-0 mx-auto top-[74px] w-full h-[170px] z-0"
            viewBox="0 0 1200 220"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              d="M 110 70 C 260 70, 260 170, 410 170 S 560 70, 710 70 S 860 170, 1090 120"
              stroke="url(#orderPathGradient)"
              strokeWidth="38"
              strokeLinecap="round"
              opacity="0.32"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.32 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
            />
            <defs>
              <linearGradient
                id="orderPathGradient"
                x1="110"
                y1="100"
                x2="1090"
                y2="100"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fdba74" />
                <stop offset="0.45" stopColor="#fb923c" />
                <stop offset="1" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ boxShadow: "0 0 0 rgba(249,115,22,0)" }}
                whileInView={{
                  boxShadow: "0 18px 40px rgba(249,115,22,0.12), 0 0 26px rgba(251,146,60,0.18)",
                }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="w-full max-w-[290px] h-[210px] rounded-2xl border border-orange-100 bg-white p-4"
              >
                <div className="flex items-center gap-2 text-zinc-900 font-clash font-semibold text-lg">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-500 text-sm">
                    X
                  </span>
                  Service
                </div>

                <div className="mt-5 rounded-xl border border-zinc-200 px-3 py-2 text-left text-zinc-700 font-clash text-base">
                  Select your service
                </div>

                <div className="mt-5 flex gap-3">
                  <div className="h-9 w-9 rounded-md bg-zinc-100" />
                  <div className="h-9 flex-1 rounded-md bg-zinc-100" />
                </div>

                <div className="mt-3 h-9 rounded-md bg-zinc-100" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="mt-8 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-orange-400 font-clash font-semibold text-xl"
              >
                1
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.22 }}
                className="mt-4 font-clash font-semibold text-4xl leading-tight text-zinc-900"
              >
                Pick the service
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.28 }}
                className="mt-3 font-clash text-zinc-600 text-xl leading-snug max-w-[330px]"
              >
                Choose the exact service your brand needs.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ boxShadow: "0 0 0 rgba(249,115,22,0)" }}
                whileInView={{
                  boxShadow: "0 18px 40px rgba(249,115,22,0.12), 0 0 26px rgba(251,146,60,0.18)",
                }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="w-full max-w-[290px] h-[210px] rounded-2xl border border-orange-100 bg-white p-4"
              >
                <div className="flex items-center gap-2 text-zinc-900 font-clash font-semibold text-[30px] leading-none">
                  <span className="inline-flex h-6 w-6 rounded-md border border-zinc-300" />
                  Set Goal
                </div>

                <div className="mt-4 flex items-center justify-between text-zinc-500 font-clash text-sm">
                  <span>Set your target</span>
                  <span className="text-zinc-800 text-lg">100</span>
                </div>

                <div className="mt-2 h-2.5 w-full rounded-full bg-zinc-200">
                  <div className="h-full w-[36%] rounded-full bg-orange-400" />
                </div>

                <div className="mt-4 rounded-xl border border-zinc-200 px-3 py-2.5 text-left text-zinc-500 font-clash text-sm">
                  Amount: $50
                </div>

                <button className="mt-3 h-10 w-full rounded-xl bg-orange-500 text-white font-clash font-semibold text-xl">
                  Set Goal
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: 0.35 }}
                className="mt-8 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-orange-400 font-clash font-semibold text-xl"
              >
                2
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.37 }}
                className="mt-4 font-clash font-semibold text-4xl leading-tight text-zinc-900"
              >
                Set the target
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.43 }}
                className="mt-3 font-clash text-zinc-600 text-xl leading-snug max-w-[330px]"
              >
                Enter your desired quantity and preferred budget.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.35 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ boxShadow: "0 0 0 rgba(249,115,22,0)" }}
                whileInView={{
                  boxShadow: "0 18px 40px rgba(249,115,22,0.12), 0 0 26px rgba(251,146,60,0.18)",
                }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="w-full max-w-[290px] h-[210px] rounded-2xl border border-orange-100 bg-white p-4"
              >
                <div className="grid grid-cols-2 text-center border-b border-zinc-200 text-orange-500 font-clash font-medium text-sm">
                  <span className="pb-2 border-b-2 border-orange-500">All</span>
                  <span className="pb-2">Updates</span>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-2 text-left">
                    <span className="mt-1 h-3 w-3 rounded-full bg-orange-500" />
                    <div>
                      <p className="text-zinc-800 font-clash text-sm">
                        Your order is in progress.
                      </p>
                      <p className="text-zinc-500 font-clash text-xs">
                        Live status updates included
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-left">
                    <span className="mt-1 h-3 w-3 rounded-full bg-orange-300" />
                    <div>
                      <p className="text-zinc-800 font-clash text-sm">
                        Final delivery is on the way.
                      </p>
                      <p className="text-zinc-500 font-clash text-xs">
                        You get notified instantly
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, delay: 0.5 }}
                className="mt-8 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-orange-400 font-clash font-semibold text-xl"
              >
                3
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.52 }}
                className="mt-4 font-clash font-semibold text-4xl leading-tight text-zinc-900"
              >
                Get the results
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: 0.58 }}
                className="mt-3 font-clash text-zinc-600 text-xl leading-snug max-w-[330px]"
              >
                Checkout and receive your completed delivery fast.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;
