import compiler from './compiler.js';

test('avatar', async () => {
  const stats = await compiler('./examples/Avatar.tsx', {
    transformProps: tables => tables.map(table => ({ ...table, type: 'tsType' }))[0],
    propFilter: { 
      skipPropsWithoutDoc: true,
      skipPropsWithName: ['prop4'],
    }
  });
  const jsonStats = stats.toJson();
  const output = jsonStats.modules[2].source;
  expect(output).toMatchSnapshot();
});
