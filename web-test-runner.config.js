export default {
  files: 'test/**/*.test.js',
  testRunnerHtml: testFramework => `
    <html>
      <head>
        <script>
          window.process = { env: { NODE_ENV: 'test' } };
          window.global = window;
        </script>
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  coverage: true,
  coverageConfig: {
    threshold: {
      statements: 85,
      branches: 85,
      functions: 85,
      lines: 85,
    },
  },
  nodeResolve: true,
};