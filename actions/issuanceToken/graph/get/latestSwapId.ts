import get from '.'

export default async function (fundingManagerAddress: string) {
  try {
    const swaps = await get.swaps(
      {
        where: {
          bondingCurve_id: {
            _eq: fundingManagerAddress,
          },
        },
        order_by: {
          blockTimestamp: 'desc',
        },
        limit: 1,
      },
      ['id']
    )

    const id = swaps.Swap[0]?.id
    return id
  } catch (error) {
    return undefined
  }
}
