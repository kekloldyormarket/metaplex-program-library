/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from "@metaplex-foundation/beet";
import { Creator, creatorBeet } from "./Creator";
export type UpdateArgs = {
  share: number;
  uri: string;
  name: string;
  symbol: string;
  sellerFeeBasisPoints: number;
  creators: beet.COption<Creator[]>;
};

/**
 * @category userTypes
 * @category generated
 */
export const updateArgsBeet = new beet.FixableBeetArgsStruct<UpdateArgs>(
  [
    ["share", beet.u16],
    ["uri", beet.utf8String],
    ["name", beet.utf8String],
    ["symbol", beet.utf8String],
    ["sellerFeeBasisPoints", beet.u16],
    ["creators", beet.coption(beet.array(creatorBeet))],
  ],
  "UpdateArgs"
);
