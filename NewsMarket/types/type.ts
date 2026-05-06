export type Article = {
    source: {
        id: string | null;
        name: string;
    }
    url: string;
    title: string;
    description: string | null;
    publishedAt: string;
    content: string;
}