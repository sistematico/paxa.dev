import { useState, useEffect } from 'react';
import { Eye, Heart } from 'lucide-react';

const apiUrl = import.meta.env.VITE_API_URL!;

interface PostPreviewStatsData {
	totalViews: number;
	uniqueViews: number;
	totalLikes: number;
}

interface PostPreviewStatsProps {
	slug: string;
}

export function PostPreviewStats({ slug }: PostPreviewStatsProps) {
	const [stats, setStats] = useState<PostPreviewStatsData | null>(null);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await fetch(`${apiUrl}/analytics/posts/${slug}/stats`, {
					credentials: 'include'
				});
				
				if (response.ok) {
					const data = await response.json();
					setStats(data);
				}
			} catch (err) {
				console.error('Error fetching post preview stats:', err);
			}
		};

		fetchStats();
	}, [slug]);

	if (!stats) {
		return null;
	}

	return (
		<div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
			{stats.uniqueViews > 0 && (
				<div className="flex items-center gap-1">
					<Eye size={12} />
					<span>{stats.uniqueViews} visualizações</span>
				</div>
			)}
			{stats.totalLikes > 0 && (
				<div className="flex items-center gap-1">
					<Heart size={12} />
					<span>{stats.totalLikes} curtidas</span>
				</div>
			)}
		</div>
	);
}

export default PostPreviewStats;