import { Idl, TypesCoder } from '@project-serum/anchor';

export class MplUpdateMetadataTypesCoder implements TypesCoder {
  constructor(_idl: Idl) {}

  encode<T = any>(_name: string, _type: T): Buffer {
    throw new Error('MplUpdateMetadata does not have user-defined types');
  }
  decode<T = any>(_name: string, _typeData: Buffer): T {
    throw new Error('MplUpdateMetadata does not have user-defined types');
  }
}
