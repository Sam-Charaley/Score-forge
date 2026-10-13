import { SUBJECT_INDEX } from './subjectIndex'

// Vite turns each matched file into its own chunk, fetched on first use.
const contentModules = import.meta.glob('./subjects/*.js');

const indexById = new Map(SUBJECT_INDEX.map(meta => [meta.id, meta]));
const cache = new Map();

// Thrown when a chunk can't be fetched. After a deploy, the open tab still
// references the previous build's chunk names, which no longer exist.
export class SubjectLoadError extends Error {
  constructor(subjectId, cause) {
    super(`Couldn't load ${indexById.get(subjectId)?.name ?? subjectId}.`);
    this.name = 'SubjectLoadError';
    this.subjectId = subjectId;
    this.cause = cause;
  }
}

// Full subject: index metadata (name, colors, exam date) merged with its weeks.
export function loadSubject(subjectId) {
  if (cache.has(subjectId)) return cache.get(subjectId);
  const meta = indexById.get(subjectId);
  const loadContent = contentModules[`./subjects/${subjectId}.js`];
  if (!meta || !loadContent) return Promise.reject(new SubjectLoadError(subjectId, new Error('unknown subject')));
  const pending = loadContent()
    .then(module => ({ ...meta, ...module.default }))
    .catch(error => {
      cache.delete(subjectId);  // let a retry fetch again
      throw new SubjectLoadError(subjectId, error);
    });
  cache.set(subjectId, pending);
  return pending;
}

export function loadSubjects(subjectIds) {
  return Promise.all(subjectIds.map(loadSubject));
}

export function loadAllSubjects() {
  return loadSubjects(SUBJECT_INDEX.map(meta => meta.id));
}
