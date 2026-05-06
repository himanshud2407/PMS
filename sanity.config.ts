import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'PMS Admin',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'kqlppgqs',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [deskTool(), visionTool()],

  schema: schema,
})
