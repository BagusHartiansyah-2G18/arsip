import React from 'react';

interface BadgeProps {
    value: number;
    tone?: 'green' | 'orange';
}

const Badge: React.FC<BadgeProps> = ({ value, tone = 'green' }) => {
    const toneMap = {
        green: 'bg-emerald-100 text-emerald-700',
        orange: 'bg-orange-100 text-orange-700',
    };
    return <span className={`text-xs px-2 py-0.5 rounded-full ${toneMap[tone]}`}>{value}</span>;
};

export default Badge;
