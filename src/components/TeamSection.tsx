/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { TEAM } from '../constants';

export default function TeamSection() {
  return (
    <section className="px-6 lg:px-12 py-24 bg-gray-soft/30">
      <div className="max-w-7xl mx-auto mb-16 flex justify-between items-end">
        <div className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4 block">Our Team</span>
          <h2 className="text-5xl font-display font-medium leading-tight">
            Meet Our Expert Team in <br /> Providing Advanced Care
          </h2>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition-all">
          All Members
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TEAM.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className={`p-8 rounded-[2.5rem] h-full flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${member.color}`}>
              <div>
                <h3 className="text-3xl font-bold font-display mb-1">{member.name}</h3>
                <p className="text-gray-500 font-medium mb-6 uppercase text-xs tracking-widest">{member.role}</p>
                <div className="w-12 h-0.5 bg-gray-300 group-hover:w-full transition-all duration-500"></div>
              </div>
              
              <div className="mt-8">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
