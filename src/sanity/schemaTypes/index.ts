import { type SchemaTypeDefinition } from 'sanity'
import { testType } from './test'
import { blogType } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testType, blogType],
}
