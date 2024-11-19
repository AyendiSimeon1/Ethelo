export type UserInfoType = {
    name: string;
    title: string;
    location: string;
    email: string;
    bio: string;
    skills: string[];
    github: string;
    website: string;
}

export type ProjectType = {
    id: number;
    title: string;
    description: string;
    status: 'active' | 'applied' | 'accepted';
    type: 'created' | 'applied' | 'accepted';
    volunteers?: number;
};

export type NotificationType = {
    id: number;
    type: 'application'| 'message';
    message: string;
    time: string;
    isNew: boolean;
}