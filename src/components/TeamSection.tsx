/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { TEAM } from '../constants';
import { ExpandableCard } from './ui/expandable-card';
import ButtonWithIcon from './ui/button-with-icon';

export default function TeamSection() {
  return (
    <section className="px-6 lg:px-12 py-24 bg-gray-soft/30">
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="max-w-xl">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">Our Team</span>
          <h2 className="text-5xl font-display font-medium leading-tight">
            Meet Our Expert Team in <br /> Providing Advanced Care
          </h2>
        </div>
        <ButtonWithIcon label="All Members" />
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ExpandableCard
              title={member.name}
              description={member.role}
              src={member.image || ''}
            >
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900">About {member.name}</h4>
                <p>
                  {member.description} With over 15 years of experience in the medical field, {member.name.split(' ').pop()} has dedicated their career to providing patient-centered care using the latest technological advancements.
                </p>
                
                <h4 className="text-xl font-bold text-gray-900 pt-4">Expertise & Specialization</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Advanced Clinical Diagnostics</li>
                  <li>Personalized Treatment Planning</li>
                  <li>Minimally Invasive Procedures</li>
                  <li>Patient Education & Wellness</li>
                </ul>

                <h4 className="text-xl font-bold text-gray-900 pt-4">Medical Philosophy</h4>
                <p>
                  "I believe that every patient deserves a tailored approach that considers their unique biology and lifestyle. My goal is not just to treat symptoms, but to foster long-term health and vitality through preventive care and precision medicine."
                </p>
              </div>
            </ExpandableCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
