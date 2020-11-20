export type BiblesParams = {
  // 639-3 three digit langage code used to filter results
  language?: string;

  // Bible abbreviation to search for
  abbreviation?: string;

  // Bible name to search for
  name?: string;

  // Comma separated list of Bible IDs to return
  ids?: string;
};

export type BibleBooksParams = {
  includeChapters?: boolean;
  includeChaptersAndSection?: boolean;
};

export type BibleBookParams = {
  includeChapters?: boolean;
};

// Chapters and others?
export type CommonFetchParams = {
  contentType?: string;
  includeNotes?: boolean;
  includeTitles?: boolean;
  includeChapterNumbers?: boolean;
  includeVerseNumbers?: boolean;
  includeVerseSpans?: boolean;
  parallels?: string;
};

export type SearchParams = {
  query?: string;
  limit?: number;
  offset?: number;
  sort?: "relevance" | "canonical" | "reverse-canonical";
  range?: string;
  fuzziness?: "AUTO" | 0 | 1 | 2;
};
