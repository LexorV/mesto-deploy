const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_PORT = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-deploy',
    script: './src/index.js',
  }],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      port: DEPLOY_PORT,
      repo: 'https://github.com/LexorV/web-plus-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy': `scp -P ${DEPLOY_PORT} .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': ' cd frontend && npm i && npm run build && cp build/* home/web-project/deployProject/frontend-mesto-deploy',
    },
  },
};