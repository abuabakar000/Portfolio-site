import React from 'react';
import { motion } from 'framer-motion';

const ExperienceItem = ({ item }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-8 pb-12 border-l border-border-base last:pb-0"
        >
            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-brand-purple shadow-[0_0_10px_rgba(124,58,237,0.5)]" />

            <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-text-base">{item.role}</h3>
                        <p className="text-sm sm:text-base text-brand-purple font-medium">{item.company}</p>
                    </div>
                    <span className="text-sm font-medium text-text-muted bg-sidebar-bg px-3 py-1 rounded-full border border-border-base w-fit">
                        {item.duration}
                    </span>
                </div>

                <ul className="space-y-2">
                    {item.description.map((bullet, i) => (
                        <li key={i} className="text-text-base text-sm sm:text-base flex items-start space-x-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-border-base shrink-0" />
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

export default ExperienceItem;
