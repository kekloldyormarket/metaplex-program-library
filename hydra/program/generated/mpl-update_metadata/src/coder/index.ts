import { Idl, Coder } from '@project-serum/anchor';

import { MplUpdateMetadataAccountsCoder } from './accounts';
import { MplUpdateMetadataEventsCoder } from './events';
import { MplUpdateMetadataInstructionCoder } from './instructions';
import { MplUpdateMetadataStateCoder } from './state';
import { MplUpdateMetadataTypesCoder } from './types';

/**
 * Coder for MplUpdateMetadata
 */
export class MplUpdateMetadataCoder implements Coder {
  readonly accounts: MplUpdateMetadataAccountsCoder;
  readonly events: MplUpdateMetadataEventsCoder;
  readonly instruction: MplUpdateMetadataInstructionCoder;
  readonly state: MplUpdateMetadataStateCoder;
  readonly types: MplUpdateMetadataTypesCoder;

  constructor(idl: Idl) {
    this.accounts = new MplUpdateMetadataAccountsCoder(idl);
    this.events = new MplUpdateMetadataEventsCoder(idl);
    this.instruction = new MplUpdateMetadataInstructionCoder(idl);
    this.state = new MplUpdateMetadataStateCoder(idl);
    this.types = new MplUpdateMetadataTypesCoder(idl);
  }
}
