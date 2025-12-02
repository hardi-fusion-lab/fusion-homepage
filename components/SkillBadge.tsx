export default function SkillBadge({ name, icon }: { name: string; icon?: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors cursor-default">
            {icon && <span className="text-gray-300">{icon}</span>}
            <span className="text-sm font-medium text-gray-200">{name}</span>
        </div>
    );
}
