import compiler from './compiler.js';

test('empty index', async () => {
  const stats = await compiler('./examples/reexport.ts');
  const jsonStats = stats.toJson();
  const output = jsonStats.modules[5].source;
  expect(output).toMatchSnapshot();
});
