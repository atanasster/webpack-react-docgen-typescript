import compiler from './compiler.js';

test('grid', async () => {
  const stats = await compiler('./examples/OrProps.tsx');
  const jsonStats = stats.toJson();
  const output = jsonStats.modules[2].source;
  expect(output).toMatchSnapshot();
});
