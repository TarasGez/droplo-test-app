import { z } from 'zod'

export const menuItemSchema = (existingLabels: string[]) =>
  z.object({
    label: z
      .string()
      .min(1, 'Label cannot be empty')
      .regex(/^[\w-\s.,]+$/, "Label can only contain letters, numbers, '-', '_', spaces, '.', or ','")
      .refine((label) => !existingLabels.includes(label), { message: 'Label must be unique' }),
    link: z.string().url('Link must be a valid URL').or(z.literal('')),
    submenu: z.array(z.any()),
  })
