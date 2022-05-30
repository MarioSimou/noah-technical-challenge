import type {SNSHandler} from '@libs/types'

export const postReferralRewardHandler: SNSHandler = async event => {
  const [record] = event.Records
  // TODO: implement business logic to process the referral
  console.log(record)
}
