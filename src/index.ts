/**
 * This module provides access to Scripture API Bible API
 * https://scripture.api.bible/
 *
 * The API provides access to fetch bibles, bible's books, bible's chapters, bible's verses and sections in the bible
 *
 * The author of this code has no formal relationship with https://scripture.api.bible/ and does not
 * claim to have created any of the facilities provided by https://scripture.api.bible/
 */
import Fetch from "./Fetch";
import {
  BibleBookParams,
  BibleBooksParams,
  BiblesParams,
  CommonFetchParams,
  SearchParams,
} from "./types";

/**
 * Scripture API Class
 */
class ScriptureApi {
  #apiKey: string;

  /**
   * contructor
   */
  constructor(apiKey: string) {
    this.#apiKey = apiKey;
  }

  /**
   * Get Bibles
   * @returns {object} returns a promise
   */
  async getBibles(params: BiblesParams = {}): Promise<any> {
    try {
      const results = await Fetch.bibles(this.#apiKey, params);

      return results.json();
    } catch (e) {
      throw new Error(`Failed to get bibles: ${e.message}\n${e.stackTrace}`);
    }
  }

  /**
   * Get Bible by bibleId
   * Gets a single Bible for a given bibleId
   */
  async getBible(bibleId: string): Promise<any> {
    try {
      const results = await Fetch.bible(this.#apiKey, bibleId);

      return results.json();
    } catch (e) {
      throw new Error(`Failed to get bible: ${e.message}\n${e.stackTrace}`);
    }
  }

  /**
   * Get Bible books
   * Gets an array of Book objects for a given bibleId
   */
  async getBibleBooks(
    bibleId: string,
    params: BibleBooksParams = {}
  ): Promise<any> {
    try {
      const results = await Fetch.bibleBooks(this.#apiKey, bibleId, params);

      return results.json();
    } catch (e) {
      throw new Error(
        `Failed to get bible books: ${e.message}\n${e.stackTrace}`
      );
    }
  }

  /**
   * Get Bible book
   * Gets a single Book object for a given bibleId and bookId
   */
  async getBibleBook(
    bibleId: string,
    bookId: string,
    params: BibleBookParams = {}
  ): Promise<any> {
    try {
      const results = await Fetch.bibleBook(
        this.#apiKey,
        bibleId,
        bookId,
        params
      );

      return results.json();
    } catch (e) {
      throw new Error(
        `Failed to get bible book: ${e.message}\n${e.stackTrace}`
      );
    }
  }

  /**
   * Get Bible book chapters
   * Gets an array of Chapter objects for a given bibleId and bookId
   */
  async getBibleBookChapters(bibleId: string, bookId: string): Promise<any> {
    try {
      const results = await Fetch.bibleBookChapters(
        this.#apiKey,
        bibleId,
        bookId
      );

      return results.json();
    } catch (e) {
      throw new Error(
        `Failed to get bible book chapters: ${e.message}\n${e.stackTrace}`
      );
    }
  }

  /**
   * Get Bible book chapter
   * Gets a single Chapter object for a given bibleId and chapterId. This Chapter object also includes an content property with all verses for the Chapter.
   */
  async getBibleBookChapter(
    bibleId: string,
    chapterId: string,
    params: CommonFetchParams = {}
  ): Promise<any> {
    try {
      const results = await Fetch.bibleBookChapter(
        this.#apiKey,
        bibleId,
        chapterId,
        params
      );

      return results.json();
    } catch (e) {
      throw new Error(
        `Failed to get bible book chapter: ${e.message}\n${e.stackTrace}`
      );
    }
  }

  /**
   * Get Bible passage
   * Gets a Passage object for a given bibleId and passageId. This Passage object also includes an content property with all verses corresponding to the passageId. The passageId parameter can represent a chapter, verse, or range of verses.
   */
  async getBiblePassage(
    bibleId: string,
    passageId: string,
    params: CommonFetchParams = {}
  ): Promise<any> {
    try {
      const results = await Fetch.biblePassage(
        this.#apiKey,
        bibleId,
        passageId,
        params
      );

      return results.json();
    } catch (e) {
      throw new Error(
        `Failed to get bible book chapter: ${e.message}\n${e.stackTrace}`
      );
    }
  }

  /**
   * Bible search
   *
   * Gets search results for a given bibleId and query string.
   * Searches will match all verses with the list of keywords provided in the query string.
   * Order of the keywords does not matter.
   * However all keywords must be present in a verse for it to be considered a match.
   * The total number of results returned from a search can be limited by populating the limit attribute in the query string with a non-negative integer value.
   * If no limit value is provide a default of 10 is used. offset can be used to traverse paginated results.
   * So for example if you are using the default limit of 10, using an offset of 10 will return the second page of results,
   * namely results 11-20. The text property of each verse object contains only the verse text. It does not contain footnote references.
   * However, those can be queried directly using the /bibles/{bibleId}/verses/{verseId} endpoint.
   */
  async search(bibleId: string, params: SearchParams = {}): Promise<any> {
    try {
      const results = await Fetch.search(this.#apiKey, bibleId, params);

      return results.json();
    } catch (e) {
      throw new Error(
        `Failed to get search results: ${e.message}\n${e.stackTrace}`
      );
    }
  }

  /**
   * Get Bible book sections
   * Gets an array of Section objects for a given bibleId and bookId
   */
  async getBibleBookSections(
    bibleId: string,
    bookId: string,
    params: object = {}
  ): Promise<any> {
    try {
      const results = await Fetch.bibleBookSections(
        this.#apiKey,
        bibleId,
        bookId,
        params
      );

      return results.json();
    } catch (e) {
      throw new Error(
        `Failed to get Bible book sections: ${e.message}\n${e.stackTrace}`
      );
    }
  }

  /**
   * Get Bible chapter sections
   * Gets an array of Section objects for a given bibleId and chapterId
   */
  async getBibleChapterSections(
    bibleId: string,
    chapterId: string
  ): Promise<any> {
    try {
      const results = await Fetch.bibleChapterSections(
        this.#apiKey,
        bibleId,
        chapterId
      );

      return results.json();
    } catch (e) {
      throw new Error(
        `Failed to get Bible chapter sections: ${e.message}\n${e.stackTrace}`
      );
    }
  }

  /**
   * Get Bible section
   * Gets a single Section object for a given bibleId and sectionId.
   * This Section object also includes an content property with all verses for the Section.
   */
  async getBibleSections(
    bibleId: string,
    sectionId: string,
    params: CommonFetchParams = {}
  ): Promise<any> {
    try {
      const results = await Fetch.bibleSection(
        this.#apiKey,
        bibleId,
        sectionId,
        params
      );

      return results.json();
    } catch (e) {
      throw new Error(
        `Failed to get Bible sections: ${e.message}\n${e.stackTrace}`
      );
    }
  }

  /**
   * GET BIBLE CHAPTER VERSES
   * Gets an array of Verse objects for a given bibleId and chapterId
   * @param {object} params
   * @returns {object} returns a promise
   */
  async getBibleChapterVerses(
    bibleId: string,
    chapterId: string
  ): Promise<any> {
    try {
      const results = await Fetch.bibleChapterVerses(
        this.#apiKey,
        bibleId,
        chapterId
      );

      return results.json();
    } catch (e) {
      throw new Error(
        `Failed to get Bible chapter verses: ${e.message}\n${e.stackTrace}`
      );
    }
  }

  /**
   * GET BIBLE VERSES
   * Gets a Verse object for a given bibleId and verseId. This Verse object also includes an content property with the verse corresponding to the verseId.
   * @param {object} params
   * @returns {object} returns a promise
   */
  async getBibleVerses(bibleId: string, verseId: string): Promise<any> {
    try {
      const results = await Fetch.bibleVerse(this.#apiKey, bibleId, verseId);

      return results.json();
    } catch (e) {
      throw new Error(
        `Failed to get Bible chapter verses: ${e.message}\n${e.stackTrace}`
      );
    }
  }
}

export default ScriptureApi;
