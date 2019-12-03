import compiler from './compiler.js';

test('ref forward', async () => {
  const stats = await compiler('./examples/Button.tsx');
  const jsonStats = stats.toJson();
  const output = jsonStats.modules[1].source;
  expect(output).toMatchSnapshot();
});
