import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group relative bg-sidebar-bg/40 backdrop-blur-xl border border-border-base/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-brand-purple/40 shadow-sm"
        >
            {/* Window Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border-base/50 bg-text-base/[0.02]">
                <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-text-muted tracking-wider opacity-60">
                        {project.title.toLowerCase().replace(/\s+/g, '_')}.exe
                    </span>
                </div>
                <div className="w-10 flex justify-end">
                    <div className="w-1 h-1 rounded-full bg-text-muted/20" />
                    <div className="w-1 h-1 rounded-full bg-text-muted/20 ml-1" />
                </div>
            </div>

            {/* Project Image/Preview */}
            <div className="relative aspect-[16/10] overflow-hidden bg-text-base/[0.05]">
                {project.liveLink ? (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted/20 font-mono text-4xl select-none">
                                {'{...}'}
                            </div>
                        )}
                    </a>
                ) : (
                    <>
                        {project.image ? (
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted/20 font-mono text-4xl select-none">
                                {'{...}'}
                            </div>
                        )}
                    </>
                )}

                {/* Overlay with Links */}
                <div className="absolute inset-0 bg-brand-purple/10 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto">
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white text-black rounded-xl hover:scale-110 active:scale-95 transition-all shadow-xl"
                        >
                            <ExternalLink size={20} />
                        </a>
                    )}
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-black/80 text-white rounded-xl hover:scale-110 active:scale-95 border border-white/10 transition-all shadow-xl"
                        >
                            <Github size={20} />
                        </a>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-5 sm:p-6 space-y-4 relative">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
                        <span className="text-[10px] font-black text-brand-purple uppercase tracking-[0.2em]">
                            {project.category}
                        </span>
                    </div>

                    {project.liveLink ? (
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="block group/title">
                            <h3 className="text-lg sm:text-xl font-bold text-text-base group-hover/title:text-transparent group-hover/title:bg-clip-text group-hover/title:bg-gradient-to-r group-hover/title:from-violet-500 group-hover/title:to-indigo-500 transition-all duration-300">
                                {project.title}
                            </h3>
                        </a>
                    ) : (
                        <h3 className="text-lg sm:text-xl font-bold text-text-base group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-500 group-hover:to-indigo-500 transition-all duration-300">
                            {project.title}
                        </h3>
                    )}

                    <p className="text-text-muted text-sm sm:text-base leading-relaxed line-clamp-2 font-medium group-hover:opacity-100 transition-opacity">
                        {project.description}
                    </p>
                </div>

                {/* Tech Stack - Terminal Style */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech, i) => (
                        <span key={i} className="text-[9px] font-mono tracking-tight text-text-muted bg-text-base/[0.03] border border-border-base/50 px-2 py-1 rounded-md transition-colors group-hover:text-brand-purple group-hover:border-brand-purple/20">
                            {tech}.v4
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom Glow Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
        </motion.div>
    );
};

export default ProjectCard;
