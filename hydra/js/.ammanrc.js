'use strict';
// @ts-check
const base = require('../../.base-ammanrc.js');

const update_metadataValidator = {
  programs: [base.programs.metadata, base.programs.update_metadata],
  commitment: 'confirmed',
  verifyFees: false,
};

const validator = {
  update_metadataValidator,
  programs: [base.programs.metadata, base.programs.update_metadata],
};
module.exports = { validator };
