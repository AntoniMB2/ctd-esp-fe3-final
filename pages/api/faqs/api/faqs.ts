import { NextApiRequest, NextApiResponse } from 'next'
import { faqsData } from '../../../../components/faqs/faqsData' // Importa tus datos

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(faqsData)
}