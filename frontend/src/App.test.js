describe('Medication Grouping', () => {
  test('groups medications by name correctly', () => {
    const medications = [
      { medication_name: 'Aspirin', dose: '81 mg', source: 'Clinic' },
      { medication_name: 'Labetalol', dose: '100 mg', source: 'Hospital A' },
      { medication_name: 'Labetalol', dose: '200 mg', source: 'Hospital A' },
    ];

    const grouped = medications.reduce((acc, med) => {
      acc[med.medication_name] = acc[med.medication_name] || [];
      acc[med.medication_name].push(med);
      return acc;
    }, {});

    expect(Object.keys(grouped)).toHaveLength(2);
    expect(grouped['Labetalol']).toHaveLength(2);
    expect(grouped['Aspirin']).toHaveLength(1);
  });

  test('detects source conflicts correctly', () => {
    const records = [
      { source: 'Hospital A', dose: '100 mg' },
      { source: 'Hospital B', dose: '100 mg' },
    ];

    const sources = new Set(records.map(r => r.source));
    const hasConflict = sources.size > 1;

    expect(hasConflict).toBe(true);
  });

  test('does not flag dose changes as conflicts', () => {
    const records = [
      { source: 'Hospital A', dose: '100 mg' },
      { source: 'Hospital A', dose: '200 mg' },
    ];

    const sources = new Set(records.map(r => r.source));
    const hasConflict = sources.size > 1;

    expect(hasConflict).toBe(false);
  });
});



describe('Dose value extraction', () => {
  function getDoseValue(doseStr) {
    const match = doseStr.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  }

  test('extracts numeric dose from string', () => {
    expect(getDoseValue('100 mg')).toBe(100);
    expect(getDoseValue('325 mg')).toBe(325);
    expect(getDoseValue('1 tablet')).toBe(1);
  });

  test('handles decimal doses', () => {
    expect(getDoseValue('2.5 g/hr')).toBe(2.5);
  });

  test('handles complex dose strings', () => {
    expect(getDoseValue('4 mU/min')).toBe(4);
    expect(getDoseValue('650 mg')).toBe(650);
  });

  test('returns 0 for non-numeric doses', () => {
    expect(getDoseValue('as needed')).toBe(0);
  });
});