"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Translations, useTranslations } from "@/hooks/use-translations";

interface Promo {
    id: string;
    title: string;
    message: string;
    link: string;
    icon?: string;
}

const createPromos = (t: Translations): Array<Promo> => [
    {
        id: "twitter",
        title: t.components.ads.twitter.title,
        message: t.components.ads.twitter.message,
        link: "https://twitter.com/yorunoken727",
        icon: "🐦",
    },
    {
        id: "osu",
        title: t.components.ads.osu.title,
        message: t.components.ads.osu.message,
        link: "https://osu.ppy.sh/users/yorunoken",
        icon: "🎮",
    },
    {
        id: "kofi",
        title: t.components.ads.kofi.title,
        message: t.components.ads.kofi.message,
        link: "https://ko-fi.com/yorunoken",
        icon: "☕",
    },
    {
        id: "discord",
        title: t.components.ads.discord.title,
        message: t.components.ads.discord.message,
        link: "your-discord-link",
        icon: "👾",
    },
];

export function AdSlider() {
    const { t } = useTranslations();
    const promos = createPromos(t);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((current) => (current + 1) % promos.length);
        }, 30 * 1000);

        return () => clearInterval(timer);
    }, [promos.length]);

    return (
        <div className="max-w-md mx-auto bg-transparent border border-dashed border-border rounded-lg my-8">
            <AnimatePresence mode="wait">
                <motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="h-full">
                    <a href={promos[currentIndex].link} target="_blank" rel="noopener noreferrer" className="block h-full p-4 hover:opacity-80 transition-opacity">
                        <div className="flex flex-col items-center justify-center text-center gap-3 h-full">
                            {promos[currentIndex].icon && <span className="text-2xl">{promos[currentIndex].icon}</span>}
                            <div>
                                <h3 className="font-medium">{promos[currentIndex].title}</h3>
                                <p className="text-sm text-muted-foreground">{promos[currentIndex].message}</p>
                            </div>
                        </div>
                    </a>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
