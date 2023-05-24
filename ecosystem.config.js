module.exports = {
  apps: [
    {
      name: 'index',
      script: 'app.js',
      watch: true,
      ignore_watch: ['node_modules', 'logs'],
      autorestart: false,
      watch_options: {
        followSymlinks: false
      },
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
