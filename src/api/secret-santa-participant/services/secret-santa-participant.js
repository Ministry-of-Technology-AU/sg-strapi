'use strict';

/**
 * secret-santa-participant service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::secret-santa-participant.secret-santa-participant');
