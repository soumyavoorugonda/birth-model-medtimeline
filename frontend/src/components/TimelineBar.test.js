describe('TimelineBar calculations', () => {
  test('clamps dates within timeline range', () => {
    function clampDate(d, min, max) {
      return d < min ? min : d > max ? max : d;
    }

    const timelineStart = new Date('2025-10-01');
    const timelineEnd = new Date('2026-01-22');
    const beforeStart = new Date('2025-09-01');
    const afterEnd = new Date('2026-03-01');
    const withinRange = new Date('2025-12-15');

    expect(clampDate(beforeStart, timelineStart, timelineEnd)).toEqual(timelineStart);
    expect(clampDate(afterEnd, timelineStart, timelineEnd)).toEqual(timelineEnd);
    expect(clampDate(withinRange, timelineStart, timelineEnd)).toEqual(withinRange);
  });

  test('groups records by source', () => {
    const records = [
      { id: 1, source: 'Hospital A', dose: '100 mg' },
      { id: 2, source: 'Hospital B', dose: '100 mg' },
      { id: 3, source: 'Hospital A', dose: '200 mg' },
    ];

    const recordsBySource = {};
    records.forEach(record => {
      if (!recordsBySource[record.source]) {
        recordsBySource[record.source] = [];
      }
      recordsBySource[record.source].push(record);
    });

    expect(recordsBySource['Hospital A']).toHaveLength(2);
    expect(recordsBySource['Hospital B']).toHaveLength(1);
  });
});