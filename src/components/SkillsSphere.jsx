import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

// Optimized Skills Data with reliable slugs
const SKILLS_DATA = [
    { name: "React", slug: "react", color: "#61DAFB" },
    { name: "Node.js", slug: "nodedotjs", color: "#339933" },
    { name: "Express", slug: "express", color: "#FFFFFF" },
    { name: "MongoDB", slug: "mongodb", color: "#47A248" },
    { name: "Git", slug: "git", color: "#F05032" },
    { name: "GitHub", slug: "github", color: "#FFFFFF" },
    { name: "Tailwind", slug: "tailwindcss", color: "#06B6D4" },
    { name: "Vercel", slug: "vercel", color: "#FFFFFF" },
    { name: "JWT", slug: "jsonwebtokens", color: "#FFFFFF" }
];

const SkillItem = ({ skill, rotationX, rotationY, radius }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const scale = useMotionValue(1);
    const opacity = useMotionValue(1);
    const zIndex = useMotionValue(0);

    // Using jsDelivr as a highly reliable RAW SVG source
    // We use mask-image to color the black SVGs dynamically via CSS
    const rawSvgUrl = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${skill.slug}.svg`;

    useAnimationFrame(() => {
        const rx = (rotationX.get() * Math.PI) / 180;
        const ry = (rotationY.get() * Math.PI) / 180;

        let currX = skill.sx * Math.cos(ry) - skill.sz * Math.sin(ry);
        let currZ = skill.sz * Math.cos(ry) + skill.sx * Math.sin(ry);
        let currY = skill.sy * Math.cos(rx) - currZ * Math.sin(rx);
        currZ = currZ * Math.cos(rx) + skill.sy * Math.sin(rx);

        const perspective = 600;
        const s = perspective / (perspective - currZ);

        x.set(currX);
        y.set(currY);
        scale.set(Math.max(0.4, s));
        opacity.set((currZ + radius) / (radius * 2) * 0.7 + 0.3);
        zIndex.set(Math.round(currZ + radius));
    });

    return (
        <motion.div
            style={{ x, y, scale, opacity, zIndex }}
            className="absolute flex flex-col items-center gap-2 pointer-events-none"
        >
            <div className="relative group p-2 flex items-center justify-center">
                {/* 
          Using a CSS Mask approach:
          This is the most bulletproof way to color single-color SVGs from a CDN.
          It loads the raw black SVG and uses it as a mask for a background color.
        */}
                <div
                    className="w-12 h-12 transition-transform group-hover:scale-110"
                    style={{
                        backgroundColor: skill.color,
                        maskImage: `url(${rawSvgUrl})`,
                        WebkitMaskImage: `url(${rawSvgUrl})`,
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center',
                    }}
                />
            </div>

            <span className="font-mono text-[9px] font-black tracking-[0.2em] uppercase text-text-muted/60">
                {skill.name}
            </span>
        </motion.div>
    );
};

const SkillsSphere = ({ isDarkMode }) => {
    const canvasRef = useRef(null);
    const rotationX = useMotionValue(0);
    const rotationY = useMotionValue(0);
    const isDragging = useRef(false);
    const lastMousePos = useRef({ x: 0, y: 0 });
    const [radius, setRadius] = useState(170);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setRadius(120);
            } else {
                setRadius(170);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const sphereSkills = useMemo(() => {
        const n = SKILLS_DATA.length;
        return SKILLS_DATA.map((skill, i) => {
            const phi = Math.acos(1 - 2 * (i + 0.5) / n);
            const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

            // Dynamic theme-aware coloring for white icons
            let finalColor = skill.color;
            if (!isDarkMode && (skill.color === '#FFFFFF' || skill.color === '#ffffff')) {
                finalColor = '#1A1A1A'; // Dark color for light mode
            }

            return {
                ...skill,
                color: finalColor,
                sx: radius * Math.cos(theta) * Math.sin(phi),
                sy: radius * Math.sin(theta) * Math.sin(phi),
                sz: radius * Math.cos(phi),
            };
        });
    }, [radius, isDarkMode]);

    const dots = useMemo(() => {
        const numDots = 100;
        const items = [];
        for (let i = 0; i < numDots; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / numDots);
            const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
            items.push({
                x: radius * Math.cos(theta) * Math.sin(phi),
                y: radius * Math.sin(theta) * Math.sin(phi),
                z: radius * Math.cos(phi),
            });
        }
        return items;
    }, []);

    useAnimationFrame(() => {
        if (!isDragging.current) {
            rotationX.set(rotationX.get() + 0.05);
            rotationY.set(rotationY.get() + 0.1);
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const rx = (rotationX.get() * Math.PI) / 180;
        const ry = (rotationY.get() * Math.PI) / 180;

        // Draw Wireframe Outlines (Latitude & Longitude)
        ctx.strokeStyle = 'rgba(124, 58, 237, 0.25)';
        ctx.lineWidth = 0.5;

        // Draw Longitude Lines (Vertical Rings)
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            const phi = (i * Math.PI) / 3;
            for (let j = 0; j <= 60; j++) {
                const theta = (j * Math.PI * 2) / 60;
                const lx = radius * Math.cos(theta) * Math.sin(phi);
                const ly = radius * Math.sin(theta);
                const lz = radius * Math.cos(theta) * Math.cos(phi);

                // Project
                let px = lx * Math.cos(ry) - lz * Math.sin(ry);
                let pz = lz * Math.cos(ry) + lx * Math.sin(ry);
                let py = ly * Math.cos(rx) - pz * Math.sin(rx);
                pz = pz * Math.cos(rx) + ly * Math.sin(rx);

                const s = 600 / (600 - pz);
                const x = px * s + width / 2;
                const y = py * s + height / 2;

                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        // Draw Latitude Lines (Horizontal Rings)
        for (let i = 1; i < 5; i++) {
            ctx.beginPath();
            const theta = (i * Math.PI) / 5;
            const r = radius * Math.sin(theta);
            const ly = radius * Math.cos(theta);

            for (let j = 0; j <= 60; j++) {
                const phi = (j * Math.PI * 2) / 60;
                const lx = r * Math.cos(phi);
                const lz = r * Math.sin(phi);

                // Project
                let px = lx * Math.cos(ry) - lz * Math.sin(ry);
                let pz = lz * Math.cos(ry) + lx * Math.sin(ry);
                let py = ly * Math.cos(rx) - pz * Math.sin(rx);
                pz = pz * Math.cos(rx) + ly * Math.sin(rx);

                const s = 600 / (600 - pz);
                const x = px * s + width / 2;
                const y = py * s + height / 2;

                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        // Project and Draw Background Dots
        const projectedDots = dots.map(d => {
            let x = d.x * Math.cos(ry) - d.z * Math.sin(ry);
            let z = d.z * Math.cos(ry) + d.x * Math.sin(ry);
            let y = d.y * Math.cos(rx) - z * Math.sin(rx);
            z = z * Math.cos(rx) + d.y * Math.sin(rx);

            const s = 600 / (600 - z);
            return {
                x: x * s + width / 2,
                y: y * s + height / 2,
                z: z,
                opacity: (z + radius) / (radius * 2) * 0.3 + 0.05
            };
        });

        projectedDots.forEach(p => {
            ctx.fillStyle = `rgba(124, 58, 237, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.5, (p.z + radius) / radius), 0, Math.PI * 2);
            ctx.fill();
        });
    });

    const handleMouseDown = (e) => {
        isDragging.current = true;
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchStart = (e) => {
        isDragging.current = true;
        lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        const deltaX = e.clientX - lastMousePos.current.x;
        const deltaY = e.clientY - lastMousePos.current.y;
        rotationX.set(rotationX.get() - deltaY * 0.3);
        rotationY.set(rotationY.get() + deltaX * 0.3);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e) => {
        if (!isDragging.current) return;
        const deltaX = e.touches[0].clientX - lastMousePos.current.x;
        const deltaY = e.touches[0].clientY - lastMousePos.current.y;
        rotationX.set(rotationX.get() - deltaY * 0.3);
        rotationY.set(rotationY.get() + deltaX * 0.3);
        lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleMouseUp = () => isDragging.current = false;

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div
            className="relative w-full h-[320px] sm:h-[400px] lg:h-[450px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden select-none z-0"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            style={{ touchAction: 'pan-y' }}
        >
            <canvas
                ref={canvasRef}
                width={800}
                height={800}
                className="absolute pointer-events-none opacity-60 scale-[1.2]"
            />

            {sphereSkills.map((skill) => (
                <SkillItem
                    key={skill.name}
                    skill={skill}
                    rotationX={rotationX}
                    rotationY={rotationY}
                    radius={radius}
                />
            ))}
        </div>
    );
};

export default SkillsSphere;
