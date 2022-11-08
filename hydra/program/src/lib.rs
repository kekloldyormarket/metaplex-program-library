pub mod error;
pub mod processors;
pub mod state;
pub mod utils;
use anchor_lang::prelude::*;
use processors::*;
use state::MembershipModel;

use crate::processors::update_metadata::arg::UpdateArgs;

declare_id!("5F6oQHdPrQBLdENyhWUAE4mCUN13ZewVxi5yBnZFb9LW");

#[program]
pub mod update_metadata {


    use super::*;

    pub fn process_init(
        ctx: Context<InitializeFanout>,
        args: InitializeFanoutArgs,
        model: MembershipModel,
    ) -> Result<()> {
        init(ctx, args, model)
    }

    pub fn process_add_member_wallet(
        ctx: Context<AddMemberWallet>,
        args: AddMemberArgs,
    ) -> Result<()> {
        add_member_wallet(ctx, args)
    }
    pub fn process_sign_metadata(ctx: Context<SignMetadata> , args: UpdateArgs) -> Result<()> {
        sign_metadata(ctx, data)
    }
    /*
    pub fn process_pass_ua_back(ctx: Context<PassUaBack> ,  data: Data) -> Result<()> {
        pass_ua_back(ctx, data)
    }
*/

}
