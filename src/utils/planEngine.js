export function fmtDate(d) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function adaptPlanToWindow(subject, durationDays, startDateStr) {
  const startDate = startDateStr ? new Date(startDateStr) : new Date();
  const origWeeks = subject.weeks;
  const numOrig = origWeeks.length;

  const rawPhases = Math.floor(durationDays / 7);
  const numPhases = Math.min(Math.max(rawPhases, 1), numOrig);
  const daysPerPhase = durationDays / numPhases;
  const weeksPerPhase = Math.ceil(numOrig / numPhases);
  const isExpanded = durationDays >= numOrig * 7;

  const adapted = [];

  for (let p = 0; p < numPhases; p++) {
    const startWkIdx = p * weeksPerPhase;
    const endWkIdx = Math.min(startWkIdx + weeksPerPhase, numOrig);
    const covered = origWeeks.slice(startWkIdx, endWkIdx);
    if (!covered.length) continue;

    const phaseStart = addDays(startDate, Math.round(p * daysPerPhase));
    const phaseEnd = addDays(startDate, Math.round((p + 1) * daysPerPhase) - 1);
    const slots = Math.max(1, Math.round(daysPerPhase));

    let mergedDays = [];

    if (durationDays <= 7) {
      covered.forEach((wk, wi) => {
        const allTasks = wk.days.flatMap(d => d.tasks).slice(0, 5);
        mergedDays.push({
          day: `${fmtDate(addDays(phaseStart, wi))} — ${wk.theme}`,
          tasks: allTasks,
          _origWeekId: wk.id,
        });
      });
    } else if (numPhases < numOrig) {
      const allOrigDays = covered.flatMap(wk => wk.days.map(d => ({ ...d, _origWeekId: wk.id })));
      const stride = allOrigDays.length / slots;
      const seen = new Set();
      for (let i = 0; i < slots; i++) {
        const idx = Math.min(Math.round(i * stride), allOrigDays.length - 1);
        if (seen.has(idx)) continue;
        seen.add(idx);
        const od = allOrigDays[idx];
        mergedDays.push({
          ...od,
          day: `${fmtDate(addDays(phaseStart, i))}`,
        });
      }
    } else {
      const singleWk = covered[0];
      const gapDays = Math.max(1, Math.floor(daysPerPhase / Math.max(singleWk.days.length, 1)));
      singleWk.days.forEach((d, di) => {
        const origParts = d.day.split(' ').slice(1).join(' ');
        mergedDays.push({
          ...d,
          day: `${fmtDate(addDays(phaseStart, di * gapDays))}`,
          _origWeekId: singleWk.id,
        });
      });
      if (isExpanded && daysPerPhase >= singleWk.days.length + 2) {
        mergedDays.push({
          day: `${fmtDate(addDays(phaseEnd, -1))} — 📖 Review & Self-Test`,
          tasks: [
            `Re-read your notes from ${singleWk.theme}`,
            `Complete AP Classroom Progress Check for this unit`,
            `Write out all Key Rules from memory, then check`,
            `Do 10 mixed MCQs covering this phase's material`,
          ],
          _origWeekId: singleWk.id,
        });
      }
    }

    const uniqueRules = [...new Set(covered.flatMap(wk => wk.keyRules || []))].slice(0, 8);
    const seenUrls = new Set();
    const uniqueResources = covered.flatMap(wk => wk.resources || []).filter(r => {
      if (seenUrls.has(r.url)) return false;
      seenUrls.add(r.url);
      return true;
    });
    const frq = covered.map(wk => wk.frq).filter(Boolean).pop() || null;
    const tip = covered.map(wk => wk.tip).filter(Boolean).pop() || '';

    let phaseLabel;
    if (durationDays <= 7) phaseLabel = 'Crash Course';
    else if (numPhases === numOrig) phaseLabel = covered[0].label;
    else phaseLabel = `Phase ${p + 1}`;

    const theme = covered.length === 1
      ? covered[0].theme
      : covered.map(wk => wk.theme.replace(/[🎯]/g, '').trim()).join(' · ').slice(0, 65);

    const examWeight = covered.length === 1
      ? covered[0].examWeight
      : covered.map(w => w.examWeight).join(' + ');

    adapted.push({
      id: p + 1,
      label: phaseLabel,
      dates: `${fmtDate(phaseStart)} – ${fmtDate(phaseEnd)}`,
      theme,
      examWeight,
      color: covered[0].color,
      isExamWeek: covered.some(wk => wk.isExamWeek),
      overview: covered[0].overview,
      days: mergedDays,
      keyRules: uniqueRules,
      resources: uniqueResources,
      frq,
      tip,
      _coveredLabels: covered.map(wk => wk.label),
    });
  }

  return adapted;
}
export function getCurrentPhaseId(adaptedWeeks, planStartDate) {
  if (!planStartDate || !adaptedWeeks.length) return adaptedWeeks[0]?.id ?? 1;
  const today = new Date();
  const start = new Date(planStartDate);
  const elapsed = Math.floor((today - start) / 86400000);
  const total = adaptedWeeks.length;
  const daysPerPhase = Math.max(1, Math.ceil(elapsed / total));
  const currentIdx = Math.min(Math.floor(elapsed / daysPerPhase), total - 1);
  return adaptedWeeks[Math.max(0, currentIdx)]?.id ?? 1;
}