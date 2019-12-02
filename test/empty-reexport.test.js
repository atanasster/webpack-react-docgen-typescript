import compiler from './compiler.js';

jest.setTimeout(100000);

test('empty index', async () => {
  const stats = await compiler('./examples/reexport.ts');
  const jsonStats = stats.toJson();
  const output = jsonStats.modules[5].source;
  expect(output).toMatchSnapshot();
});
