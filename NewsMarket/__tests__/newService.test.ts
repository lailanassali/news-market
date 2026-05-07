import { fetchNewsArticles } from "../services/newsService";

const mockArticles = [
  {
    source: { id: 'bbc-news', name: "BBC News" },
    title: "Test Article 1",
    description: "This is a test article.",
    publishedAt: "2024-06-01T12:00:00Z",
    content: "Test content for article 1.",
    url: "https://example.com/test-article-1",
  },
  {
    source: { id: 'cnn', name: "CNN" },
    title: "Test Article 2",
    description: "This is another test article.",
    publishedAt: "2024-06-02T12:00:00Z",
    content: "Test content for article 2.",
    url: "https://example.com/test-article-2",
  },
];

const mockDomains = ["bbc.co.uk", "cnn.com"];

describe("fetchNewsArticles", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.spyOn(console, 'error').mockImplementation(() => {}); 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should fetch news articles successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ articles: mockArticles }),
    });

    const articles = await fetchNewsArticles(mockDomains);
    expect(articles).toEqual(mockArticles);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('bbc.co.uk,cnn.com'));
  });

  it("should return an empty array if the API response fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ articles: [] }),
    });

    const articles = await fetchNewsArticles(mockDomains);
    expect(articles).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it("should return an empty array when no domains are provided", async () => {
    const articles = await fetchNewsArticles([]);
    expect(articles).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
});
  it("should return no more than 10 articles", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ articles: mockArticles }),
    });

    await fetchNewsArticles(mockDomains);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('pageSize=10'));
});
});