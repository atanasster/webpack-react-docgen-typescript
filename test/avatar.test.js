import compiler from './compiler.js';

jest.setTimeout(100000);

test('avatar', async () => {
  const stats = await compiler('./examples/Avatar.tsx');
  const jsonStats = stats.toJson();
  const output = jsonStats.modules[2].source;
  expect(output).toMatchSnapshot();
});
