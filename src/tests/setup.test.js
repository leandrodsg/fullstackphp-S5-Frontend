describe('Project Setup', () => {
  test('should have correct project structure', () => {
    const fs = require('fs');
    const path = require('path');
    
    const srcPath = path.resolve(__dirname, '../../src');
    
    expect(fs.existsSync(path.join(srcPath, 'components'))).toBe(true);
    expect(fs.existsSync(path.join(srcPath, 'pages'))).toBe(true);
    expect(fs.existsSync(path.join(srcPath, 'services'))).toBe(true);
    expect(fs.existsSync(path.join(srcPath, 'utils'))).toBe(true);
  });

  test('should have environment variables configured', () => {
    expect(process.env.REACT_APP_API_BASE_URL).toBeDefined();
  });
});