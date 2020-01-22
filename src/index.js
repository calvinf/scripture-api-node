const Fetch = require('./Fetch');

class ScriptureApi {

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  getBibles(params = {}) {
    return new Promise((resolve, reject) => {
      Fetch.bibles(this.apiKey, params)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error.response.data)
        });
    })
  }

  getBible(bibleId) {
    return new Promise((resolve, reject) => {
      Fetch.bible(this.apiKey, bibleId)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }

  getBibleBooks(bibleId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleBooks(this.apiKey, bibleId, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }

  getBibleBook(bibleId, bookId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleBook(this.apiKey, bibleId, bookId, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }

  getBibleBookChapters(bibleId, bookId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleBookChapters(this.apiKey, bibleId, bookId, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }

  getBibleBookChapter(bibleId, chapterId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleBookChapter(this.apiKey, bibleId, chapterId, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }

  getBiblePassage(bibleId, passageId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.biblePassage(this.apiKey, bibleId, passageId, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }

  search(bibleId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.search(this.apiKey, bibleId, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }

  getBibleBookSections(bibleId, bookId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleBookSections(this.apiKey, bibleId, bookId, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }

  getBibleChapterSections(bibleId, chapterId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleChapterSections(this.apiKey, bibleId, chapterId, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }

  getBibleSections(bibleId, sectionId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleSection(this.apiKey, bibleId, sectionId, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }

  getBibleChapterVerses(bibleId, chapterId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleChapterVerses(this.apiKey, bibleId, chapterId, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }

  getBibleVerses(bibleId, verseId, params={}) {
    return new Promise((resolve, reject) => {
      Fetch.bibleChapterVerses(this.apiKey, bibleId, verseId, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error.response.data);
        })
    })
  }
}

module.exports = ScriptureApi;
