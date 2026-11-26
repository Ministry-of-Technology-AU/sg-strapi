'use strict';

/**
 * secret-santa-pool service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::secret-santa-pool.secret-santa-pool');
