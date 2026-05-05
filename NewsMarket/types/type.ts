export type Article = {
    source: {
        id: string | null;
        name: string;
    }
    title: string;
    description: string | null;
    publishedAt: string;
    content: string;
}