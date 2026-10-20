// Folders shared between subjects with overlapping courses. Calculus AB is
// Units 1-8 of Calculus BC, so both load ./calc/; BC adds ./calcbc/ for
// Units 9-10. A shared question marked onlyIn: 'calcbc' (BC-only content in
// those units) is left out of the AB bank.
// Plain module (no import.meta.glob), so Node scripts can use it too.
export const SHARED_FOLDERS = {
  calcab: ['calc'],
  calcbc: ['calc'],
};

export function foldersFor(subjectId) {
  return [...(SHARED_FOLDERS[subjectId] ?? []), subjectId];
}
