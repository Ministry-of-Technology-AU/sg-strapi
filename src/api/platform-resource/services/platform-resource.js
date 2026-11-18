'use strict';

/**
 * platform-resource service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::platform-resource.platform-resource');
