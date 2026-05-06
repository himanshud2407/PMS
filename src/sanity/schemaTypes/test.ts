import { defineField, defineType } from 'sanity'

export const testType = defineType({
  name: 'test',
  title: 'Medical Test',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Test Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'Shown on the homepage/list view',
    }),
    defineField({
      name: 'serviceDetail',
      title: 'Detailed Information',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Shown on the detailed page',
    }),
    defineField({
      name: 'image',
      title: 'Test Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Blood Test', value: 'Blood Test' },
          { title: 'Stool Test', value: 'Stool Test' },
          { title: 'Plasma Test', value: 'Plasma Test' },
          { title: 'Swab Test', value: 'Swab Test' },
          { title: 'Urine Test', value: 'Urine Test' },
        ],
      },
    }),
  ],
})
