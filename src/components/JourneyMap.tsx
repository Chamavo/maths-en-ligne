import React from 'react';
import { Star, Lock, CheckCircle, MapPin } from 'lucide-react';
import { ALL_LEVELS, getLevelInfo } from '@/utils/exerciseGenerator';

interface JourneyMapProps {
    currentLevel: number; // The user's highest unlocked level
    onSelectLevel: (level: number) => void;
    completedLevels: number[]; // List of completed levels
}

const JourneyMap: React.FC<JourneyMapProps> = ({ currentLevel, onSelectLevel, completedLevels }) => {
    // We'll render a simple path for now, can be enhanced with SVG/Canvas later

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-blue-50/50 rounded-3xl">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">Ton Aventure</h2>

            <div className="relative">
                {/* Connection Line (simplified) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-blue-200 -translate-x-1/2 rounded-full hidden md:block" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {ALL_LEVELS.filter(l => l !== 0).map((level, index) => {
                        const isLatest = level === currentLevel;
                        const isLocked = level > currentLevel;
                        const isCompleted = level < currentLevel; // Simplified assumption
                        const info = getLevelInfo(level);

                        // Alternate left/right for path effect
                        const isLeft = index % 2 === 0;

                        return (
                            <div
                                key={level}
                                className={`flex ${isLeft ? 'md:justify-end' : 'md:justify-start'} justify-center md:col-span-1 col-span-1 md:col-start-${isLeft ? '1' : '2'}`}
                            >
                                <div
                                    onClick={() => !isLocked && onSelectLevel(level)}
                                    className={`
                    cursor-pointer transform transitionable hover:scale-105 duration-300
                    w-64 p-4 rounded-2xl border-4 shadow-lg flex flex-col items-center gap-2
                    ${isLatest
                                            ? 'bg-amber-100 border-amber-400 ring-4 ring-amber-200'
                                            : isLocked
                                                ? 'bg-gray-100 border-gray-300 opacity-70 grayscale'
                                                : 'bg-white border-green-400'
                                        }
                  `}
                                >
                                    <div className="text-4xl mb-2">
                                        {isLocked ? '🔒' : isLatest ? '⚔️' : isCompleted ? '✅' : '❓'}
                                    </div>

                                    <div className="font-bold text-lg text-center text-slate-700">
                                        {info.name}
                                    </div>

                                    <div className="flex gap-1 text-yellow-500">
                                        {/* Stars placeholder */}
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                    </div>

                                    {isLatest && (
                                        <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full animate-bounce font-bold text-sm">
                                            GO !
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default JourneyMap;
