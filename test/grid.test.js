import compiler from './compiler.js';

jest.setTimeout(100000);

test('grid', async () => {
  const stats = await compiler('./examples/Grid.tsx');
  const jsonStats = stats.toJson();
  const output = jsonStats.modules[1].source;
  expect(output).toMatchSnapshot();
});
