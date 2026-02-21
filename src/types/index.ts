export interface InsightData {
    id: string;
    title: string;
    summary: string;
    date: string;
    readTime: string;
    tags: string[];
    image: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    claps: number;
    content: string;
    category?: string;
}

export interface MediaItem {
    type: 'image' | 'video';
    url: string;
    caption: string;
}

export interface TechStackGroup {
    category: string;
    skills: string[];
}

export interface ProjectData {
    id: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    tags: string[];
    features: string[];
    techStack: TechStackGroup[];
    architecture?: string;
    links?: { label: string; url: string }[];
    media?: MediaItem[];
}
