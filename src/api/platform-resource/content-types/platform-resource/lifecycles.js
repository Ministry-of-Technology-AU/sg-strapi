'use strict';

const { ApplicationError } = require('@strapi/utils').errors;

const UID = 'api::platform-resource.platform-resource';

const hasLink = (link) => typeof link === 'string' && link.trim() !== '';

// CKEditor leaves markup like "<p>&nbsp;</p>" in a cleared editor, so check for real text or embedded media
const hasContent = (html) =>
  typeof html === 'string' &&
  (/<(img|iframe|video|table)\b/i.test(html) ||
    html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim() !== '');

const check = (link, content) => {
  if (hasLink(link) === hasContent(content)) {
    throw new ApplicationError('A platform resource needs exactly one of: a link (document) or content (note).');
  }
};

// Blank link -> null, so link-less notes don't clash on the unique constraint
const normalize = (data) => {
  if ('link' in data && !hasLink(data.link)) data.link = null;
};

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    normalize(data);
    check(data.link, data.content);
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;
    normalize(data);
    // Updates can be partial (e.g. publish only sends publishedAt), so fill in missing fields from the stored row
    const existing = (await strapi.db.query(UID).findOne({ where, select: ['link', 'content'] })) || {};
    check('link' in data ? data.link : existing.link, 'content' in data ? data.content : existing.content);
  },
};
