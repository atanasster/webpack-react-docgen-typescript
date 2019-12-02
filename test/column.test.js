import compiler from './compiler.js';

jest.setTimeout(100000);

test('column', async () => {
  const stats = await compiler('./examples/Column.tsx');
  const jsonStats = stats.toJson();
  const output = jsonStats.modules[6].source;
  expect(output).toMatchSnapshot();
});
