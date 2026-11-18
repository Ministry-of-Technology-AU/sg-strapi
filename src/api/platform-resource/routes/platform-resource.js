'use strict';

/**
 * platform-resource router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::platform-resource.platform-resource');
