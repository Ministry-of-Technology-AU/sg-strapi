'use strict';

/**
 * borrow-assets-poc service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::borrow-assets-poc.borrow-assets-poc');
