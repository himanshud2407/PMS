import { type SchemaTypeDefinition } from 'sanity'
import { testType } from './test'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [testType],
}
