FROM node:15.4.0-buster-slim

# bake entrypoint into the image
COPY entrypoint.sh /usr/local/bin/

# set default entrypoint and run npm's "start" command by default
ENTRYPOINT [ "entrypoint.sh" ]
CMD [ "npm", "start" ]
