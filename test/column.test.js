import compiler from './compiler.js';

test('column', async () => {
  const stats = await compiler('./examples/Column.tsx', {
    transformProps: tables => tables.map(table => ({ ...table, type: 'tsType' }))[0],
    propFilter: { 
      skipPropsWithName: ['prop4'],
    }
  });

  
  const jsonStats = stats.toJson();
  const output = jsonStats.modules[6].source;
  expect(output).toMatchSnapshot();
});
