FROM node:12

RUN npm i -g now@latest

COPY dist /now-alias-set-action/dist

ENTRYPOINT ["node", "/now-alias-set-action/dist/index.js"]
