import { NextApiRequest, NextApiResponse } from 'next'
import { faqsData } from '../../../components/faqs/faqsData'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(faqsData)
}