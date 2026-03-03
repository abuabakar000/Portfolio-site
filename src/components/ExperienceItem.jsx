import React from 'react';
import { motion } from 'framer-motion';

const ExperienceItem = ({ item }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative pl-10 pb-12 border-l-2 border-dashed border-border-base last:pb-0"
        >
            <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-sidebar-bg border-2 border-brand-purple flex items-center justify-center shadow-[0_0_10px_rgba(124,58,237,0.3)]">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-purple shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
            </div>

            <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-brand-purple px-2.5 py-1 bg-brand-purple/10 border border-brand-purple/20 rounded uppercase tracking-wider font-extrabold shadow-[0_0_10px_rgba(124,58,237,0.1)] transition-all group-hover:bg-brand-purple/20">
                                @{item.company.toLowerCase().replace(/\s+/g, '')}
                            </span>
                            <h3 className="text-xl font-bold text-text-base font-mono">{item.role}</h3>
                        </div>
                    </div>
                    <span className="font-mono text-xs text-text-muted bg-sidebar-bg/50 px-3 py-1.5 rounded border border-border-base/50 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shadow-[0_0_8px] ${item.duration.toLowerCase().includes('present')
                            ? 'bg-emerald-500 shadow-emerald-500/50 animate-pulse'
                            : 'bg-red-500 shadow-red-500/50'
                            }`} />
                        {item.duration}
                    </span>
                </div>

                <div className="bg-text-base/[0.02] border border-border-base/50 rounded-lg p-5 group hover:border-brand-purple/30 transition-colors">
                    <ul className="space-y-3">
                        {item.description.map((bullet, i) => (
                            <li key={i} className="text-text-base text-sm sm:text-base flex items-start space-x-3">
                                <span className="mt-1.5 text-brand-purple opacity-40 font-mono text-xs">commit</span>
                                <span className="leading-relaxed">{bullet}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};

export default ExperienceItem;
