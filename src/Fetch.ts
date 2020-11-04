import fetch from "cross-fetch";

import ApiEnum from "./ApiEnum";

export type BiblesParams = {
  language?: string;
  abbreviation?: string;
  name?: string;
  ids?: string;
};

export type BibleBooksParams = {
  includeChapters: boolean;
  includeChaptersAndSection: boolean;
};

export type BibleBookParams = {
  includeChapters: boolean;
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

const getFetchOptions = (apiKey: string) => {
  const headers = new Headers();
  headers.set("api-key", apiKey);

  return {
    headers,
  };
};

/**
 * FETCH CLASS
 */
class Fetch {
  /**
   * Fetch all available bible translations
   */
  static bibles(apiKey: string, params: BiblesParams = {}) {
    const { language, abbreviation, name, ids } = params;

    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}?`;
    if (language) {
      url = `${url}language=${language}&`;
    }
    if (abbreviation) {
      url = `${url}abbreviation=${abbreviation}&`;
    }
    if (name) {
      url = `${url}name=${name}&`;
    }
    if (ids) {
      url = `${url}ids=${ids}`;
    }

    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Fetch a bible
   */
  static bible(apiKey: string, bibleId: string) {
    const url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}`;
    if (!bibleId) {
      return this.bibles(apiKey);
    }
    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Fetch all books from the bible
   * @param {object} params
   */
  static bibleBooks(apiKey: string, bibleId: string, params: BibleBooksParams) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/books?`;
    const { includeChapters, includeChaptersAndSection } = params;

    if (includeChapters) {
      url = `${url}include-chapters=${includeChapters}&`;
    }

    if (includeChaptersAndSection) {
      url = `${url}include-chapters-and-sections=${includeChaptersAndSection}`;
    }

    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Fetch a book from the bible
   */
  static bibleBook(
    apiKey: string,
    bibleId: string,
    bookId: string,
    params: BibleBookParams
  ) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/books/${bookId}?`;
    const { includeChapters } = params;
    if (includeChapters) {
      url = `${url}include-chapters=${includeChapters}`;
    }

    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Fetch all chapters from a book in the bible
   */
  static bibleBookChapters(apiKey: string, bibleId: string, bookId: string) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/books/${bookId}/chapters`;
    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Fetch a chapter from bible book
   */
  static bibleBookChapter(
    apiKey: string,
    bibleId: string,
    chapterId: string,
    params?: CommonFetchParams
  ) {
    let url = this._getLongUrl(
      `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/chapters/${chapterId}`,
      params
    );
    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Get a passage from the bible
   * @param {object} params
   * @param {function name(error, res, body) {

   }} callback
   */
  static biblePassage(
    apiKey: string,
    bibleId: string,
    passageId: string,
    params: CommonFetchParams = {}
  ) {
    let url = this._getLongUrl(
      `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/passages/${passageId}`,
      params
    );

    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Search the bible
   * @param {object} params
   */
  static search(apiKey: string, bibleId: string, params: SearchParams = {}) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/search?`;
    const { query, limit, offset, sort, range, fuzziness } = params;
    if (query) {
      url = `${url}query=${query}&`;
    }
    if (limit && this._isNumber(limit)) {
      url = `${url}limit=${limit}&`;
    } else {
      url = `${url}limit=10&`;
    }
    if (offset && this._isNumber(offset)) {
      url = `${url}offset=${offset}&`;
    } else {
      url = `${url}offset=0&`;
    }

    if (sort) {
      url = `${url}sort=${sort}&`;
    }

    if (range) {
      url = `${url}range=${range}&`;
    }

    if (fuzziness) {
      url = `${url}fuzziness=${fuzziness}`;
    }

    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Fetch all sections in a bible book
   */
  static bibleBookSections(
    apiKey: string,
    bibleId: string,
    bookId: string,
    params: CommonFetchParams = {}
  ) {
    const url = this._getLongUrl(
      `${ApiEnum.baseUrl}/bibles/${bibleId}/books/${bookId}/sections`,
      params
    );
    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Fetch all sections in a chapter of the bible
   * @param {string} apiKey
   * @param {string} bibleId
   * @param {string} chapterId
   * @param {function name(error, res, body) {

   }} callback
   */
  static bibleChapterSections(
    apiKey: string,
    bibleId: string,
    chapterId: string,
    callback: (error: string, _res: any, body: string) => void
  ) {
    const url = this._getLongUrl(
      `${ApiEnum.baseUrl}/bibles/${bibleId}/chapters/${chapterId}/sections`
    );
    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Fetch a section in the bible
   */
  static bibleSection(
    apiKey: string,
    bibleId: string,
    sectionId: string,
    params: CommonFetchParams = {}
  ) {
    const url = this._getLongUrl(
      `${ApiEnum.baseUrl}/bibles/${bibleId}/sections/${sectionId}`,
      params
    );
    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Fetch all verses in a chapter of the bible
   */
  static bibleChapterVerses(
    apiKey: string,
    bibleId: string,
    chapterId: string
  ) {
    let url = `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/chapters/${chapterId}/verses`;
    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * Fetch a verse in the bible
   */
  static bibleVerse(
    apiKey: any,
    bibleId: any,
    verseId: any,
    params: CommonFetchParams = {}
  ) {
    let url = this._getLongUrl(
      `${ApiEnum.baseUrl}${ApiEnum.bibles}/${bibleId}/verses/${verseId}`,
      params
    );
    return fetch(url, getFetchOptions(apiKey));
  }

  /**
   * check if a value is a number
   * @param {number} n
   */
  static _isNumber(n: string | number) {
    return (
      !isNaN(parseFloat(n as string)) &&
      !isNaN((n as number) - 0) &&
      (typeof n === "string" || typeof n === "number")
    );
  }

  /**
   * generate url based on params
   */
  static _getLongUrl(link: string, params: CommonFetchParams = {}) {
    const {
      contentType,
      includeNotes,
      includeTitles,
      includeChapterNumbers,
      includeVerseNumbers,
      includeVerseSpans,
      parallels,
    } = params;

    let url = `${link}?`;
    if (includeNotes) {
      url = `${url}include-notes=${includeNotes}&`;
    }
    if (includeTitles) {
      url = `${url}include-titles=${includeTitles}&`;
    }
    if (includeChapterNumbers) {
      url = `${url}include-chapter-numbers=${includeChapterNumbers}&`;
    }
    if (includeVerseNumbers) {
      url = `${url}include-verse-numbers=${includeVerseNumbers}&`;
    }
    if (includeVerseSpans) {
      url = `${url}include-verse-spans=${includeVerseSpans}&`;
    }
    if (parallels) {
      url = `${url}parallels=${parallels}&`;
    }
    if (
      contentType &&
      ["json, htnl, text"].includes(contentType.toLowerCase())
    ) {
      url = `${url}content-type=${contentType.toLowerCase()}`;
    } else {
      url = `${url}content-type=json`;
    }
    return url;
  }

  /**
   * Generate fetch options
   */
  static getFetchOptions(apiKey: string) {
    const headers = new Headers();
    headers.set("api-key", apiKey);

    return {
      headers,
    };
  }
}

export default Fetch;
