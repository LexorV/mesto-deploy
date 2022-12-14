require('dotenv').config();
const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_PORT = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'api-mesto-deploy',
    script: './dist/app.js',
  }],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      ssh_options: "StrictHostKeyChecking=no",
      port: DEPLOY_PORT,
      repo: 'https://github.com/LexorV/mesto-deploy',
      path: DEPLOY_PATH,
      'pre-deploy': `scp -P ${DEPLOY_PORT} .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': ' cd backend && npm i && npm run build',
    },
  },
};