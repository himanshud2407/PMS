/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import OrbitingSkills from './ui/orbiting-skills';
import ButtonWithIcon from './ui/button-with-icon';


export default function AboutSection() {
  return (
    <section id="about" className="px-4 lg:px-12 py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">About Us</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium leading-tight mb-6">
            Providing Advanced Care with Modern Equipment
          </h2>
          <p className="text-gray-500 text-base md:text-lg mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="mb-16">
            <ButtonWithIcon label="Read More" className="w-full md:w-auto" />
          </div>

          <div className="grid grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-2">15+</h3>
              <div className="h-0.5 w-full bg-gray-100 mb-4"></div>
              <p className="text-gray-400 text-xs md:text-sm font-medium tracking-tight">Years Of Experience</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-2">50+</h3>
              <div className="h-0.5 w-full bg-gray-100 mb-4"></div>
              <p className="text-gray-400 text-xs md:text-sm font-medium tracking-tight">Certified Specialists</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-2">20+</h3>
              <div className="h-0.5 w-full bg-gray-100 mb-4"></div>
              <p className="text-gray-400 text-xs md:text-sm font-medium tracking-tight">Medical Achieved</p>
            </div>
            <div>
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-2">15k+</h3>
              <div className="h-0.5 w-full bg-gray-100 mb-4"></div>
              <p className="text-gray-400 text-xs md:text-sm font-medium tracking-tight">Satisfied Customers</p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <OrbitingSkills />
        </div>
      </div>
    </section>
  );
}
